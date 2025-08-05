import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from "react";
import { Dimensions, KeyboardAvoidingView, StyleSheet } from 'react-native';
import CodeConfirmation from '../../components/modules/CodeConfirmation';
import ProgressBar from '../../components/nav/ProgressBar';
import ScreenTopNav from '../../components/nav/TopNav';
import BackButton from '../../components/Reusable/BackButton';
import ReusableButton from '../../components/Reusable/Button';
import Loader from '../../components/Reusable/Loader';
import ReusableText from '../../components/Reusable/Text';
import ReusableInnerWrapper from '../../components/Reusable/Wrapper/Inner';
import ReusableOuterWrapper from '../../components/Reusable/Wrapper/Outer';
import ReusableScrollView from '../../components/Reusable/Wrapper/ScrollView';
import AuthService from '../../services/AuthService';
import CustomTheme from '../../theme';

const { width } = Dimensions.get('window');

export default function Screen() {
  const router = useRouter();

  const [value, setValue] = useState('');
  const [counter, setCounter] = useState(60);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {phoneNumber, fromRoute} = useLocalSearchParams();

  const verify = async() => {
    try {
      setError("");
      setLoading(true);
      await AuthService.completeChallenge(value);
      setLoading(false);

      router.push({
        pathname: '/buyer/onboarding/selfie',
        params: {
          title: 'verify your id',
          step: 0,
        },
      })
    }
    catch (e) {
      setError(e.message);
      console.log('ERROR', e);
      setLoading(false);
    }
  }

  const resend = async () => {
    try {
      setError("");
      setLoading(true);
      await AuthService.signIn(phoneNumber);
      setLoading(false);
    }
    catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }

  const getFromRouteButtonText = () => {
    switch (fromRoute) {
      case 'sign-up':
        return 'Sign Up';
      default:
        return 'Sign In';
    }
  }

  return (
    <KeyboardAvoidingView
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
            }}
            behavior="padding"
            enabled
            keyboardVerticalOffset={10}
        >
          <ReusableScrollView>
            <ReusableOuterWrapper
                    style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        backgroundColor: 'white',
                        marginBottom: 80,
                        width: width
                    }}
                >
                  <ScreenTopNav
                        style={{
                            width: width,
                            justifyContent: 'flex-start'
                        }}
                    >
                        <ReusableInnerWrapper>
                            <BackButton
                                iconName="arrowleft"
                                handleOnPress={() => { router.back }}
                                iconSize={20}
                                iconColor={CustomTheme.colors.cornflowerBlue}
                            />
                        </ReusableInnerWrapper>
                        <ReusableInnerWrapper style={{
                            position: 'relative',
                            left: 13
                        }}>
                            <ReusableText
                                style={{
                                    textTransform: 'uppercase',
                                    fontFamily: 'BebasNeue-Regular',
                                    color: 'black',
                                    fontSize: 24,
                                    marginTop: 16,
                                    marginBottom: 16,
                                    height: 29,
                                    lineHeight: 29
                                }}
                            >
                                {getFromRouteButtonText()}
                            </ReusableText>
                        </ReusableInnerWrapper>
                    </ScreenTopNav>
                    <ProgressBar step={10} />
                    {loading && <Loader />}
                    <ReusableInnerWrapper
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 85,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: width
                        }}
                    >
                        <ReusableText
                            style={{
                                fontFamily: 'Poppins-Bold',
                                color: 'black',
                                fontSize: 22,
                                height: 27,
                                lineHeight: 27,
                                textAlign: 'center',
                            }}
                        >
                            Verify your phone number
                        </ReusableText>
                        <ReusableText
                            style={{
                                fontFamily: 'Poppins-Regular',
                                color: 'black',
                                fontSize: 13,
                                width: CustomTheme.dimensions.subTextWidth,
                                marginTop: 16,
                                textAlign: 'center',
                                lineHeight: 16
                            }}
                        >
                            We have sent an SMS to your phone number ending in {phoneNumber && phoneNumber.length > 4 ? phoneNumber.slice(phoneNumber.length - 4) : '0000'}. Please enter the code here below. The code will expire in 10 minutes.
                        </ReusableText>
                    </ReusableInnerWrapper>
                  <CodeConfirmation value={value} setValue={setValue} cellCount={6} />

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
                                color: 'error',
                                textAlign: 'center'
                            }}
                        >
                            {error}
                        </ReusableText>
                    </ReusableInnerWrapper>}

                    <ReusableInnerWrapper style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        width: width,
                        marginTop: 0
                    }}>
                        <ReusableButton
                            style={{
                                backgroundColor: value.length === 6 ? 'cornflowerBlue' : 'athensGray',
                                textAlign: 'center',
                                height: 55,
                                width: CustomTheme.dimensions.buttonWidth,
                                paddingRight: 68,
                                borderTopRightRadius: 10,
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                marginTop: 5
                            }}
                            disabled = {(value.length < 6)}
                            handleOnPress={() => verify()}
                        >
                            <ReusableText
                                style={{
                                    fontFamily: 'Poppins-Bold',
                                    fontSize: 14,
                                    lineHeight: 19,
                                    color: 'white',
                                    fontWeight: '700',
                                    textAlign: 'center'
                                }}
                            >
                                Verify
                            </ReusableText>
                        </ReusableButton>

                        <ReusableButton
                            style={{
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: CustomTheme.colors.white,
                                marginTop: 32
                            }}
                            handleOnPress={() => resend()}
                            disabled={counter > 0}
                        >
                            <ReusableText
                                style={{
                                    fontFamily: 'Poppins-Bold',
                                    fontSize: 14,
                                    lineHeight: 19,
                                    color: counter === 0 ? 'cornflowerBlue' : 'cadetBlue',
                                    fontWeight: '700',
                                    textAlign: 'center'
                                }}
                            >
                                {counter === 0 ? 'Re-send SMS' : `Re-send SMS in 00:${counter < 10 ? '0' + counter : counter}`}
                            </ReusableText>
                        </ReusableButton>
                    </ReusableInnerWrapper>

                </ReusableOuterWrapper>
            
          </ReusableScrollView>
          
    </KeyboardAvoidingView>
    
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 }
});