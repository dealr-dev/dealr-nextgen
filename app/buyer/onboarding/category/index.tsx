import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import Bakkies from '../../../../assets/img/Category/Bakkies';
import Electrics from '../../../../assets/img/Category/Electrics';
import HatchBacks from '../../../../assets/img/Category/HatchBacks';
import Hyper from '../../../../assets/img/Category/Hyper';
import Luxury from '../../../../assets/img/Category/Luxury';
import MiniVans from '../../../../assets/img/Category/MiniVans';
import Sedans from '../../../../assets/img/Category/Sedans';
import Sport from '../../../../assets/img/Category/Sport';
import SUVs from '../../../../assets/img/Category/SUVs';
import ReusableButton from '../../../../components/Reusable/Button';
import ReusableText from '../../../../components/Reusable/Text';
import ReusableTile from '../../../../components/Reusable/Tile';
import ReusableInnerWrapper from '../../../../components/Reusable/Wrapper/Inner';
import ReusableOuterWrapper from '../../../../components/Reusable/Wrapper/Outer';
import ReusableScrollView from '../../../../components/Reusable/Wrapper/ScrollView';
import CustomTheme from '../../../../theme';



const categoryIcons = [
  { name: 'Electrics', Component: Electrics },
  { name: 'Mini Vans', Component: MiniVans },
  { name: 'Sedans', Component: Sedans },
  { name: 'SUVs', Component: SUVs },
  { name: 'Bakkies', Component: Bakkies },
  { name: 'HatchBacks', Component: HatchBacks },
  { name: 'Luxury', Component: Luxury },
  { name: 'Sport', Component: Sport },
  { name: 'Hyper', Component: Hyper },
];

export default function CategoryScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<number[]>([]);
  const [error, setError] = useState('');
  const { width } = Dimensions.get('window');

  const toggleSelection = (index: number) => {
    setSelected(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleNext = () => {
    if (selected.length === 0) {
      setError('Please select at least one category.');
      return;
    }

    router.push({
      pathname: '/buyer/onboarding/condition',
      params: {
        title: "what's your type?",
        step: 80,
      },
    });
  };

  const handleSkip = () => {
    router.push({
      pathname: '/buyer/onboarding/condition',
      params: {
        title: "what's your type?",
        step: 80,
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
            What's your category?
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
            Select a type of car that fits your needs. You can choose more than one.
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
            width,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 8,
            paddingBottom: 20,
          }}
        >
          {categoryIcons.map(({ name, Component }, index) => {
            const isSelected = selected.includes(index);
            return (
              <ReusableTile
                key={index}
                style={{
                  width: 100,
                  height: 84,
                  borderRadius: 15,
                  backgroundColor: isSelected ? 'cornflowerBlue' : 'white',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  margin: 4,
                }}
                handleTileSelection={() => toggleSelection(index)}
                shadowColor={CustomTheme.colors.periwinkleGray}
              >
                <Component
                  stroke={isSelected ? 'white' : CustomTheme.colors.cornflowerBlue}
                  fill={isSelected ? 'white' : CustomTheme.colors.cornflowerBlue}
                />
                <ReusableText
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: 14,
                    lineHeight: 22,
                    color: isSelected ? 'white' : 'black',
                  }}
                >
                  {name}
                </ReusableText>
              </ReusableTile>
            );
          })}
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
              backgroundColor: selected.length > 0 ? 'cornflowerBlue' : 'athensGray',
              width: CustomTheme.dimensions.buttonWidth,
              height: 55,
              borderRadius: 10,
            }}
            handleOnPress={handleNext}
            disabled={selected.length === 0}
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
