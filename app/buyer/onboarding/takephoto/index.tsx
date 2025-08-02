import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import Camera from '../../../../components/modules/Camera';
import ReusableButton from '../../../../components/Reusable/Button';
import ReusableText from '../../../../components/Reusable/Text';
import ReusableInnerWrapper from '../../../../components/Reusable/Wrapper/Inner';
import CustomTheme from '../../../../theme';


export default function TakePhotoScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const { width } = Dimensions.get('window');
  const router = useRouter();

  const handleRetake = () => setPhotoUri(null);
  const handleNext = () => {
    // Normally you'd upload photo and continue
    router.push({
      pathname: '/buyer/onboarding/location',
      params: {
        title: 'where do you need pickup?',
        step: 100,
      },
    });
  };

  return (
    <>
      <ReusableInnerWrapper
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width,
          marginTop: 32,
        }}
      >
        <ReusableText
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 22,
            marginBottom: 16,
            textAlign: 'center',
          }}
        >
          {photoUri ? 'Is this selfie clear?' : 'Take the photo when you’re ready'}
        </ReusableText>

        <Camera
          showPreview={false}
          photoUri={photoUri || undefined}
          onCapture={setPhotoUri}
          onRetake={handleRetake}
        />
      </ReusableInnerWrapper>

      <ReusableInnerWrapper
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width,
          marginTop: 24,
        }}
      >
        <ReusableButton
          style={{
            backgroundColor: 'cornflowerBlue',
            height: 55,
            width: '80%',
            borderRadius: 10,
            marginBottom: 20,
          }}
          handleOnPress={photoUri ? handleNext : undefined}
        >
          <ReusableText
            style={{
              fontFamily: 'Poppins-Bold',
              fontSize: 14,
              color: 'white',
              textAlign: 'center',
            }}
          >
            {photoUri ? 'Yes it is clear' : 'Capture'}
          </ReusableText>
        </ReusableButton>

        {photoUri && (
          <ReusableButton
            style={{
              backgroundColor: CustomTheme.colors.white,
              width: '80%',
            }}
            handleOnPress={handleRetake}
          >
            <ReusableText
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 14,
                color: 'cornflowerBlue',
                textAlign: 'center',
              }}
            >
              No, take a new one
            </ReusableText>
          </ReusableButton>
        )}
      </ReusableInnerWrapper>
    </>
  );
}
