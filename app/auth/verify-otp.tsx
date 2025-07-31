import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from "react";
import { Dimensions, KeyboardAvoidingView, StyleSheet } from 'react-native';
import BackButton from '../../components/legacy/Reusable/BackButton';
import ReusableButton from '../../components/legacy/Reusable/Button';
import Loader from '../../components/legacy/Reusable/Loader';
import ReusableText from '../../components/legacy/Reusable/Text';
import ReusableInnerWrapper from '../../components/legacy/Reusable/Wrapper/Inner';
import ReusableOuterWrapper from '../../components/legacy/Reusable/Wrapper/Outer';
import ReusableScrollView from '../../components/legacy/Reusable/Wrapper/ScrollView';
import CodeConfirmation from '../../components/modules/CodeConfirmation';
import ProgressBar from '../../components/nav/ProgressBar';
import ScreenTopNav from '../../components/nav/TopNav';
import AuthService from '../../services/AuthService';
import CustomTheme from '../../theme';

const { width } = Dimensions.get('window');

export default function Screen() {
  const router = useRouter();

  const [value, setValue] = useState('');
  const [counter, setCounter] = useState(60);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [user, setUser] = useState(null); 

  const {phoneNumber, fromRoute} = useLocalSearchParams();

  const verify = async() => {
    try {
      setError("");
      setLoading(true);
      await AuthService.sendCustomChallengeAnswer(user, value);

      //const details = await AuthService.getCurrentUserDetails();
      //console.log(details);
      setLoading(false);
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
      const user = await AuthService.signIn(phoneNumber);
      console.log('USER', user);
      setUser(user);
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

  useEffect(() => {
      if (counter > 0) {
          const timer = setTimeout(() => {
              setCounter(counter - 1);
          }, 1500);
          return () => {
              clearTimeout(timer);
          };
      }
  }, [counter]);

  useEffect(() => {
    async function load() {
      await resend();
    }

    load();
  }, []);

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