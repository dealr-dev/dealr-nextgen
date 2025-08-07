import Logo from '@/assets/img/DealrLogo.png';
import ReusableButton from '@/components/Reusable/Button';
import ReuseableImage from '@/components/Reusable/Image';
import ReusableText from '@/components/Reusable/Text';
import ReusableInnerWrapper from '@/components/Reusable/Wrapper/Inner';
import ReusableOuterWrapper from '@/components/Reusable/Wrapper/Outer';
import ReusableScrollView from '@/components/Reusable/Wrapper/ScrollView';
import { dealershipAPI } from '@/services';
import CustomTheme from '@/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';

export default function AllSet() {

    const [dealership, setDealership] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [user, setUser] = useState(null);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const {dealership} = await dealershipAPI.getDealership('6576d1ee3a19f70008079620');
                setDealership(dealership);
                setImageUrl(dealership.logo);
                setLoading(false);
            } catch (e) {
                setError(e.message);
                setLoading(false);
            }
        }

        load();
    }, []);

    const { width } = Dimensions.get('window');

    return (
        <ReusableScrollView>
        <ReusableOuterWrapper
            style={{
                backgroundColor: 'white',
                flex: 0,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: width,
                marginBottom: 80
            }}
        >
            <ReusableInnerWrapper
                style={{
                    width: 562,
                    height: 161,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative'
                }}
            >
                <LinearGradient
                    style={{
                        width: 251,
                        height: 261,
                        borderRadius: 115,
                        backgroundColor: CustomTheme.colors.cornflowerBlue,
                        transform: [
                            {
                                scaleX: 2
                            }
                        ],
                        position: 'absolute',
                        top: -164,
                        left: Platform.OS === 'android' ? '10.2%' : '14.8%',
                        zIndex: 0,
                    }}
                    colors={[CustomTheme.colors.cornflowerBlue, CustomTheme.colors.malibu, CustomTheme.colors.cornflowerBlue]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                >
                </LinearGradient>
                <ReuseableImage ImgSrc={Logo} style={{
                    width: 80,
                    height: 80,
                    position: 'absolute',
                    left: Platform.OS === 'android' ? '25%' : '30%',
                    top: 57,
                    zIndex: 1
                }} />
            </ReusableInnerWrapper>
            <ReusableInnerWrapper
                style={{
                    width: width,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 25
                }}
            >
                <ReusableText
                    style={{
                        fontWeight: '600',
                        fontFamily: 'Poppins-Bold',
                        fontSize: 22,
                        lineHeight: 26,
                        width: 308,
                        height: 19,
                        textAlign: 'center'
                    }}
                >
                    All set!
                </ReusableText>
                <ReusableText
                    style={{
                        fontWeight: '400',
                        fontFamily: 'Poppins-Regular',
                        fontSize: 13,
                        lineHeight: 20,
                        width: 273,
                        height: 45,
                        textAlign: 'center',
                        marginTop: 16
                    }}
                >
                    {dealership ? 'You have been correctly linked with your dealership.' : 'Fetching dealership info...'}
                </ReusableText>
            </ReusableInnerWrapper>
            <ReusableInnerWrapper
                style={{
                    width: width,
                    height: 295,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 60,
                    paddingBottom: 60,
                    marginTop: 0
                }}
            >
                <ReusableInnerWrapper
                    style={{
                        width: CustomTheme.dimensions.buttonWidth,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 90,
                        paddingBottom: 90,
                        marginTop: 32,
                        backgroundColor: 'zircon'
                    }}
                >
                    <ReusableInnerWrapper
                        style={{
                            width: 125,
                            height: 125,
                            borderTopLeftRadius: 125, 
                            borderTopRightRadius: 125,
                            borderBottomLeftRadius: 125, 
                            borderBottomRightRadius: 125,
                        }}
                    >
                        {imageUrl && (<ReuseableImage
                            ImgSrc={imageUrl}
                            remote
                            style={{
                                width: 125,
                                height: 126
                            }}
                        />)}
                    </ReusableInnerWrapper>
                    <ReusableText
                        style={{
                            textTransform: 'uppercase',
                            fontFamily: 'BebasNeue-Regular',
                            fontSize: 48,
                            lineHeight: 48,
                            width: '90%',
                            height: 48,
                            textAlign: 'center',
                            marginTop: 11,
                            color: 'cornflowerBlue'
                        }}
                    >
                        {dealership ? dealership.name : ''}
                    </ReusableText>
                    <ReusableText
                        style={{
                            fontWeight: '400',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 13,
                            lineHeight: 20,
                            width: CustomTheme.dimensions.buttonWidth,
                            height: 19,
                            textAlign: 'center',
                            marginTop: 1
                        }}
                    >
                        {dealership? 'will be your dealership' : ''}
                    </ReusableText>
                </ReusableInnerWrapper>
            </ReusableInnerWrapper>
            <ReusableInnerWrapper style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                width: width,
                marginTop: 32
            }}>
                <ReusableButton
                    style = {{
                        fontFamily: 'Poppins-Regular',
                        backgroundColor: 'cornflowerBlue',
                        textAlign: 'center',
                        width: CustomTheme.dimensions.buttonWidth,
                        height: 20,
                        height: 55,
                        paddingRight: 68,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                    }}
                    handleOnPress={()=> next('SetAvailability')}
                >
                    <ReusableText
                        style = {{
                            fontFamily: 'Poppins-Bold',
                            fontSize: 14,
                            lineHeight: 19,
                            color: 'white',
                            fontWeight: '700',
                            textAlign: 'center'
                        }}
                    >
                        Get started
                    </ReusableText>
                </ReusableButton>
                <ReusableButton
                    style = {{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: CustomTheme.colors.white,
                        marginTop: 32,
                    }}
                    handleOnPress={()=> console.log('Next')}
                >
                    <ReusableText
                        style = {{
                            fontFamily: 'Poppins-Bold',
                            fontSize: 14,
                            lineHeight: 19,
                            color: 'cornflowerBlue',
                            fontWeight: '700',
                            textAlign: 'center'
                        }}
                    >
                        Skip for now
                    </ReusableText>
                </ReusableButton>
            </ReusableInnerWrapper>
        </ReusableOuterWrapper>
        </ReusableScrollView>
    );
}
