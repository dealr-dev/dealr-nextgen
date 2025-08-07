import ArrowDown from '@/assets/img/SignUp/ArrowDown';
import ProgressBar from '@/components/nav/ProgressBar';
import ScreenTopNav from '@/components/nav/TopNav';
import BackButton from '@/components/Reusable/BackButton';
import ReusableButton from '@/components/Reusable/Button';
import ReusableIcon from '@/components/Reusable/Icon';
import ReusableInputText from '@/components/Reusable/InputText';
import Loader from '@/components/Reusable/Loader';
import ReusableText from '@/components/Reusable/Text';
import ReusableTile from '@/components/Reusable/Tile';
import ReusableInnerWrapper from '@/components/Reusable/Wrapper/Inner';
import ReusableOuterWrapper from '@/components/Reusable/Wrapper/Outer';
import ReusableScrollView from '@/components/Reusable/Wrapper/ScrollView';
import AuthService from '@/services/AuthService';
import CustomTheme from '@/theme';
import { generateMobileNumber } from '@/utils';
import CountryDialCodes from '@/utils/CountriesDialInfo';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, KeyboardAvoidingView, Modal } from 'react-native';


export default function SignUp() {
  const router = useRouter();
  const { width } = Dimensions.get('window');

  const phoneRegExp = /^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;
  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const [isFullNameValid, setFullNameValid] = useState(true);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isMobileNumberValid, setMobileNumberValid] = useState(true);

  const [isFormValid, setFormValid] = useState(true);
  const [isFieldsFilled, setFieldsField] = useState(true);

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [apiError, setApiError] = useState('');

  const [countries, setCountries] = useState([]);
  const [currentCountry, setCountry] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCountries(CountryDialCodes);
    setCountry(CountryDialCodes.find(c => c.name === 'South Africa'));
  }, []);

  const handleInput = (field: string, value: string) => {
    switch (field) {
      case 'fullName':
        if (!value.trim()) {
          setFullNameValid(false);
          setFullNameError('Full name is required.');
        } else {
          setFullNameValid(true);
          setFullName(value.trim());
        }
        break;
      case 'email':
        if (!value.trim()) {
          setEmailValid(false);
          setEmailError('Email is required.');
        } else if (!emailRegExp.test(value.trim())) {
          setEmailValid(false);
          setEmailError('Email is invalid.');
        } else {
          setEmailValid(true);
          setEmail(value.trim().toLowerCase());
        }
        break;
      case 'mobileNumber':
        if (!value.trim()) {
          setMobileNumberValid(false);
          setMobileNumberError('Phone number is required.');
        } else if (!phoneRegExp.test(generateMobileNumber(currentCountry.dial_code, value))) {
          setMobileNumberValid(false);
          setMobileNumberError('Phone number is invalid.');
        } else {
          setMobileNumberValid(true);
          setMobileNumber(value.trim());
        }
        break;
    }
  };

  const submit = async () => {
    const phoneNumber = generateMobileNumber(currentCountry.dial_code, mobileNumber);

    const isValid = isFullNameValid && isEmailValid && isMobileNumberValid;
    const allFieldsFilled = fullName && email && mobileNumber;

    if (!isValid || !allFieldsFilled) return;

    try {
      setApiError('');
      setLoading(true);

      const response = await AuthService.signUp({
        fullName,
        email,
        phoneNumber,
        role: 'customer-buyer', // can be dynamic if needed
        route: 'Selfie'
      });

      setLoading(false);
      router.push({
        pathname: '/auth/verify-otp',
        params: { phoneNumber, fromRoute: 'sign-up' }
      });
    } catch (err: any) {
      setApiError(err.message || 'Something went wrong');
      setLoading(false);
    }
  };

  const toggleModal = () => setShowModal(prev => !prev);
  const selectCountry = (name: string) => {
    const selected = countries.find(c => c.name === name);
    if (selected) {
      setCountry(selected);
      toggleModal();
    }
  };

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
                      backgroundColor: 'white',
                      marginBottom: 80,
                      justifyContent: 'flex-start'
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
                              sign up
                          </ReusableText>
                      </ReusableInnerWrapper>
                  </ScreenTopNav>

                  <ProgressBar step={5} />

                  {loading && <Loader />}

                  <ReusableInnerWrapper
                      style={{
                          height: 27,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 85,
                          marginLeft: 'auto',
                          marginRight: 'auto',
                      }}
                  >
                      <ReusableText
                          style={{
                              fontFamily: 'Poppins-Bold',
                              color: 'black',
                              fontSize: 22,
                              height: 27,
                              lineHeight: 27
                          }}
                      >
                          Just your basic details
                      </ReusableText>
                  </ReusableInnerWrapper>

                  <ReusableInnerWrapper
                      style={{
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 58,
                          marginLeft: 'auto',
                          marginRight: 'auto'
                      }}
                  >

                      {apiError !== '' && <ReusableInnerWrapper style={{
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
                                  height: 19,
                                  color: 'error',
                                  textAlign: 'center'
                              }}
                          >
                              {apiError}
                          </ReusableText>
                      </ReusableInnerWrapper>}

                      {!isFullNameValid &&
                          <ReusableInnerWrapper
                              style={{
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                  width: 308,
                                  height: 15,
                                  marginBottom: 0,
                                  marginTop: 0,
                              }}
                          >
                              <ReusableText
                                  style={{
                                      color: 'red',
                                      fontSize: 12,
                                      textAlign: 'center',
                                      lineHeight: 19,
                                      height: 19,
                                  }}
                              >
                                  {fullNameError}
                              </ReusableText>
                          </ReusableInnerWrapper>
                      }

                      {isFullNameValid &&
                          <ReusableInnerWrapper
                              style={{
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                  width: 308,
                                  height: 15,
                                  marginBottom: 0,
                                  marginTop: 0,
                              }}
                          >
                              <ReusableText
                                  style={{
                                      color: 'raven',
                                      fontSize: 10,
                                      textAlign: 'center',
                                      lineHeight: 19,
                                      height: 19,
                                  }}
                              >
                                  Your name
                              </ReusableText>
                          </ReusableInnerWrapper>
                      }

                      <ReusableInnerWrapper
                          style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: 0,
                              width: 308,
                              borderBottomWidth: 1,
                              borderBottomColor: 'alto',
                              height: 52,
                          }}
                      >
                          <ReusableInputText
                              style={{
                                  width: 308,
                                  height: 52,
                                  backgroundColor: 'white',
                                  color: 'raven',
                                  fontSize: 13,
                                  marginBottom: 2
                              }}
                              borderless={true}
                              color={CustomTheme.colors['raven']}
                              placeholder="Your name"
                              handleTextChange={text => { }}
                              onBlur={text => {  }}
                              placeholderTextColor={CustomTheme.colors.mineShaft}
                              onRef={null}
                          />
                      </ReusableInnerWrapper>

                      {!isEmailValid &&
                          <ReusableInnerWrapper
                              style={{
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                  width: 308,
                                  height: 15,
                                  marginBottom: 0,
                                  marginTop: 15,
                              }}
                          >
                              <ReusableText
                                  style={{
                                      color: 'red',
                                      fontSize: 12,
                                      textAlign: 'center',
                                      lineHeight: 19,
                                      height: 19
                                  }}
                              >
                                  {emailError}
                              </ReusableText>
                          </ReusableInnerWrapper>
                      }

                      {isEmailValid &&
                          <ReusableInnerWrapper
                              style={{
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                  width: 308,
                                  height: 15,
                                  marginBottom: 0,
                                  marginTop: 15,
                              }}
                          >
                              <ReusableText
                                  style={{
                                      color: 'raven',
                                      fontSize: 10,
                                      textAlign: 'center',
                                      lineHeight: 19,
                                      height: 19
                                  }}
                              >
                                  Your email
                          </ReusableText>
                          </ReusableInnerWrapper>
                      }

                      <ReusableInnerWrapper
                          style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: 0,
                              width: 308,
                              borderBottomWidth: 1,
                              borderBottomColor: 'alto',
                              height: 52,
                          }}
                      >
                          <ReusableInputText
                              style={{
                                  width: 308,
                                  height: 52,
                                  backgroundColor: 'white',
                                  color: 'raven',
                                  fontSize: 13,
                                  marginBottom: 2
                              }}
                              borderless={true}
                              type="email"
                              color={CustomTheme.colors['raven']}
                              placeholder="Your email"
                              handleTextChange={text => {  }}
                              onBlur={text => {  }}
                              placeholderTextColor={CustomTheme.colors.mineShaft}
                              keyboardType='email-address'
                          />
                      </ReusableInnerWrapper>

                      {!isMobileNumberValid &&
                          <ReusableInnerWrapper
                              style={{
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                  width: 308,
                                  height: 15,
                                  marginBottom: 0,
                                  marginTop: 30,
                              }}
                          >
                              <ReusableText
                                  style={{
                                      color: 'red',
                                      fontSize: 12,
                                      textAlign: 'center',
                                      lineHeight: 19,
                                      height: 19
                                  }}
                              >
                                  {mobileNumberError}
                              </ReusableText>
                          </ReusableInnerWrapper>
                      }

                      {isMobileNumberValid &&
                          <ReusableInnerWrapper
                              style={{
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                  width: 308,
                                  height: 15,
                                  marginBottom: 0,
                                  marginTop: 15,
                              }}
                          >
                              <ReusableText
                                  style={{
                                      color: 'raven',
                                      fontSize: 10,
                                      textAlign: 'center',
                                      lineHeight: 19,
                                      height: 19
                                  }}
                              >
                                  Mobile number
                          </ReusableText>
                          </ReusableInnerWrapper>
                      }

                      <ReusableInnerWrapper
                          style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: 0,
                              width: 308,
                              borderBottomWidth: 1,
                              borderBottomColor: 'alto',
                              height: 52,
                          }}
                      >
                          <ReusableTile
                              shadowless={true}
                              handleTileSelection={() => { toggleModal() }}>
                              <ReusableInnerWrapper
                                  style={{
                                      marginRight: 5,
                                      marginLeft: 0,
                                  }}
                              >
                                  <ReusableText
                                      style={{
                                          lineHeight: 24
                                      }}
                                  >
                                      {currentCountry && currentCountry.flag}
                                  </ReusableText>
                              </ReusableInnerWrapper>
                              <ReusableInnerWrapper
                                  style={{
                                      marginRight: 5,
                                      marginLeft: 5,
                                  }}
                              >
                                  <ReusableText
                                      style={{
                                          color: 'raven',
                                          fontSize: 13,
                                          textAlign: 'center',
                                          fontWeight: '600',
                                          fontFamily: 'Poppins-Regular',
                                          lineHeight: 24
                                      }}
                                  >
                                      {currentCountry && currentCountry.dial_code}
                                  </ReusableText>
                              </ReusableInnerWrapper>
                          </ReusableTile>
                          <ReusableInnerWrapper
                              style={{
                                  width: 15,
                                  height: 20,
                                  marginRight: 2,
                                  marginLeft: 2,
                              }}
                          >
                              <ReusableTile
                                  shadowless={true}
                                  handleTileSelection={() => { toggleModal() }}
                                  style={{
                                      width: 15,
                                      height: 20,
                                  }}
                              >
                                  <ArrowDown />
                              </ReusableTile>
                          </ReusableInnerWrapper>
                          <ReusableInputText
                              style={{
                                  width: 201,
                                  height: 52,
                                  backgroundColor: 'white',
                                  color: 'raven',
                                  fontSize: 13,
                                  marginBottom: 2
                              }}
                              borderless={true}
                              color={CustomTheme.colors['raven']}
                              placeholder="Mobile number"
                              handleTextChange={text => {}}
                              onBlur={text => {  }}
                              placeholderTextColor={CustomTheme.colors.mineShaft}
                              onRef={null}
                              keyboardType='phone-pad'
                          />
                      </ReusableInnerWrapper>

                      <Modal
                          animationType='slide'
                          transparent={false}
                          visible={showModal}>
                          <ReusableInnerWrapper
                              safe={true}
                              style={{
                                  backgroundColor: '#fff',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  marginTop: Constants.statusBarHeight,
                              }}
                          >
                              <ReusableInnerWrapper>
                                  {/* {countries.map(e => {
                                          return <TouchableOpacity onPress={() => selectCountry(e.name)}><Text>{e.flag} {e.name} ({e.dial_code})</Text></TouchableOpacity>
                                      })} */}
                                  <FlatList
                                      data={countries}
                                      keyExtractor={(_, index) => index.toString()}
                                      renderItem={({ item, index }) =>
                                          <ReusableTile shadowless={true} handleTileSelection={() => selectCountry(item.name)}>
                                              <ReusableInnerWrapper
                                                  style={{
                                                      width: width,
                                                      paddingTop: 10,
                                                      paddingBottom: 10,
                                                      backgroundColor: index % 2 == 0 ? 'gallery' : 'white'
                                                  }}
                                              >
                                                  <ReusableText
                                                      style={{
                                                          textAlign: 'left',
                                                          height: 25,
                                                          lineHeight: 25,
                                                      }}
                                                  >
                                                      {item.flag} {item.name} ({item.dial_code})
                                              </ReusableText>
                                              </ReusableInnerWrapper>
                                          </ReusableTile>
                                      }
                                  />
                                  <ReusableInnerWrapper
                                      style={{
                                          backgroundColor: 'cornflowerBlue',
                                          paddingTop: 20,
                                          width: width,
                                          paddingBottom: 20,
                                      }}
                                  >
                                      <ReusableTile
                                          shadowless={true}
                                          handleTileSelection={() => { toggleModal() }}
                                      >
                                          <ReusableIcon
                                              iconName='arrow-left'
                                              iconSize={20}
                                              iconColor='white'
                                              style={{
                                                  marginRight: 10
                                              }}
                                          />
                                          <ReusableText
                                              style={{
                                                  color: 'white',
                                                  fontSize: 16,
                                                  textAlign: 'center',
                                                  fontWeight: '600',
                                                  fontFamily: 'Poppins-Bold',
                                                  marginLeft: 10
                                              }}
                                          >
                                              Cancel
                                      </ReusableText>
                                      </ReusableTile>
                                  </ReusableInnerWrapper>
                              </ReusableInnerWrapper>
                          </ReusableInnerWrapper>
                      </Modal>

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
                                  backgroundColor: isFormValid && isFieldsFilled ? 'cornflowerBlue' : 'athensGray',
                                  textAlign: 'center',
                                  height: 55,
                                  width: CustomTheme.dimensions.buttonWidth,
                                  paddingRight: 68,
                                  borderTopRightRadius: 10,
                                  borderTopLeftRadius: 10,
                                  borderBottomLeftRadius: 10,
                                  borderBottomRightRadius: 10,
                                  marginTop: 50
                              }}
                              handleOnPress={() => { submitDetails() }}
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
                                  Next
                          </ReusableText>
                          </ReusableButton>
                      </ReusableInnerWrapper>
                  </ReusableInnerWrapper>
              </ReusableOuterWrapper>
          </ReusableScrollView>
        </KeyboardAvoidingView>
  );
}
