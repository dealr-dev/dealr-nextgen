import Button from '@/components/Listing/Button';
import Container from '@/components/Listing/Container';
import ListContainer from '@/components/Listing/ListContainer';
import ListView from '@/components/Listing/ListView';
import Overlay from '@/components/Listing/Overlay';
import Title from '@/components/Listing/Title';
import BackButton from '@/components/Reusable/BackButton';
import ReusableButton from '@/components/Reusable/Button';
import ReusableIcon from '@/components/Reusable/Icon';
import Loader from '@/components/Reusable/Loader';
import ReusableText from '@/components/Reusable/Text';
import ReusableTile from '@/components/Reusable/Tile';
import ReusableInnerWrapper from '@/components/Reusable/Wrapper/Inner';
import ReusableOuterWrapper from '@/components/Reusable/Wrapper/Outer';
import { vehicleAPI } from '@/services';
import CustomTheme from '@/theme';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';

const sortResults = [
    "Price: High to Low",
    "Price: Low to High",
    "Best Match",
    "Location"
]

const mapSorting = {
    'Price: High to Low': 'pricehigh',
    'Price: Low to High': 'pricelow',
    'Best Match': 'bestmatch',
    'Location': 'location'
};

const mapInverseSorting = {
    'pricehigh': 'Price: High to Low',
    'pricelow' : 'Price: Low to High',
    'bestmatch': 'Best Match',
    'location': 'Location'
};

const serviceMappings = {
    'pricehigh': 'getVehiclesByPriceFromHighToLow',
    'pricelow': 'getVehiclesByPriceFromLowToHigh',
    'bestmatch': 'getVehiclesByBestMatch',
    'location': 'getVehiclesByLocation'
}


export default function ExploreScreen() {
  const { width, height } = Dimensions.get('window');
  const router = useRouter();
  const scrollRef = useRef(null);

  const [total, setTotal] = useState(0);

  const [sort, setSort] = useState('pricehigh')

  const [tabSelection, setTabSelection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleList, setVehicleList] = useState([]);

  const [error, setError] = useState("");

  const [condition, setCondition] = useState('new');

    

const [showHideSorting, setShowHideSorting] = useState(false);

    const [selection, setSelection] = useState(-1);

  useEffect(() => {
        load(0, 10);
  }, [sort]);

  const load = async (page, size) => {
    const methodName = serviceMappings[sort];
    if (typeof vehicleAPI[methodName] === 'function') {
        try {
            setIsLoading(true);
            const {results, skip, vehicles} = await vehicleAPI[methodName]({}, condition, null, null, page, size);
            setTotal(results);
            setVehicleList(vehicles);
            setIsLoading(false)
        } catch (e) {
            console.log('ERROR', e.message);
            setError(e.message);
            setIsLoading(false);
        }
    } else {
      console.error(`Invalid method: ${methodName}`);
    }
  };
  
  const handleSortSelection = (item) => {
        setSort(mapSorting[item]);
        setShowHideSorting(prev => !prev)
  }
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

      {error !== '' && <ReusableInnerWrapper style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                width: width,
                marginTop: 26
            }}>
                <ReusableText
                    style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 13,
                        lineHeight: 19,
                        height: 19,
                        color: 'error',
                        textAlign: 'center'
                    }}
                >
                    {error}
                </ReusableText>
            </ReusableInnerWrapper>}

            <ReusableInnerWrapper
                style={{
                    height: 50,
                    width: width,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 32,
                    marginRight: 'auto',
                    marginLeft: 'auto',

                    backgroundColor: 'zircon',
                    zIndex: 2,
                }}
            >
                <ReusableText
                    style={{
                        fontWeight: '600',
                        fontFamily: 'Poppins-Regular',
                        fontSize: 13,
                        lineHeight: 18.2,
                        width: 71,
                        height: 19,
                        textAlign: 'center',
                        color: 'black',
                        marginLeft: 25
                    }}
                >
                    {total} {total === 1 ? 'result' : 'results'}
                </ReusableText>
                <ReusableInnerWrapper
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        backgroundColor: 'zircon',
                        marginRight: 25
                    }}
                >
                    <ReusableText
                        style={{
                            fontWeight: '600',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 13,
                            lineHeight: 18.2,
                            width: 71,
                            height: 19,
                            textAlign: 'center',
                            color: 'black'
                        }}
                    >
                        Sort by
                    </ReusableText>
                    <ReusableText
                        style={{
                            fontFamily: 'Poppins-Regular',
                            fontSize: 13,
                            lineHeight: 18.2,
                            height: 19,
                            textAlign: 'center',
                            color: 'cornflowerBlue',
                            marginRight: 5,
                        }}
                    >
                        {mapInverseSorting[sort]}
                    </ReusableText>
                    <BackButton
                        iconName={showHideSorting ? "arrowup" : "arrowdown"}
                        handleOnPress={() => setShowHideSorting(prev => !prev)}
                        iconSize={18}
                        iconColor={CustomTheme.colors.cornflowerBlue}
                    />
                </ReusableInnerWrapper>

            </ReusableInnerWrapper>

            <Container>
                {showHideSorting && <Overlay>
                    <ListContainer>
                        {sortResults && sortResults.map((item, i) => (
                            <Button onPress={() => handleSortSelection(item)}>
                                <ListView key={i}>
                                    <Title>{item}</Title>
                                </ListView>
                            </Button>
                        ))}
                    </ListContainer>
                </Overlay>}


            </Container>         
    </ReusableOuterWrapper>
  );
}
