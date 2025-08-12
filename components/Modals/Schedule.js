import { scheduleAPI } from '@/services';
import CustomTheme from '@/theme';
import { getDates, highlightSelectedTile } from '@/utils';
import Constants from 'expo-constants';
import moment from 'moment';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Modal
} from 'react-native';
import PrimaryButton from '../Buttons';
import IconButton from '../Buttons/Icon';
import Button from '../Buttons/Schedule';
import ReusableIcon from '../Reusable/Icon';
import ReusableImage from '../Reusable/Image';
import Loader from '../Reusable/Loader';
import ReusableTile from '../Reusable/Tile';
import ReusableScrollView from '../Reusable/Wrapper/ScrollView';
import Text from '../Text';
import Wrapper from '../Wrapper';



const data = getDates();
const { width, height } = Dimensions.get('window');

const CarouselItem = ({ name, selectedId }) => {
  const isNotLast = selectedId < data.length - 1;
  const isNotFirst = selectedId > 0;

  return (
    <Wrapper width={width} backgroundColor='zircon'>
      {isNotFirst && (
        <Text
          textTransform='uppercase'
          fontFamily='BebasNeue-Regular'
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
        </Text>
      )}
      <Wrapper
        borderBottomColor='cornflowerBlue'
        borderBottomWidth={5}
        height={70}
        backgroundColor='zircon'
      >
        <Text
          textTransform='uppercase'
          fontFamily='BebasNeue-Regular'
          fontSize={30}
          lineHeight={50}
          textAlign='center'
        >
          {name}
        </Text>
      </Wrapper>
      {isNotLast && (
        <Text
          textTransform='uppercase'
          fontFamily='BebasNeue-Regular'
          fontSize={24}
          lineHeight={47}
          textAlign='center'
          textColor='raven'
          position='absolute'
          left={width - 110}
          width='25%'
          top={15}
        >
          {data[selectedId + 1].display}
        </Text>
      )}
    </Wrapper>
  );
};

export default function Schedule({
  scheduleModal,
  showHideScheduleModal,
  vehicleSchedule,
  isLoading,
  onLoading,
  onError,
  onSaveSchedule
}) {
  const [selectedId, setSelectedId] = useState(0);
  const [timeSlots, setTimeSlots] = useState([]);
  const [defaults, setDefaults] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupedSlots, setGroupedSlots] = useState({});
  const [currentDate, setCurrentDate] = useState(moment());

  const getSlots = () => {
    onLoading(true);
    scheduleAPI
      .getSlots()
      .then(({ slots }) => {
        const grouped = slots?.length
          ? slots.reduce((curr, slot) => {
              if (!curr[slot.group]) curr[slot.group] = [];
              curr[slot.group].push({ _id: slot._id, time: slot.time });
              return curr;
            }, {})
          : {};
        setGroupedSlots(grouped);
        setGroups(Object.keys(grouped));

        return scheduleAPI.getSellerScheduleSlots(
          '5fc997aee08e2f00085f352b',
          currentDate.format().split('T')[0]
        );
      })
      .then(({ slots }) => {
        setTimeSlots(slots);
        onLoading(false);
      })
      .catch((e) => {
        onLoading(false);
        console.log(e);
        onError(e.message);
      });
  };

  const handleTimeSelection = (slotId) => {
    setTimeSlots((prev) =>
      prev.includes(slotId) ? prev.filter((id) => id !== slotId) : [...prev, slotId]
    );
  };

  const handleDefaultSelection = (group) => {
    const isIndexFound = defaults.findIndex((i) => i.group === group);
    if (isIndexFound >= 0) {
      setDefaults((prev) => prev.filter((item) => item.group !== group));
    } else {
      const selectedSlots = timeSlots
        .map((id) => groupedSlots[group].find((slot) => slot._id === id))
        .filter(Boolean)
        .map((slot) => slot._id);
      setDefaults((prev) => [...prev, { group, slots: selectedSlots }]);
    }
  };

  const scrollX = useRef(new Animated.Value(0)).current;
  const onViewRef = useRef(({ viewableItems }) => {
    setSelectedId(viewableItems[0].index);
    setCurrentDate(data[viewableItems[0].index].date);
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

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
  };

  const commonPropsTwo = {
    height: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '85%'
  };

  return (
    <Modal animationType='fade' transparent={false} visible={scheduleModal}>
      <Wrapper marginTop={Constants.statusBarHeight} width='100%' minHeight={height}>
        {isLoading && <Loader />}
        <Wrapper justifyContent='flex-end' width='90%' flexDirection='row'>
          <IconButton handleTileSelection={() => showHideScheduleModal(false)}>
            <ReusableIcon
              iconName='close'
              iconSize={24}
              iconColor='black'
              evilicons={true}
            />
          </IconButton>
        </Wrapper>

        <Wrapper justifyContent='flex-start' width='90%' flexDirection='row'>
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
              style={{ width: 100, height: 100 }}
              remote
              ImgSrc={vehicleSchedule?.image}
            />
          </Wrapper>
          <Wrapper justifyContent='flex-start' flexDirection='column'>
            <Text fontSize={13} lineHeight={18.2}>
              Schedule a test drive for
            </Text>
            <Text fontSize={22} lineHeight={26.2} fontFamily='Poppins-Bold'>
              {vehicleSchedule?.car}
            </Text>
            <Text fontSize={13} lineHeight={18.2} textColor='raven'>
              You will be driving a
            </Text>
            <Text fontSize={13} lineHeight={18.2}>
              {vehicleSchedule?.description}
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
            renderItem={({ item }) => (
              <CarouselItem selectedId={selectedId} name={item.display} />
            )}
            horizontal
            pagingEnabled
            snapToAlignment='center'
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => 'key' + index}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
          />
        </Wrapper>

        <ReusableScrollView>
          <Wrapper width={width} minHeight={height} marginBottom={200}>
            {groups.map((group) => {
              const isSetDefault = defaults.some((item) => item.group === group);
              return (
                <Fragment key={group}>
                  <Wrapper {...commonPropsTwo}>
                    <Text fontSize={13} lineHeight={18.2}>
                      {group}
                    </Text>
                    <ReusableTile
                      handleTileSelection={() => handleDefaultSelection(group)}
                      activeOpacity={1}
                      shadowColor={CustomTheme.colors.periwinkleGray}
                    >
                      <Text
                        fontSize={13}
                        lineHeight={18.2}
                        textColor={isSetDefault ? 'raven' : 'cornflowerBlue'}
                        fontFamily='Poppins-SemiBold'
                      >
                        {isSetDefault ? 'Remove Default' : 'Set as default'}
                      </Text>
                    </ReusableTile>
                  </Wrapper>
                  <Wrapper {...commonProps}>
                    {groupedSlots[group]?.map((item) => (
                      <Button
                        key={item._id}
                        index={item._id}
                        time={item.time}
                        handleTimeSelection={() => handleTimeSelection(item._id)}
                        selected={highlightSelectedTile(timeSlots, item._id)}
                        greyedOut={false}
                      />
                    ))}
                  </Wrapper>
                </Fragment>
              );
            })}
            <Wrapper marginTop={36} width='100%'>
              <PrimaryButton
                handleButtonClick={() => {
                  if (timeSlots.length > 0) {
                    onLoading(true);
                    onSaveSchedule({
                      seller: '5fc997aee08e2f00085f352b',
                      date: currentDate,
                      slots: timeSlots,
                      defaults: defaults
                    }).finally(() => onLoading(false));
                  }
                }}
                text='Schedule test drive'
                bgColor={timeSlots.length > 0 ? 'cornflowerBlue' : 'cadetBlue'}
                textColor='white'
              />
            </Wrapper>
          </Wrapper>
        </ReusableScrollView>
      </Wrapper>
    </Modal>
  );
}
