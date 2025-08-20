import PrimaryButton from '@/components/Buttons';
import Button from '@/components/Buttons/Schedule';
import ScreenTopNav from '@/components/nav/TopNav';
import ReusableIcon from '@/components/Reusable/Icon';
import Loader from '@/components/Reusable/Loader';
import ReusableTile from '@/components/Reusable/Tile';
import ReusableScrollView from '@/components/Reusable/Wrapper/ScrollView';
import Text from '@/components/Text';
import Wrapper from '@/components/Wrapper';
import { scheduleAPI } from '@/services';
import Auth from '@/services/AuthService';
import CustomTheme from '@/theme';
import { getDates, highlightSelectedTile, mapFromUserAttributes, stringListReturnWhatsInAandExistsInB, stringListsAreTheSame } from '@/utils';
import Constants from 'expo-constants';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Animated, Dimensions, FlatList } from 'react-native';


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

export default function SetAvailability() {

    const [selectedId, setSelectedId] = useState(0);
    const [timeSlots, setTimeSlots] = useState([]);
    const [defaults, setDefaults] = useState([]);
    const [originalDefaults, setOriginalDefaults] = useState([]);
    const [groups, setGroups] = useState([]);
    const [groupedSlots, setGroupedSlots] = useState({});
    const [currentDate, setCurrentDate] = useState(null);

    const [userAttributes, setUserAttributes] = useState(null);

    const [user, setUser] = useState(null);

    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);
    const [softloading, setSoftLoading] = useState(false);

    const [touched, setTouched] = useState(false);

    const handleTimeSelection = slot => {
        setTouched(true);
        if(timeSlots.indexOf(slot) >= 0) {
            let newTimeSlots = timeSlots.filter(item => item !== slot);
            setTimeSlots(newTimeSlots);
        } else {
            setTimeSlots(timeSlots => [...timeSlots, slot]);
        }
    }

    const handleDefaultSelection = (group, iscurrentlydefault) => {
        console.log('handleDefaultSelection', {group, originalDefaults})
        const touchedDefaults = mapToTouchedDefaultsMap();
        setTouched(true);
        const isgroupcurrentlyinthetoucheddefaultlist = touchedDefaults ? Object.keys(touchedDefaults).includes(group) : false;

        if (isgroupcurrentlyinthetoucheddefaultlist) {
            setDefaults(defaults.filter(item => item.group !== group));    
        } else {
            if (iscurrentlydefault) {
                const newdefaults = [...defaults, {group, slots: []}];
                setDefaults(newdefaults);
                setTouched(true);
            } else {
                const selectedslotsforthisgroup = stringListReturnWhatsInAandExistsInB(groupedSlots[group] && groupedSlots[group].length > 0 ? groupedSlots[group].map(x => x._id): null, timeSlots);
                const newdefaults = [...defaults, { group, slots: selectedslotsforthisgroup ? selectedslotsforthisgroup : []}];
                setDefaults(newdefaults);

                if (!touched && originalDefaults) {
                    const isthenewlistthesameisoriginal = stringListsAreTheSame(originalDefaults[group], selectedslotsforthisgroup)
                    setTouched(!isthenewlistthesameisoriginal)
                }
            }
        }
    }

    const scrollX = new Animated.Value(0);
    const onViewRef = React.useRef(({viewableItems})=> {
        setSelectedId(viewableItems[0].index);
        setCurrentDate(data[viewableItems[0].index].date);
    });
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

    useEffect(() => {
        //initializeAllSellerAndSlots();

        async function initializeAllSellerAndSlots () {
            try {
                setLoading(true);

                const [user, {slots}] = await Promise.all([
                    Auth.currentAuthenticatedUser(),
                    scheduleAPI.getSlots()
                ])

                setUser(user);

                const {attributes} = user;

                const {
                    state: { params },
                  } = navigation;

                const {seller, role, customer, route} = mapFromUserAttributes(attributes);
                setUserAttributes({
                    seller, 
                    role : role === 'seller' ? 'seller': 'customer', customer,
                    route,
                    from: params && params.from ? params.from : null
                });
                
                const groupedSlots = slots && slots.length > 0 ? slots.reduce((curr, slot) => {
                    if (curr[slot.group]) {
                        curr[slot.group].push({
                            _id: slot._id,
                            time: slot.time
                        })
                    } else {
                        curr[slot.group] = [];
                        curr[slot.group].push({
                            _id: slot._id,
                            time: slot.time
                        })
                    }
                    return curr;
                }, {}) : {};
    
                setGroupedSlots(groupedSlots);
                setGroups(Object.keys(groupedSlots));
                setLoading(false);
                setCurrentDate(moment())
            }
            catch (e) {
                console.error('ERROR', e.message);
                setLoading(false);
                setError(e.message);
            }
        }
    }, []);

    useEffect(() => {
        setTouched(false);
        setDefaults([]);
        if (userAttributes) {
            loadScheduleSlots();
        }

        async function loadScheduleSlots() {
            try {
                setSoftLoading(true);
                const response = await scheduleAPI.getScheduleSlots(userAttributes[userAttributes.role], userAttributes.role, currentDate > 12 ? currentDate.format().split('T')[0] : currentDate);
                const {slots, defaults} = response;
                setOriginalDefaults(defaults);
                setTimeSlots(slots);
                setSoftLoading(false);
            }
            catch (e) {
                console.error('ERROR', e.message);
                setError(e.message);
                setSoftLoading(false);
            }
        }
    }, [currentDate]);

    useEffect(() => {
        if (loading && error) {
            setError('');
        }
    }, [loading]);

    const save = (goback = false) => {
        /*if (!touched && goback) {
            if (userAttributes.from) {
                navigation.navigate(userAttributes.from)
            } else if (userAttributes.route) {
                if (userAttributes.route.includes('SetAvailability')) {
                    if (userAttributes.role === "seller") {
                        navigation.navigate('AvailabilityListing');
                    } else {
                        navigation.navigate('SellingCars');
                    }
                } else {
                    navigation.navigate(userAttributes.route)
                }
            } else {
                navigation.goBack();
            }
        } else {
            setLoading(true);
            scheduleAPI.saveScheduleSlots(userAttributes[userAttributes.role], userAttributes.role, moment(currentDate).format("YYYY-MM-DD"), timeSlots, defaults).then(response => {
                setLoading(false);
                setTouched(false);
                if (goback) {

                    figureDifferentUserDefaultRoute(user, 'SetAvailability')
                        .then(route => {
                            if (userAttributes.from) {
                                navigation.navigate(userAttributes.from)
                            } else {
                                navigation.navigate(route);
                            }
                        }).catch(e => {
                            setLoading(false);
                            setError(e.message);
                        })
                }
            }).catch(e => {
                setLoading(false);
                setError(e.message);
            })
        }*/
    };

    function mapToTouchedDefaultsMap () {
        if (defaults && defaults.length > 0) {
            return defaults.reduce((defaultsmap, curr) => {
                defaultsmap[curr.group] = [];

                if (curr.slots && curr.slots.length > 0){
                    defaultsmap[curr.group] = curr.slots.map(x => x._id);
                }
    
                return defaultsmap;
            }, {})
        } else {
            return null;
        }
    }

    function isSetAsDefault (group) {
        const touchedDefaults = mapToTouchedDefaultsMap();
        //console.log('isSetAsDefault', {group});

        const touchedGroup = touchedDefaults && touchedDefaults[group] ? touchedDefaults[group] : null;

        const originalGroup = originalDefaults && originalDefaults[group] ? originalDefaults[group] : null;

        if (touchedGroup) {
            return touchedGroup.length > 0;
        } else if (originalGroup) {
            const selectedslotsforthisgroup = stringListReturnWhatsInAandExistsInB(groupedSlots[group] && groupedSlots[group].length > 0 ? groupedSlots[group].map(x => x._id): null, timeSlots);
            return stringListsAreTheSame(originalGroup, selectedslotsforthisgroup);
        }

        return false;

    }

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
        <ReusableScrollView>
            <Wrapper
                marginTop={Constants.statusBarHeight}
                width='100%'
                minHeight={height}
            >
                {loading && <Loader />}
                <ScreenTopNav
                    style={{
                        width: '90%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginLeft: 0,
                        marginRight: 0,
                        left: 1,
                        paddingLeft: 0
                    }}
                >
                    <Wrapper
                        width='80%'
                        justifyContent='flex-start'
                        flexDirection='row'
                    >
                        <Text
                            textTransform='uppercase'
                            fontFamily='BebasNeue-Regular'
                            fontSize={34}
                            marginTop={16}
                            marginBottom={16}
                            lineHeight={41}
                            height={41}
                            textAlign='left'
                        >
                            set availability
                        </Text>
                    </Wrapper>
                    <Wrapper
                        width='20%'
                        justifyContent='flex-start'
                        flexDirection='row'
                    >
                        <ReusableTile
                            style={{
                                width: 54,
                                height: 52,
                                borderTopRightRadius: 10,
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                backgroundColor: 'cornflowerBlue',
                                marginRight: 20
                            }}
                            handleTileSelection={() => {
                                save(true);
                            }}
                            shadowColor={CustomTheme.colors.periwinkleGray}
                        >
                            <ReusableIcon
                                iconName='checkmark'
                                iconSize={24}
                                iconColor='white'
                                ionicons={true}
                            />
                        </ReusableTile>
                    </Wrapper>
                </ScreenTopNav>

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
                            return <CarouselItem selectedId={selectedId} name={item.display} />
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

                <Wrapper
                    width={width}
                    minHeight={height}
                    marginBottom={200}
                >
                    {groups.map(group => {
                            const isSetDefault = isSetAsDefault(group)
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
                                    <ReusableTile
                                        handleTileSelection={() => {
                                            handleDefaultSelection(group, isSetDefault);
                                        }}
                                        activeOpacity={1}
                                        shadowColor={CustomTheme.colors.periwinkleGray}
                                    >
                                        <Text
                                            fontSize={13}
                                            lineHeight={18.2}
                                            textColor={isSetDefault || softloading ? 'raven' : 'cornflowerBlue'}
                                            fontFamily='Poppins-SemiBold'
                                        >
                                            {isSetDefault ? 'Remove Default' : 'Set as default'}
                                        </Text>
                                    </ReusableTile>
                                </Wrapper>
                                <Wrapper
                                    {...commonProps}
                                >
                                    {groupedSlots[group] && groupedSlots[group].map((item, i) => {
                                        return <Button
                                            key={item._id}
                                            index={item._id}
                                            time={item.time}
                                            handleTimeSelection={() =>{
                                                handleTimeSelection(item._id)
                                            }}
                                            selected={highlightSelectedTile(timeSlots, item._id)}
                                            greyedOut={softloading}
                                        />
                                    })}
                                </Wrapper>
                            </Fragment>)
                    })}
                    <Wrapper
                        marginTop={36}
                        width='100%'
                    >
                        <Text
                            fontSize={13}
                            lineHeight={19}
                            textColor='red'
                            fontFamily='Poppins-Regular'
                        >
                            {error}
                        </Text>
                        <PrimaryButton
                            handleButtonClick={()=> {save()}}
                            text='Set availability'
                            bgColor={touched ? 'cornflowerBlue' : 'cadetBlue'}
                            textColor='white'
                            disabled={!touched}
                        />
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        </ReusableScrollView>
    );
}
