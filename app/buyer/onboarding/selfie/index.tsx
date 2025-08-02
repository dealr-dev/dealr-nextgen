import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions } from 'react-native';
import PhoneSelfieFront from '../../../../assets/img/PhoneSelfieFront';
import ReusableButton from '../../../../components/Reusable/Button';
import ReusableText from '../../../../components/Reusable/Text';
import ReusableInnerWrapper from '../../../../components/Reusable/Wrapper/Inner';
import CustomTheme from '../../../../theme';


export default function SelfieScreen() {
  const router = useRouter();
  const { width } = Dimensions.get('window');

  const handleNext = () => {
    router.push({
      pathname: '/buyer/onboarding/takephoto',
      params: {
        title: 'verify your id',
        step: 10,
      },
    });
  };

  const handleSkip = () => {
    // Fallback route. Replace this with real logic if needed later
    router.push({
      pathname: '/buyer/onboarding/budget',
      params: {
        title: "what's your budget?",
        step: 40,
      },
    });
  };

  return (
    <>
      <ReusableInnerWrapper
        style={{
          flexDirection: 'column',
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
            lineHeight: 27,
          }}
        >
          Let's take a selfie!
        </ReusableText>

        <ReusableInnerWrapper
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <PhoneSelfieFront />
        </ReusableInnerWrapper>

        <ReusableText
          style={{
            fontFamily: 'Poppins-Regular',
            color: 'black',
            fontSize: 13,
            width: 361,
            marginTop: 16,
            textAlign: 'center',
          }}
        >
          For security purposes, our drivers need to know in advance who they’re meeting. This will also be your profile photo.
        </ReusableText>
      </ReusableInnerWrapper>

      <ReusableInnerWrapper
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          width,
          marginTop: 32,
        }}
      >
        <ReusableButton
          style={{
            fontFamily: 'Poppins-Regular',
            backgroundColor: 'cornflowerBlue',
            textAlign: 'center',
            width: CustomTheme.dimensions.buttonWidth,
            height: 55,
            borderRadius: 10,
          }}
          handleOnPress={handleNext}
        >
          <ReusableText
            style={{
              fontFamily: 'Poppins-Bold',
              fontSize: 14,
              lineHeight: 19,
              color: 'white',
              fontWeight: '700',
              textAlign: 'center',
            }}
          >
            Take photo
          </ReusableText>
        </ReusableButton>

        <ReusableButton
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: CustomTheme.colors.white,
            marginTop: 32,
          }}
          handleOnPress={handleSkip}
        >
          <ReusableText
            style={{
              fontFamily: 'Poppins-Bold',
              fontSize: 14,
              lineHeight: 19,
              color: 'cornflowerBlue',
              fontWeight: '700',
              textAlign: 'center',
            }}
          >
            I have messy hair now, I’ll do this later
          </ReusableText>
        </ReusableButton>
      </ReusableInnerWrapper>
    </>
  );
}