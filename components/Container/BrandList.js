import React, { useEffect, useState } from "react";
import { Animated, Dimensions, FlatList } from "react-native";
import {
  sortItemsByAsc
} from "../../../utils";
import { metadataAPI } from "../../services";
import CarouselItem from '../Core/CarouselItem.js.js';
import ReusableText from "../Reusable/Text";
import ReusableInnerWrapper from "../Reusable/Wrapper/Inner";
const { width } = Dimensions.get('window');
const BrandLists = ({brandSelection, onBrandSelectionChange}) => {
    const [cars, setCars] = useState([]);
    const [topBrands, setTopBrands] = useState([]);
    const [brand, setBrand] = useState([]);

    const getTopBrands = items => {
        var size = 4;
        setTopBrands([]);
        for (var i = 0; i < items.length; i += size) {
            setTopBrands(topBrands => [...topBrands, items.slice(i, i + size)]);
        }
    }
    const handleBrandSelection = (curentlySelected, _id) => {
      debugger;
        if (curentlySelected) {
            let newBrands = brand.filter(item => item !== _id);
            onBrandSelectionChange(newBrands);
        } else {
            const newbrands = [...brand, _id];
            onBrandSelectionChange(newbrands)
        }
    };
    const scrollX = new Animated.Value(0);
    const onViewRef = React.useRef(({ viewableItems }) => {
        //setSelectedId(viewableItems[0].index);
    });
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });
    useEffect(() => {
        async function fetchData() {
            try {
              const { brands } = await metadataAPI.fetchAllBrands();
              const brandswithids  = brands && brands.length > 0 ? brands.map(x => {
                return {...x, _id: x.name};
              }) : []
              const sortBrands = sortItemsByAsc(brandswithids, 'name');
              getTopBrands(sortBrands);
              setCars(sortBrands);
            }
            catch(e) {
              console.log('Brands Error', e.message);
            }
        };
        fetchData();
    }, []);

    useEffect(()=>{
      setBrand(brandSelection)
    },[brandSelection])
  return (
    <ReusableInnerWrapper
      style={{
        justifyContent: "flex-start",
        marginTop: 28,
        alignItems: "flex-start",
        marginLeft: 25.62,
        width: width,
      }}
    >
      <ReusableText
        style={{
          textTransform: "uppercase",
          fontFamily: "BebasNeue-Regular",
          color: "raven",
          fontSize: 24,
          textAlign: "left",
          lineHeight: 29,
          height: 29,
        }}
      >
        brand
      </ReusableText>
      {cars.length > 0 ? (
        <FlatList
          data={topBrands}
          style={{
            width: width,
            overflow: "visible",
          }}
          renderItem={(item) => {
            return (
              <CarouselItem
                itemsArr={cars}
                itemsSelection={brand}
                handleTileSelection={handleBrandSelection}
                arr={item}
              />
            );
          }}
          numColumns={1}
          horizontal
          keyExtractor={(_, index) => "key" + index}
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={1}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          onScroll={() => {
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            );
          }}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
        />
      ) : (
        <ReusableText
          style={{
            fontFamily: "Poppins-Bold",
            color: "cornflowerBlue",
            fontSize: 14,
            textAlign: "left",
            lineHeight: 29,
            height: 29,
          }}
        >
          loading...
        </ReusableText>
      )}
    </ReusableInnerWrapper>
  );
};
export default BrandLists;