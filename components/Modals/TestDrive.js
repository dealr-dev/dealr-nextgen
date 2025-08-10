import PrimaryButton from '@/components/Buttons';
import IconButton from '@/components/Buttons/Icon';
import Button from '@/components/Buttons/Schedule';
import ReusableIcon from '@/components/Reusable/Icon';
import ReusableImage from '@/components/Reusable/Image';
import Loader from '@/components/Reusable/Loader';
import ReusableScrollView from '@/components/Reusable/Wrapper/ScrollView';
import Text from '@/components/Text';
import Wrapper from '@/components/Wrapper';
import { testdriveAPI, vehicleAPI } from '@/services';
import { getDates, highlightSelectedTile } from '@/utils';
import Constants from 'expo-constants';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Animated, Dimensions, FlatList, Modal } from 'react-native';

const mustBeDisabled = (time, date) => {
    const today = moment().add(2, 'hours');

    let datetime = moment(date).startOf('day');
    const splitTime = time.split(/:/)
    datetime.hours(parseInt(splitTime[0])).minutes(parseInt(splitTime[1])).seconds(0).milliseconds(0);
    return datetime.isBefore(today);
}

const data = getDates();
const { width, height } = Dimensions.get('window');

const CarouselItem = ({name, selectedId}) => {
    const isNotLast = selectedId < data.length - 1;
    const isNotFirst = selectedId > 0;    
    return <Wrapper
        width={width}
        backgroundColor='zircon'
    >
        {isNotFirst && <Text
            textTransform= 'uppercase'
            fontFamily= 'BebasNeue-Regular'
            fontSize={24}
            lineHeight={47}
            height={47}
            textAlign='center'
            textColor='raven'
            position='absolute'
            left={10}
            top={15}
            width='25%'
        >
            {data[selectedId - 1].display}
        </Text>}
        <Wrapper
            borderBottomColor='cornflowerBlue'
            borderBottomWidth={5}
            height={70}
            backgroundColor='zircon'
        >
            <Text
                textTransform= 'uppercase'
                fontFamily= 'BebasNeue-Regular'
                fontSize={30}
                lineHeight={50}
                textAlign='center'
            >
                {name}
            </Text>
        </Wrapper>
        {isNotLast && <Text
            textTransform='uppercase'
            fontFamily='BebasNeue-Regular'
            fontSize={24}
            lineHeight={47}
            textAlign='center'
            color='raven'
            position='absolute'
            left={width - 110}
            width='25%'
            top={15}
        >
            {data[selectedId + 1].display}
        </Text>}
    </Wrapper>
};

export default function TestDrive({scheduleModal, showHideScheduleModal, vehicleData, navigation}) {

    const dispatch = useDispatch();
    const state = useSelector(authState);
    const vState = useSelector(vehicleState);
    const [selectedId, setSelectedId] = useState(0);
    const [timeSlot, setTimeSlot] = useState([]);
    const [selectSlot, setSelectSlot] = useState([]);
    const [groups, setGroups] = useState([]);
    const [groupedSlots, setGroupedSlots] = useState({});
    const [currentDate, setCurrentDate] = useState(moment().format().split('T')[0]);
    const [sellerDetails, setSellerDetails] = useState({});
    const [vehicle, setVehicle] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getSlots = async () => {
        try {
            setLoading(true);
            setError('');
            const {slots, sellerDetails} = await testdriveAPI.getTestDriveSlotsForVehicle(vehicleData.id, currentDate);

            console.log('SLOTS', slots);
            console.log('SELLER', sellerDetails);
            setTimeSlot(slots);
            const groupedSlots = slots && slots.length > 0 ? slots.reduce((curr, slot) => {
                if (curr[slot.group]) {
                    curr[slot.group].push({
                        _id: slot._id,
                        time: slot.time,
                        disabled: mustBeDisabled(slot.time, currentDate)
                    })
                } else {
                    curr[slot.group] = [];
                    curr[slot.group].push({
                        _id: slot._id,
                        time: slot.time,
                        disabled: mustBeDisabled(slot.time, currentDate)
                    })
                }
                return curr;
            }, {}) : {};
            setGroupedSlots(groupedSlots);
            setGroups(Object.keys(groupedSlots));
            setSellerDetails(sellerDetails);
            setLoading(false);            

        } catch (e) {
            setLoading(false);
            setError(e.message);
        }
    }

    const handleTimeSelection = slot => {
        setSelectSlot(slot);
    }

    const bookTestDrive = async () => {
        if(selectSlot.length > 0){
            
        }
    }

    const scrollX = new Animated.Value(0);
    const onViewRef = React.useRef(({viewableItems})=> {
        setSelectedId(viewableItems[0].index);
        setCurrentDate(data[viewableItems[0].index].date);
        setSelectSlot([]);
    });
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

    useEffect(() => {
        if( vehicleData?.id ) {
            fetchVehicle(vehicleData.id)
        }

        async function fetchVehicle(id) {
            try {
                setLoading(true);
                setError('');
                const {vehicle} = await vehicleAPI.getVehicle(id);
                setVehicle(vehicle);
                getSlots();
                setLoading(false);
            } catch (e) {
                setLoading(false);
                setError(e.message);
            }
        }

    }, [vehicleData]);

    useEffect(() => {
        getSlots();
    }, [currentDate]);

    const commonProps = {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 21,
        width: '100%',
        flexWrap: 'wrap',
        paddingLeft: 27
    }
    
    const commonPropsTwo = {
        height: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        width: '85%'
    }
    
    return (
        <Modal
            animationType='fade'
            transparent={false}
            visible={scheduleModal}
            style={{
                width: width,
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: Constants.statusBarHeight,
            }}
        >
            <Wrapper
                marginTop={Constants.statusBarHeight}
                width='100%'
                minHeight={height}
            >
                {loading && <Loader />}
                <Wrapper
                    justifyContent='flex-end'
                    width='90%'
                    flexDirection='row'
                >
                    <IconButton
                        handleTileSelection={() => {
                            showHideScheduleModal(!scheduleModal)
                        }}
                    >
                        <ReusableIcon
                            iconName='close'
                            iconSize={24}
                            iconColor='black'
                            evilicons={true}
                        />
                    </IconButton>
                </Wrapper>
                <Wrapper
                    justifyContent='flex-start'
                    width='90%'
                    flexDirection='row'
                >
                    <Wrapper
                        marginRight={14.99}
                        width={100}
                        height={100}
                        borderTopRightRadius={50}
                        borderTopLeftRadius={50}
                        borderBottomLeftRadius={50}
                        borderBottomRightRadius={50}
                    >
                        <ReusableImage
                            style={{
                                width: 100,
                                height: 100,
                            }}
                            remote
                            ImgSrc={vehicleData?.image}
                        />
                    </Wrapper>
                    <Wrapper
                        justifyContent='flex-start'
                        alignContent='flex-start'
                        flexDirection='column'
                        height='100%'
                    >
                        <Text
                            fontSize={13}
                            lineHeight={18.2}
                            width='100%'
                        >
                            Schedule a test drive for
                        </Text>
                        <Text
                            fontSize={22}
                            lineHeight={26.2}
                            width='100%'
                            fontFamily={'Poppins-Bold'}
                        >
                            {vehicleData?.name}
                        </Text>
                        <Text
                            fontSize={13}
                            lineHeight={18.2}
                            width='100%'
                            textColor='raven'
                        >
                            You will be driving a
                        </Text>
                        <Text
                            fontSize={13}
                            lineHeight={18.2}
                            width='100%'
                        >
                            {vehicle?.brand}{' '}{vehicle?.model}
                        </Text>
                    </Wrapper>
                </Wrapper>

                <Wrapper
                    marginTop={30}
                    marginBottom={10}
                    width={width}
                    alignItems='flex-start'
                    backgroundColor='zircon'
                    height={74}
                >
                    <FlatList
                        data={data}
                        renderItem={({item}) => {
                            return <CarouselItem key={item.id} selectedId={selectedId} name={item.display} />
                        }}
                        numColumns={1}
                        horizontal
                        keyExtractor={(_, index) => 'key' + index}
                        pagingEnabled
                        scrollEnabled
                        snapToAlignment="center"
                        scrollEventThrottle={1}
                        decelerationRate={"fast"}
                        showsHorizontalScrollIndicator={false}
                        onScroll={() => {
                            Animated.event(
                                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                {useNativeDriver: false}
                            )
                        }}
                        onViewableItemsChanged={onViewRef.current}
                        viewabilityConfig={viewConfigRef.current}
                    />
                </Wrapper>

                <ReusableScrollView>
                <Wrapper
                    width={width}
                    minHeight={height}
                    marginBottom={200}
                >
                    {groups.map(group => {
                        return (
                            <Fragment>
                            <Wrapper
                                {...commonPropsTwo}
                                key={group}
                            >
                                <Text
                                    fontSize={13}
                                    lineHeight={18.2}
                                >
                                    {group}
                                </Text>
                            </Wrapper>
                            <Wrapper
                                {...commonProps}
                            >
                                {groupedSlots[group] && groupedSlots[group].map((item, i) => {
                                    return <Button
                                        index={item._id}
                                        time={item.time}
                                        handleTimeSelection={() =>{
                                            handleTimeSelection(item._id)
                                        }}
                                        selected={highlightSelectedTile(selectSlot, item._id)}
                                        greyedOut={item.disabled}
                                    />
                                })}
                            </Wrapper>
                        </Fragment>)
                    })}
                    {error !== "" &&
                        <Wrapper
                            justifyContent='center'
                            alignItems='center'
                            width='100%'
                            height={15}
                            marginBottom={0}
                            marginTop={30}
                        >
                            <Text
                                textColor='red'
                                fontSize={12}
                                textAlign='center'
                                height={15}
                                lineHeight={15}
                            >
                                {error}
                            </Text>
                        </Wrapper>}
                    <Wrapper
                        marginTop={36}
                        width='100%'
                    >
                        <PrimaryButton
                            handleButtonClick={() => bookTestDrive()}
                            text='Schedule test drive'
                            disabled={selectSlot.length === 0}
                            bgColor={selectSlot.length > 0 ? 'cornflowerBlue' : 'cadetBlue'}
                            textColor='white'
                        />
                    </Wrapper>
                </Wrapper>
                </ReusableScrollView>
            </Wrapper>
        </Modal>
    );
}
