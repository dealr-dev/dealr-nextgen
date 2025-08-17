import BackButton from '@/components/Reusable/BackButton';
import ReusableText from '@/components/Reusable/Text';
import ReusableTile from '@/components/Reusable/Tile';
import ReusableInnerWrapper from '@/components/Reusable/Wrapper/Inner';
import customTheme from '@/theme';
import Constants from 'expo-constants';
import React from 'react';
import { Dimensions, FlatList, Modal } from 'react-native';

const { width } = Dimensions.get('window');

export default function GenericDropdown({ displayModal, showHideModal, handleSelect, title, list }) {

    const handleInternalSelection = (selectedValue) => {
        handleSelect(selectedValue);
        showHideModal(!displayModal);
    }

    return (
        <Modal
            animationType='fade'
            transparent={false}
            visible={displayModal}
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
                        handleOnPress={() => { showHideModal(!displayModal); }}
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
                        {title}
                    </ReusableText>

                </ReusableInnerWrapper>
                <ReusableInnerWrapper
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <FlatList
                        data={list}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            <ReusableTile shadowless={true} handleTileSelection={() => handleInternalSelection(item.value)}>
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
                                        {item.label}
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