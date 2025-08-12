import ReusableButton from '@/components/Reusable/Button';
import ReusableIcon from '@/components/Reusable/Icon';
import Loader from '@/components/Reusable/Loader';
import ReusableText from '@/components/Reusable/Text';
import ReusableTile from '@/components/Reusable/Tile';
import ReusableInnerWrapper from '@/components/Reusable/Wrapper/Inner';
import ReusableOuterWrapper from '@/components/Reusable/Wrapper/Outer';
import CustomTheme from '@/theme';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';


function ExploreScreen() {
  const { width, height } = Dimensions.get('window');
  const router = useRouter();
  const scrollRef = useRef(null);

  const [tabSelection, setTabSelection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [vehicleList, setVehicleList] = useState([]);

  useEffect(() => {
    // Simulate initial data load
    setTimeout(() => {
      setVehicleList([
        {
          id: '1',
          brand: 'Toyota',
          model: 'Corolla',
          price: 250000,
          new: true,
          name: 'Toyota Corolla 2022',
          image: 'https://via.placeholder.com/300x180',
        },
        {
          id: '2',
          brand: 'Ford',
          model: 'Ranger',
          price: 400000,
          new: true,
          name: 'Ford Ranger 2023',
          image: 'https://via.placeholder.com/300x180',
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const onTabSelect = (index: number) => {
    setTabSelection(index);
  };

  const handleLocationFilter = () => {
    router.push('/buyer/vehicles/location');
  };

  const handleVehicleFilter = () => {
    router.push('/buyer/vehicles/filter');
  };

  return (
    <ReusableOuterWrapper
      style={{
        backgroundColor: 'white',
        width,
        minHeight: height,
        position: 'relative',
      }}
    >
      {isLoading && <Loader />}

      {/* Filter Controls */}
      <ReusableInnerWrapper
        style={{
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 32,
          width: '98%',
          marginHorizontal: 'auto',
        }}
      >
        <ReusableTile
          style={{
            width: '15%',
            height: 52,
            marginHorizontal: 5,
            backgroundColor: 'cornflowerBlue',
          }}
          handleTileSelection={handleLocationFilter}
          shadowColor={CustomTheme.colors.periwinkleGray}
        >
          <ReusableIcon iconName="map-marker-alt" iconSize={24} iconColor="white" fontisto />
        </ReusableTile>

        {/* New Tab */}
        <ReusableButton
          style={{
            width: '30%',
            height: 50,
            backgroundColor: tabSelection === 0 ? 'cornflowerBlue' : 'white',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            borderWidth: tabSelection === 0 ? 0 : 1,
            borderColor: 'cornflowerBlue',
          }}
          handleOnPress={() => onTabSelect(0)}
        >
          <ReusableText
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: tabSelection === 0 ? 'white' : 'cornflowerBlue',
              textAlign: 'center',
            }}
          >
            New
          </ReusableText>
        </ReusableButton>

        {/* Used Tab */}
        <ReusableButton
          style={{
            width: '30%',
            height: 50,
            backgroundColor: tabSelection === 1 ? 'cornflowerBlue' : 'white',
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            borderWidth: tabSelection === 1 ? 0 : 1,
            borderColor: 'cornflowerBlue',
          }}
          handleOnPress={() => onTabSelect(1)}
        >
          <ReusableText
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: tabSelection === 1 ? 'white' : 'cornflowerBlue',
              textAlign: 'center',
            }}
          >
            Used
          </ReusableText>
        </ReusableButton>

        <ReusableTile
          style={{
            width: '15%',
            height: 52,
            marginHorizontal: 5,
            backgroundColor: 'cornflowerBlue',
          }}
          handleTileSelection={handleVehicleFilter}
          shadowColor={CustomTheme.colors.periwinkleGray}
        >
          <ReusableIcon iconName="filter" iconSize={24} iconColor="white" fontisto />
        </ReusableTile>
      </ReusableInnerWrapper>

      
    </ReusableOuterWrapper>
  );
}

export default ExploreScreen;
