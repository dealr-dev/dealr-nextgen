import ReusableIcon from '@/components/Reusable/Icon';
import ReusableImage from '@/components/Reusable/Image';
import ReusableInputText from '@/components/Reusable/InputText';
import ReusableText from '@/components/Reusable/Text';
import ReusableTile from '@/components/Reusable/Tile';
import ReusableInnerWrapper from '@/components/Reusable/Wrapper/Inner';
import { metadataAPI } from '@/services';
import CustomTheme from '@/theme';
import { sortItemsByAsc } from '@/utils';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, FlatList, Modal } from 'react-native';

const { width, height } = Dimensions.get('window');

const CarouselItem = ({arr, handleTileSelection, brands}) => { 
    const { item, index } = arr;
    return (
        <ReusableInnerWrapper
            style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: 355,
                height: 84,
                paddingLeft: 5,
            }}
        >
            {item.map((brand, i) => {
                return <ReusableTile
                    key={i}
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 83,
                        height: 84,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        backgroundColor: 'white',
                        marginRight: 5,
                        borderBottomColor: 'alto',
                        borderBottomWidth: 1,
                        borderTopColor: 'alto',
                        borderTopWidth: 1,
                        borderLeftColor: 'alto',
                        borderLeftWidth: 1,
                        borderRightColor: 'alto',
                        borderRightWidth: 1,
                        
                    }}
                    handleTileSelection={() => {
                        handleTileSelection(index > 0 ? (i + brands[index - 1].length) : i, index)
                    }}
                    shadowColor={CustomTheme.colors.periwinkleGray}
                >
                    <ReusableInnerWrapper
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 54,
                            width: 54
                        }}
                    >
                        <ReusableImage
                            style={{
                                width: 44,
                                height: 44,
                                position: 'relative'
                            }}
                            resizeMode='cover'
                            remote
                            ImgSrc={brand.logo}
                        />
                    </ReusableInnerWrapper>
                    <ReusableText 
                        style={{
                            fontFamily: 'Poppins-Medium',
                            fontWeight: '600',
                            fontSize: 10,
                            lineHeight: 18,
                            textAlign: 'center',
                            color: 'black'
                        }}
                    >
                        {brand.name}
                    </ReusableText>
                </ReusableTile>
            })}
        </ReusableInnerWrapper>
    )
};

export default function Make({makeModal, showHideMakeModal, handleMakeText}) {
    
    const [cars, setCars] = useState([]);
    const [topBrands, setTopBrands] = useState([]);
    const [searchText, setSearchText] = useState(null);

    const getTopBrands = items => {
        const size = 4;
        const result = [];
      
        for (let i = 0; i < items.length; i += size) {
          result.push(items.slice(i, i + size));
        }
      
        setTopBrands(result);
    };

    useEffect(() => {
        async function fetchCarsData (){
            const { brands } = await metadataAPI.searchBrands();
            const sortBrands = sortItemsByAsc(brands, 'name');
            getTopBrands(sortBrands);
            setCars(sortBrands);
        };
        fetchCarsData();
    }, []);

    
    const handleBrandSelection = (i, index) => {
        if(i <= 3) {
            handleMakeText(topBrands[0][i].name);
            showHideMakeModal(!makeModal);
        } else {
            handleMakeText(topBrands[index][i - topBrands[index - 1].length].name)
            showHideMakeModal(!showHideMakeModal);
        }
    };
    
    const handleVehicleBrandSearch = async text => {
        setSearchText(text);
        const { brands } = text ? await metadataAPI.searchBrands(text) : await metadataAPI.searchBrands();
        const sortBrands = sortItemsByAsc(brands, 'name');
        getTopBrands(sortBrands);
        setCars(sortBrands);
    }

    const handleSelection = ({name}) => {
        handleMakeText(name);
        showHideMakeModal(!showHideMakeModal);
    }
    
    const scrollX = new Animated.Value(0);
    return ( 
        <Modal
            animationType='fade'
            transparent={false}
            visible={makeModal}
        >
            <ReusableInnerWrapper
                style={{
                    marginTop: Constants.statusBarHeight,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    minHeight: height
                }}
            >
                <ReusableInnerWrapper
                    style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        width: '90%',
                        minHeight: height
                    }}
                >
                    <ReusableText
                        style={{
                            textTransform: 'uppercase',
                            fontFamily: 'BebasNeue-Regular',
                            color: 'black',
                            fontSize: 34,
                            marginTop: 16,
                            marginBottom: 16,
                            lineHeight: 40
                        }}
                    >
                        make
                    </ReusableText>
                </ReusableInnerWrapper>
                <ReusableInnerWrapper
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginTop: 24,
                        paddingLeft: 10
                    }}
                >
                    <FlatList
                        data={topBrands}
                        style={{
                            width: width,
                            overflow: 'visible'
                        }}
                        renderItem={item => {
                            return <CarouselItem brands={topBrands} handleTileSelection={handleBrandSelection} arr={item} />
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
                    />
                </ReusableInnerWrapper>
                <ReusableInnerWrapper
                    style={{
                        width: width,
                        height: 115,
                        paddingLeft: 0,
                    }}
                >
                    <ReusableInnerWrapper
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            height: 'auto',
                            backgroundColor: 'white',
                        }}
                    >
                        <ReusableInputText
                            style={{
                                width: '80%',
                                height: 'auto',
                                color: 'raven',
                                fontSize: 13,
                                borderBottomColor: 'alto',
                                borderBottomWidth: 1,
                                marginLeft: 25,
                                backgroundColor: 'white'
                            }}
                            borderless={true}
                            color={CustomTheme.colors['raven']}
                            placeholder="Type in your car brand"
                            handleTextChange={text => {handleVehicleBrandSearch(text)}}
                            placeholderTextColor={CustomTheme.colors.mineShaft}
                        />
                        <ReusableTile
                            style={{
                                height: 52,
                                width: 52,
                                borderTopRightRadius: 10,
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                backgroundColor: 'cornflowerBlue',
                                marginRight: 25
                            }}
                            handleTileSelection={() => {
                                const isValidMake = cars.filter(car => {
                                    return car.name === searchText
                                }).length > 0;
                                if( isValidMake ) {
                                    handleMakeText(searchText);
                                    showHideMakeModal(!showHideMakeModal);
                                }
                            }}
                            shadowColor={CustomTheme.colors.periwinkleGray}
                            activeOpacity={1}
                        >
                            <ReusableIcon
                                iconName='md-search'
                                iconSize={30}
                                iconColor='white'
                                ionicons={true}
                            />
                        </ReusableTile>
                    </ReusableInnerWrapper>
                </ReusableInnerWrapper>
                <ReusableInnerWrapper
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: width
                    }}
                >
                    <FlatList
                        data={cars}
                        style={{
                            height: 500,
                            width: width
                        }}
                        keyExtractor={ (_, index) => index.toString()}
                        renderItem={ ({ item, index }) =>
                            <ReusableTile shadowless={true} handleTileSelection={() => handleSelection(item)}>
                                <ReusableInnerWrapper
                                    style={{
                                        width: '88%',
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        backgroundColor: index % 2 == 0  ? 'gallery' : 'white',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        paddingLeft: 30,
                                        minHeight: height
                                    }}
                                >
                                    <ReusableInnerWrapper
                                        style={{
                                            height: 54,
                                            width: 54,
                                            borderTopRightRadius: 54,
                                            borderTopLeftRadius: 54,
                                            borderBottomLeftRadius: 54,
                                            borderBottomRightRadius: 54,
                                            marginRight: 10,
                                        }}
                                    >
                                        <ReusableImage
                                            style={{
                                                width: '80%',
                                                height: 44,
                                                position: 'relative'
                                            }}
                                            resizeMode='cover'
                                            remote
                                            ImgSrc={item.logo}
                                        />
                                    </ReusableInnerWrapper>
                                    <ReusableText
                                        style={{
                                            textAlign: 'left',
                                            height: 25,
                                            lineHeight: 25,
                                        }}
                                    >
                                        {item.name}
                                    </ReusableText>
                                </ReusableInnerWrapper>
                            </ReusableTile>
                        }
                    />
                </ReusableInnerWrapper>
            </ReusableInnerWrapper>
        </Modal>
    );
}
