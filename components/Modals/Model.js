import BackButton from '@/components/Reusable/BackButton';
import ReusableInputText from '@/components/Reusable/InputText';
import ReusableText from '@/components/Reusable/Text';
import ReusableTile from '@/components/Reusable/Tile';
import ReusableInnerWrapper from '@/components/Reusable/Wrapper/Inner';
import { metadataAPI } from '@/services';
import { default as CustomTheme, default as customTheme } from '@/theme';
import { sortItemsByAsc } from '@/utils';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Modal } from 'react-native';

const { width } = Dimensions.get('window');

export default function CarModels({ modelModal, showHideModelModal, handleModel, brand }) {

    const [carModels, setModels] = useState(null);
    useEffect(() => {
        async function fetchModels() {
            const { models } = await metadataAPI.searchModels(brand.toLowerCase());
            const sortModels = sortItemsByAsc(models, 'name');
            setModels(sortModels);
        };
        fetchModels();
    }, []);

    const handleModelSelection = ({ name }) => {
        handleModel(name);
        showHideModelModal(!modelModal);
    }

    const handleKeywords = async text => {
        const { models } = text ? await metadataAPI.searchModels(brand.toLowerCase(), text) : await metadataAPI.searchModels(brand.toLowerCase());
        const sortModels = sortItemsByAsc(models, 'name');
        setModels(sortModels);
    }

    return (
        <Modal
            animationType='fade'
            transparent={false}
            visible={modelModal}
            style={{
                width: width,
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <ReusableInnerWrapper
                style={{
                    marginTop: Constants.statusBarHeight,
                    flexDirection: 'column'
                }}
            >

                <ReusableInnerWrapper
                    style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '90%',
                        flexDirection: 'row',
                        marginTop: Constants.statusBarHeight,
                    }}
                >
                    <BackButton
                        iconName="arrowleft"
                        handleOnPress={() => { showHideModelModal(!modelModal); }}
                        iconSize={38}
                        iconColor={customTheme.colors.cornflowerBlue}
                    />
                    <ReusableText
                        style={{
                            textTransform: 'uppercase',
                            fontFamily: 'BebasNeue-Regular',
                            color: 'black',
                            fontSize: 34,
                            marginTop: 16,
                            lineHeight: 40
                        }}
                    >
                        car models
                    </ReusableText>

                </ReusableInnerWrapper>
                <ReusableInnerWrapper
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <ReusableInputText
                        style={{
                            width: '90%',
                            height: 52,
                            color: 'raven',
                            fontSize: 13,
                            borderBottomColor: 'alto',
                            borderBottomWidth: 1,
                            marginLeft: 15,
                            backgroundColor: 'white',
                            marginBottom: 15
                        }}
                        borderless={true}
                        color={CustomTheme.colors['raven']}
                        placeholder="Type in your model"
                        handleTextChange={text => { handleKeywords(text) }}
                        placeholderTextColor={CustomTheme.colors.mineShaft}
                    />
                    <FlatList
                        data={carModels}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            <ReusableTile shadowless={true} handleTileSelection={() => handleModelSelection(item)}>
                                <ReusableInnerWrapper
                                    style={{
                                        width: width,
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        backgroundColor: index % 2 == 0 ? 'gallery' : 'white',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        paddingLeft: 30
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
                </ReusableInnerWrapper>
            </ReusableInnerWrapper>
        </Modal>
    );
}