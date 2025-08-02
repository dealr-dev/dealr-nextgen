// /buyer/onboarding/_layout.tsx
import { Slot, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import ProgressBar from '../../../components/nav/ProgressBar';
import ScreenTopNav from '../../../components/nav/TopNav';
import BackButton from '../../../components/Reusable/BackButton';
import ReusableText from '../../../components/Reusable/Text';
import ReusableInnerWrapper from '../../../components/Reusable/Wrapper/Inner';
import ReusableOuterWrapper from '../../../components/Reusable/Wrapper/Outer';
import ReusableScrollView from '../../../components/Reusable/Wrapper/ScrollView';
import CustomTheme from '../../../theme';

const OnboardingLayout = () => {
  const { width } = Dimensions.get('window');
  const router = useRouter();
  const params = useLocalSearchParams();

  // You can pass `title`, `step`, and `showBack` via screen params or fallback to defaults
  const title = params.title || "let's get to know you";
  const step = parseInt(params.step as string) || 0;
  const showBack = params.showBack !== 'false';

  return (
    <ReusableScrollView>
      <ReusableOuterWrapper
        style={{
          backgroundColor: 'white',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width,
          marginBottom: 80,
        }}
      >
        <ScreenTopNav>
          {showBack && (
            <ReusableInnerWrapper style={{ width: 13 }}>
              <BackButton
                iconName="arrowleft"
                handleOnPress={() => router.back()}
                iconSize={18}
                iconColor={CustomTheme.colors.cornflowerBlue}
              />
            </ReusableInnerWrapper>
          )}
          <ReusableInnerWrapper style={{ position: 'relative', left: 13 }}>
            <ReusableText style={styles.title}>{title}</ReusableText>
          </ReusableInnerWrapper>
        </ScreenTopNav>

        {step > 0 && <ProgressBar step={step} />}

        {/* Screen content will be injected here */}
        <Slot />
      </ReusableOuterWrapper>
    </ReusableScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    textTransform: 'uppercase',
    fontFamily: 'BebasNeue-Regular',
    color: 'black',
    fontSize: 14,
    marginTop: 16,
    marginBottom: 16,
    height: 29,
    lineHeight: 29,
  },
});

export default OnboardingLayout;