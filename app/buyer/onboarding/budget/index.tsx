import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import ReusableButton from '../../../../components/Reusable/Button';
import ReusableSlider from '../../../../components/Reusable/Slider';
import ReusableText from '../../../../components/Reusable/Text';
import ReusableInnerWrapper from '../../../../components/Reusable/Wrapper/Inner';
import ReusableOuterWrapper from '../../../../components/Reusable/Wrapper/Outer';
import ReusableScrollView from '../../../../components/Reusable/Wrapper/ScrollView';
import ReusableSliderWrap from '../../../../components/Reusable/Wrapper/Slider';
import CustomTheme from '../../../../theme';


export default function BudgetScreen() {
  const router = useRouter();
  const { width } = Dimensions.get('window');

  const [tabSelection, setTabSelection] = useState(0);
  const [fromTotalBudget, setFromTotalBudget] = useState(100000);
  const [fromMonthlyBudget, setFromMonthlyBudget] = useState(1000);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (tabSelection === 0 && fromTotalBudget < 100000) {
      setError('Total budget should be at least R100,000');
      return;
    }

    if (tabSelection === 1 && fromMonthlyBudget < 1000) {
      setError('Monthly budget should be at least R1,000');
      return;
    }

    router.push({
      pathname: '/buyer/onboarding/category',
      params: {
        title: "what's your category?",
        step: 60,
      },
    });
  };

  const handleSkip = () => {
    router.push({
      pathname: '/buyer/onboarding/category',
      params: {
        title: "what's your category?",
        step: 60,
      },
    });
  };

  return (
    <ReusableScrollView>
      <ReusableOuterWrapper
        style={{
          backgroundColor: 'white',
          flex: 0,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width,
          marginBottom: 80,
        }}
      >
        <ReusableInnerWrapper
          style={{
            width,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 60,
            paddingBottom: 60,
            marginTop: 32,
          }}
        >
          <ReusableText
            style={{
              fontWeight: '600',
              fontFamily: 'Poppins-Bold',
              fontSize: 22,
              lineHeight: 26,
              width: 361,
              height: 27,
              textAlign: 'center',
            }}
          >
            What's your budget?
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
            Select your budget or monthly payment to personalise your search
          </ReusableText>

          {error !== '' && (
            <ReusableText
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 13,
                color: 'error',
                marginTop: 16,
                textAlign: 'center',
              }}
            >
              {error}
            </ReusableText>
          )}

          <ReusableInnerWrapper
            style={{
              width: 364,
              height: 40,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 32,
            }}
          >
            <ReusableButton
              style={{
                backgroundColor: tabSelection === 0 ? 'cornflowerBlue' : 'white',
                width: '40%',
                height: 40,
                borderRadius: 10,
              }}
              handleOnPress={() => setTabSelection(0)}
            >
              <ReusableText
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 13,
                  color: tabSelection === 0 ? 'white' : 'cornflowerBlue',
                }}
              >
                Total budget
              </ReusableText>
            </ReusableButton>

            <ReusableButton
              style={{
                backgroundColor: tabSelection === 1 ? 'cornflowerBlue' : 'white',
                width: '40%',
                height: 40,
                marginLeft: 8,
                borderRadius: 10,
              }}
              handleOnPress={() => setTabSelection(1)}
            >
              <ReusableText
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 13,
                  color: tabSelection === 1 ? 'white' : 'cornflowerBlue',
                }}
              >
                Monthly budget
              </ReusableText>
            </ReusableButton>
          </ReusableInnerWrapper>
        </ReusableInnerWrapper>

        <ReusableSliderWrap
          style={{
            width,
            paddingHorizontal: 24,
            marginTop: 40,
          }}
        >
          {tabSelection === 0 ? (
            <>
              <ReusableText
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 16,
                  textAlign: 'center',
                  marginBottom: 16,
                }}
              >
                From R{fromTotalBudget}
              </ReusableText>
              <ReusableSlider
                minimumValue={0}
                maximumValue={2000000}
                step={50000}
                value={fromTotalBudget}
                onValueChange={setFromTotalBudget}
              />
            </>
          ) : (
            <>
              <ReusableText
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 16,
                  textAlign: 'center',
                  marginBottom: 16,
                }}
              >
                From R{fromMonthlyBudget}
              </ReusableText>
              <ReusableSlider
                minimumValue={0}
                maximumValue={50000}
                step={500}
                value={fromMonthlyBudget}
                onValueChange={setFromMonthlyBudget}
              />
            </>
          )}
        </ReusableSliderWrap>

        <ReusableInnerWrapper
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            width,
            marginTop: 40,
          }}
        >
          <ReusableButton
            style={{
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