import React, { useEffect, useState } from "react";
import { Animated, Dimensions, FlatList } from "react-native";
import CarouselItem from '../Core/carouselItem.js';
import ReusableText from "../Reusable/Text";
import ReusableInnerWrapper from "../Reusable/Wrapper/Inner";
import { defaultBodyTypes } from '../Vehicle';
const staticBodyTypes = [
    {
        "img": "MiniVans",
        "_id": "minivan",
        "name": "Mini Vans",
        "cat": "type"
    },
    {
        "img": "Sedans",
        "_id": "sedan",
        "name": "Sedans",
        "cat": "type"
    },
    {
        "img": "SUVs",
        "_id": "suv",
        "name": "SUVs",
        "cat": "type"
    },
    {
        "img": "Bakkies",
        "_id": "bakkie",
        "name": "Bakkies",
        "cat": "type"
    },
    {
        "img": "HatchBacks",
        "_id": "hatchback",
        "name": "HatchBacks",
        "cat": "type"
    },
    {
        "img": "Luxuries",
        "_id": "luxury",
        "name": "Luxuries",
        "cat": "type"
    },
    {
        "img": "Electrics",
        "_id": "electronic",
        "name": "Electronics",
        "cat": "type"
    },
    {
        "img": "Sports",
        "_id": "sport",
        "name": "Sports",
        "cat": "type"
    },
    {
        "img": "Hypers",
        "_id": "hyper",
        "name": "Hypers",
        "cat": "type"
    }
]
const { width } = Dimensions.get('window');
const CategoryList = ({categorySelection, onCategorySelection}) => {
    const [bodyTypes, setBodyTypes] = useState(staticBodyTypes);
    const [selectedId, setSelectedId] = useState(0);
    const [types, setTypes] = useState([]);

    const handleTypesSelection = (curentlySelected, _id) => {
        if (curentlySelected) {
            let newtypes = types.filter(item => item !== _id);
            onCategorySelection(newtypes);
        } else {
            const newtypes = [...types, _id];
            onCategorySelection(newtypes)
        }
    };
   
    const scrollX = new Animated.Value(0);
    const onViewRef = React.useRef(({ viewableItems }) => {
        setSelectedId(viewableItems[0].index);
    });
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

    useEffect(()=>{
        setTypes(categorySelection)
    },[categorySelection])
  return (
    <ReusableInnerWrapper
    style={{
        justifyContent: 'flex-start',
        marginTop: 28,
        alignItems: 'flex-start',
        marginLeft: 25.62,
        width: width
    }}
>
    <ReusableText
        style={{
            textTransform: 'uppercase',
            fontFamily: 'BebasNeue-Regular',
            color: 'raven',
            fontSize: 24,
            textAlign: 'left',
            lineHeight: 29,
            height: 29
        }}
    >
        body type
    </ReusableText>
    <FlatList
        data={defaultBodyTypes}
        style={{
            width: width,
            overflow: 'visible'
        }}
        renderItem={item => {
            return <CarouselItem itemsArr={bodyTypes} itemsSelection={types} handleTileSelection={handleTypesSelection} arr={item} />
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
                { useNativeDriver: false }
            )
        }}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
    />
</ReusableInnerWrapper>
  );
};
export default CategoryList;