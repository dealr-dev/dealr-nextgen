import ReusableButton from '@/components/Reusable/Button';
import ReusableText from '@/components/Reusable/Text';
import ReusableTile from '@/components/Reusable/Tile';
import ReusableInnerWrapper from '@/components/Reusable/Wrapper/Inner';
import ReusableOuterWrapper from '@/components/Reusable/Wrapper/Outer';
import ReusableScrollView from '@/components/Reusable/Wrapper/ScrollView';
import CustomTheme from '@/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import NewCars from '../../../../assets/img/Condition/New';
import UsedCars from '../../../../assets/img/Condition/Used';



export default function ConditionScreen() {
  const [selected, setSelected] = useState<number | null>(null);
  const [error, setError] = useState('');
  const { width } = Dimensions.get('window');
  const router = useRouter();

  const handleSelect = (index: number) => {
    setSelected(index);
    setError('');
  };

  const handleNext = () => {
    if (selected === null) {
      setError('Please select an option to continue.');
      return;
    }

    router.push({
      pathname: '/buyer/onboarding/location',
      params: {
        title: 'where do you need pickup?',
        step: 100,
      },
    });
  };

  const handleSkip = () => {
    router.push({
      pathname: '/buyer/onboarding/location',
      params: {
        title: 'where do you need pickup?',
        step: 100,
      },
    });
  };

  return (
    <ReusableScrollView>
      <ReusableOuterWrapper style={{ width, marginBottom: 80 }}>
        <ReusableInnerWrapper
          style={{
            width,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 60,
            paddingBottom: 40,
          }}
        >
          <ReusableText
            style={{
              fontWeight: '600',
              fontFamily: 'Poppins-Bold',
              fontSize: 22,
              lineHeight: 26,
              width: 361,
              textAlign: 'center',
            }}
          >
            What's your type?
          </ReusableText>
          <ReusableText
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 13,
              color: 'scorpion',
              width: CustomTheme.dimensions.subTextWidth,
              textAlign: 'center',
              paddingTop: 10,
            }}
          >
            Tailor the search for your perfect car by selecting if you're looking for new or used.
          </ReusableText>

          {error !== '' && (
            <ReusableText
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 13,
                color: 'error',
                textAlign: 'center',
                marginTop: 20,
              }}
            >
              {error}
            </ReusableText>
          )}
        </ReusableInnerWrapper>

        <ReusableInnerWrapper
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'zircon',
            paddingVertical: 24,
            gap: 16,
          }}
        >
          <ReusableTile
            style={{
              width: 130,
              height: 130,
              borderRadius: 16,
              backgroundColor: selected === 0 ? 'cornflowerBlue' : 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            handleTileSelection={() => handleSelect(0)}
            shadowColor={CustomTheme.colors.periwinkleGray}
          >
            <NewCars
              fill={selected === 0 ? 'white' : CustomTheme.colors.black}
            />
            <ReusableText
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 16,
                color: selected === 0 ? 'white' : 'black',
                marginTop: 12,
              }}
            >
              New
            </ReusableText>
          </ReusableTile>

          <ReusableTile
            style={{
              width: 130,
              height: 130,
              borderRadius: 16,
              backgroundColor: selected === 1 ? 'cornflowerBlue' : 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            handleTileSelection={() => handleSelect(1)}
            shadowColor={CustomTheme.colors.periwinkleGray}
          >
            <UsedCars
              stroke={selected === 1 ? 'white' : CustomTheme.colors.black}
              fill={selected === 1 ? 'white' : CustomTheme.colors.black}
            />
            <ReusableText
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 16,
                color: selected === 1 ? 'white' : 'black',
                marginTop: 12,
              }}
            >
              Used
            </ReusableText>
          </ReusableTile>
        </ReusableInnerWrapper>

        <ReusableInnerWrapper
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            width,
            marginTop: 20,
          }}
        >
          <ReusableButton
            style={{
              backgroundColor: selected !== null ? 'cornflowerBlue' : 'athensGray',
              width: CustomTheme.dimensions.buttonWidth,
              height: 55,
              borderRadius: 10,
            }}
            handleOnPress={handleNext}
            disabled={selected === null}
          >
            <ReusableText
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 14,
                color: 'white',
                textAlign: 'center',
              }}
            >
              Next
            </ReusableText>
          </ReusableButton>

          <ReusableButton
            style={{
              backgroundColor: CustomTheme.colors.white,
              marginTop: 32,
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
              I don't know yet
            </ReusableText>
          </ReusableButton>
        </ReusableInnerWrapper>
      </ReusableOuterWrapper>
    </ReusableScrollView>
  );
}
