import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import Location from '../../../../components/modules/Location';
import ReusableButton from '../../../../components/Reusable/Button';
import ReusableText from '../../../../components/Reusable/Text';
import ReusableInnerWrapper from '../../../../components/Reusable/Wrapper/Inner';
import ReusableOuterWrapper from '../../../../components/Reusable/Wrapper/Outer';
import ReusableScrollView from '../../../../components/Reusable/Wrapper/ScrollView';

export default function LocationScreen() {
  const router = useRouter();
  const { width } = Dimensions.get('window');
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);

  const handleNext = () => {
    router.push({
      pathname: '/buyer/listings',
      params: {
        title: 'done!',
      },
    });
  };

  const handleSkip = () => {
    router.push({
      pathname: '/buyer/listings',
      params: {
        title: 'done!',
      },
    });
  };

  return (
    <ReusableScrollView>
      <ReusableOuterWrapper style={{ width, marginBottom: 80 }}>
        <ReusableInnerWrapper
          style={{
            justifyContent: 'center',
            alignItems: 'center',
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
            Where do you need pickup?
          </ReusableText>
        </ReusableInnerWrapper>

        <Location onLocationSelect={setSelectedLocation} />

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
            handleOnPress={handleNext}
            disabled={!selectedLocation}
          >
            <ReusableText
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 14,
                color: 'white',
                textAlign: 'center',
              }}
            >
              Confirm Location
            </ReusableText>
          </ReusableButton>

          <ReusableButton
            style={{
              backgroundColor: '#fff',
              width: '80%',
            }}
            handleOnPress={handleSkip}
          >
            <ReusableText
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 14,
                color: 'cornflowerBlue',
                textAlign: 'center',
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