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
import { Dimensions, FlatList, Modal } from 'react-native';


export default function SignIn() {
  //const navigate = useNavigate();
  const phoneRegExp = /^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;

  const [mobileNumber, setMobileNumber] = useState('');
  const [isMobileNumberValid, validateMobileNumber] = useState(true);
  const [mobileNumberError, setMobileNumberError] = useState('');

  const [error, setError] = useState("");

  const [countries, setCountries] = useState([]);
  const [currentCountry, setCountry] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const router = useRouter();

  useEffect(() => {
    async function fetchCountriesCodesData() {
      setCountries(CountryDialCodes);
      setCountry(CountryDialCodes.find(country => country.name === 'South Africa'));
    }
    fetchCountriesCodesData();
    setApiError('');
  }, []);

  const handleNavigate = screen => {
   // navigate(`/${screen}`);
  };

  const handleMobileNumber = number => {
    if (typeof number === 'string') {
      if (number === '') {
        validateMobileNumber(false);
        setMobileNumberError('Phone number is required!');
      } else if (!phoneRegExp.test(generateMobileNumber(currentCountry.dial_code, number))) {
        validateMobileNumber(false);
        setMobileNumberError('Phone number is invalid!');
      } else {
        validateMobileNumber(true);
        setMobileNumber(number);
      }
    }
  };

  const showHideModal = () => {
    setShowModal(!showModal);
  };

  const isFormValid = isMobileNumberValid;
  const isFieldsFilled = mobileNumber;

  const submitDetails = async () => {
    if (isFormValid && isFieldsFilled) {
      try {
        setError("");
        setLoading(true);
        const phoneNumber = generateMobileNumber(currentCountry.dial_code, mobileNumber);
        console.log('Logging in with:', phoneNumber);

        await AuthService.signIn(phoneNumber);
        setLoading(false);

        router.push({
          pathname: '/auth/verify-otp',
          params: { phoneNumber, fromRoute: 'sign-in' }
        })
      }
      catch (e) {
          console.log('Error', e);
        setError(e.message);
        setLoading(false);
      }
    }
  };

  const selectCountry = country => {
    const selected = countries.find(obj => obj.name === country);
    setCountry(selected);
    setShowModal(false);
  };

  const { width } = Dimensions.get('window');

  return (
    <ReusableScrollView>
      <ReusableOuterWrapper style={{ justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: 'white', marginBottom: 80 }}>
        <ScreenTopNav style={{ width: width, justifyContent: 'flex-start' }}>
          <ReusableInnerWrapper>
            <BackButton
              iconName="arrowleft"
              handleOnPress={() => handleNavigate('Main')}
              iconSize={20}
              iconColor={CustomTheme.colors.cornflowerBlue}
            />
          </ReusableInnerWrapper>
          <ReusableInnerWrapper style={{ position: 'relative', left: 13 }}>
            <ReusableText style={{ textTransform: 'uppercase', fontFamily: 'BebasNeue-Regular', color: 'black', fontSize: 24, marginTop: 16, marginBottom: 16, lineHeight: 29, height: 29 }}>
              sign in
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
                        marginRight: 'auto'
                    }}
                >
                    <ReusableText
                        style={{
                            fontFamily: 'Poppins-Bold',
                            color: 'black',
                            fontSize: 22,
                            height: 35,
                            lineHeight: 35
                        }}
                    >
                        Just your login details
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
                                        handleTileSelection={() => { showHideModal() }}
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
                                                fontFamily: 'Poppins-Regular',
                                                marginLeft: 10,
                                                height: 18,
                                                lineHeight: 20
                                            }}
                                        >
                                            Cancel
                                    </ReusableText>
                                    </ReusableTile>
                                </ReusableInnerWrapper>
                            </ReusableInnerWrapper>
                        </ReusableInnerWrapper>
                    </Modal>

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
                                    height: 15,
                                    lineHeight: 15
                                }}
                            >
                                {mobileNumberError}
                            </ReusableText>
                        </ReusableInnerWrapper>
                    }

                    <ReusableInnerWrapper
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: !isMobileNumberValid ? 0 : 30,
                            width: 308,
                            borderBottomWidth: 1,
                            borderBottomColor: 'alto',
                            height: 52,
                        }}
                    >
                        <ReusableInnerWrapper
                            style={{
                                marginRight: 5,
                                marginLeft: 0,
                            }}
                        >
                            <ReusableText
                                style={{
                                    height: 32,
                                    lineHeight: 32
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
                                    height: 32,
                                    lineHeight: 32
                                }}
                            >
                                {currentCountry && currentCountry.dial_code}
                            </ReusableText>
                        </ReusableInnerWrapper>
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
                                handleTileSelection={() => { showHideModal() }}
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
                            placeholder='Mobile number'
                            handleTextChange={text => handleMobileNumber(text)}
                            onBlur={text => { handleMobileNumber(text) }}
                            placeholderTextColor={CustomTheme.colors.mineShaft}
                            keyboardType='phone-pad'
                        />
                    </ReusableInnerWrapper>

                    {error !== "" &&
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
                                    height: 15,
                                    lineHeight: 15
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
                            disabled = {!(isFormValid && isFieldsFilled)}
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
                                Sign In
                        </ReusableText>
                        </ReusableButton>
                    </ReusableInnerWrapper>

                </ReusableInnerWrapper>
      </ReusableOuterWrapper>
    </ReusableScrollView>
  );
}