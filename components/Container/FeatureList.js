import CarouselItem from '@/components/Core/CarouselItem.js.js';
import FeaturesModel from '@/components/Modals/Features';
import ReusableButton from '@/components/Reusable/Button';
import ReusableIcon from '@/components/Reusable/Icon';
import ReusableInputText from '@/components/Reusable/InputText';
import ReusableText from '@/components/Reusable/Text';
import ReusableInnerWrapper from '@/components/Reusable/Wrapper/Inner';
import { defaultFeatures } from '@/components/Vehicle';
import { metadataAPI } from '@/services';
import CustomTheme from '@/theme';
import { sortItemsByAsc } from '@/utils';
import { border, borderRadius } from '@/utils/Styles';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, FlatList } from 'react-native';
const { width } = Dimensions.get('window');

const Features = ({onFeatureSelection, featureSelection}) =>{
    const [feature, setFeature] = useState([]);
    const [features, setFeatures] = useState([]);
    const [featureModal, setFeatureModal] = useState(false);
    const [featureText, setFeatureText] = useState("");
    const [selectedId, setSelectedId] = useState(0);
    const scrollX = new Animated.Value(0);
    const onViewRef = React.useRef(({ viewableItems }) => {
        setSelectedId(viewableItems[0].index);
    });
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });
    const hardcodedFeatures = [
        {
            "img": "Diesel",
            "name": "Diesel",
            "_id": "Diesel"
        },
        {
            "img": "FullLed",
            "name": "Full Led",
            "_id": "FullLed"
        },
        {
            "img": "Gasoline",
            "name": "Gasoline",
            "_id": "Gasoline"
        },
        {
            "img": "Hybrid",
            "name": "Hybrid",
            "_id": "Hybrid"
        },
        {
            "img": "Manual",
            "name": "Manual",
            "_id": "Manual"
        }
    ];
    useEffect(() => {
        async function fetchData() {
            const { attributes } = await metadataAPI.searchFeatures();
            const sortFeatures = sortItemsByAsc(attributes, 'name');
            setFeatures(sortFeatures);
        };
        fetchData();
    }, []);
    const handleFeatureSelection = (curentlySelected, _id) => {
        debugger;
        if (curentlySelected) {
            let newfeatures = feature.filter(item => item !== _id);
            onFeatureSelection(newfeatures);
        } else {
            const newtypes = [...feature, _id];
            onFeatureSelection(newtypes)
        }
    };

    const handleModalFeatureSelection = (featureSelected) => {
        if (!feature.includes(featureSelected)){
            handleFeatureSelection(false, featureSelected)
        }
    }

    const showHideFeatureModal = () => {
        setFeatureModal(!featureModal);
    };

    const handleFeature = text => {
        setFeatureText(text);
    };
    const deleteExtraFeature = i => {
        const updateFeatures = feature.filter(_id => _id !== i);
        //setFeature(updateFeatures);
        onFeatureSelection(updateFeatures);
    }

    useEffect(() => {
      setFeature(featureSelection);
    },[featureSelection])
    return (
        <>
        {featureModal &&
                    <FeaturesModel
                        featureModal={featureModal}
                        showHideFeatureModal={showHideFeatureModal}
                        handleFeature={handleFeature}
                        handleFeatureSelection={handleModalFeatureSelection}
                        feature={feature}
                        featuresData={features}
                    />
                }
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
                        features
                    </ReusableText>
                    <FlatList
                        data={defaultFeatures}
                        style={{
                            width: width,
                            overflow: 'visible'
                        }}
                        renderItem={item => {
                            return (
                                <CarouselItem 
                                    itemsArr={hardcodedFeatures} 
                                    itemsSelection={feature} 
                                    handleTileSelection={handleFeatureSelection} 
                                    arr={item} 
                                />
                            )
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
                
                <ReusableInnerWrapper
                    style={{
                        justifyContent: 'flex-start',
                        marginTop: 28,
                        alignItems: 'center',
                        flexDirection: 'row',
                        width: width
                    }}
                >
                    <ReusableInputText
                        style={{
                            width: width - 50,
                            height: 52,
                            backgroundColor: 'white',
                            ...(border(1, 'alto')),
                            paddingLeft: 22,
                            color: 'raven',
                            fontSize: 14,
                            ...(borderRadius(10)),
                            marginTop: 0,
                            marginLeft: 25.62,
                        }}
                        borderless={true}
                        color={CustomTheme.colors['raven']}
                        placeholder="Add features you might like..."
                        placeholderTextColor={CustomTheme.colors.mineShaft}
                        defaultValue={featureText || ''}
                        value={featureText}
                        onFocus={() => { showHideFeatureModal() }}
                    />
                </ReusableInnerWrapper>
                {/**
                 *  Extra features start
                 */}
                <ReusableInnerWrapper
                    style={{
                        justifyContent: 'flex-start',
                        marginTop: 28,
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        marginLeft: 25.62,
                        width: width,
                        flexWrap: 'wrap'
                    }}
                >
                    {feature && feature.length > 0 && feature.map((feature) =>
                        <ReusableInnerWrapper
                            key={feature}
                            style={{
                                marginRight: 6,
                                marginTop: 6,
                                ...(border(1, 'cornflowerBlue')),
                                paddingTop: 12,
                                paddingRight: 24,
                                paddingLeft: 24,
                                paddingBottom: 12,
                                ...(borderRadius(10)),
                                backgroundColor: 'zircon',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <ReusableText
                                style={{
                                    fontFamily: 'Poppins-Medium',
                                    color: 'cornflowerBlue',
                                    fontSize: 13,
                                    marginRight: 5,
                                    lineHeight: 17,
                                }}
                            >
                                {feature}
                            </ReusableText>
                            <ReusableButton
                                handleOnPress={() => { deleteExtraFeature(feature) }}
                            >
                                <ReusableIcon
                                    iconName='ios-close'
                                    iconSize={24}
                                    iconColor={CustomTheme.colors.cornflowerBlue}
                                    ionicons={true}
                                />
                            </ReusableButton>
                        </ReusableInnerWrapper>)}
                </ReusableInnerWrapper>
                {/**
                 *  Extra features ends
                 */}
        </>
    )
}
export default Features;
