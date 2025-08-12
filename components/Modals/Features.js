import { metadataAPI } from '@/services';
import CustomTheme from '@/theme';
import { sortItemsByAsc } from '@/utils';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Modal } from 'react-native';
import BackButton from "../Reusable/BackButton";
import ReusableInputText from '../Reusable/InputText';
import ReusableText from '../Reusable/Text';
import ReusableTile from '../Reusable/Tile';
import ReusableInnerWrapper from '../Reusable/Wrapper/Inner';

const { width, height } = Dimensions.get('window');

export default function Feature({featureModal, showHideFeatureModal, handleFeature, handleFeatureSelection, feature, featuresData}) {
    const [features, setFeatures] = useState(featuresData);
    useEffect(() => {
        async function fetchFeaturesData (){
            var sortFeatures = sortItemsByAsc(featuresData, 'name');
            sortFeatures = sortFeatures.filter(n => !feature.some(item => item.feature === n.name));
            await setFeatures(sortFeatures);
        };
        fetchFeaturesData();
    }, []);
    
    const handleVehicleFeatureSearch = async text => {
        const { attributes } = text ? await metadataAPI.searchFeatures(text) : await metadataAPI.searchFeatures();
        var sortFeatures = sortItemsByAsc(attributes, 'name');
        sortFeatures = sortFeatures.filter(n => !feature.some(item => item.feature === n.name));
        await setFeatures(sortFeatures);
    }

    const handleSelection = (index,{name, _id, img}) => {
        handleFeature(name);
        handleFeatureSelection(name);
        showHideFeatureModal(!featureModal);
    }
    
    return ( 
        <Modal
            animationType='fade'
            transparent={false}
            visible={featureModal}
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
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        width: '90%',
                        minHeight: height
                    }}
                >
                    <BackButton
                        iconName="arrowleft"
                        handleOnPress={() => {
                            showHideFeatureModal(false)
                        }}
                        iconSize={28}
                        iconColor={CustomTheme.colors.cornflowerBlue}
                        />
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
                        features
                    </ReusableText>
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
                            height: 111,
                            backgroundColor: 'white',
                        }}
                    >
                        <ReusableInputText
                            style={{
                                width: width - 50,
                                height: 52,
                                color: 'raven',
                                fontSize: 13,
                                borderBottomColor: 'alto',
                                borderBottomWidth: 1,
                                marginLeft: 25,
                                backgroundColor: 'white'
                            }}
                            borderless={true}
                            color={CustomTheme.colors['raven']}
                            placeholder="Type in your feature"
                            handleTextChange={text => {handleVehicleFeatureSearch(text)}}
                            placeholderTextColor={CustomTheme.colors.mineShaft}
                        />
                    </ReusableInnerWrapper>
                </ReusableInnerWrapper>
                {features.length > 0 ? <ReusableInnerWrapper
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: width
                    }}
                >
                    <FlatList
                        data={features}
                        style={{
                            minHeight: height,
                            width: width
                        }}
                        keyExtractor={ (_, index) => index.toString()}
                        renderItem={ ({ item, index }) =>
                            <ReusableTile shadowless={true} handleTileSelection={() => handleSelection(index,item)}>
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
                </ReusableInnerWrapper> : <ReusableText
                                        style={{
                                            textAlign: 'left',
                                            height: 25,
                                            lineHeight: 25,
                                        }}
                                    >
                                        loading...
                                    </ReusableText>}
            </ReusableInnerWrapper>
        </Modal>
    );
}
