import RangeSlider from '@/components/Reusable/RangeSlider';
import ReusableText from '@/components/Reusable/Text';
import ReusableSliderWrap from '@/components/Reusable/Wrapper/Slider';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

const YearRange = ({ width , tabSelection, CustomTheme, onFromValueChange, onToValueChange, currentMin, currentMax}) => {
    const currentYear = new Date().getFullYear();
    return (
        <ReusableSliderWrap
                    style={{
                        width: width,
                        backgroundColor: 'zircon',
                        height: 148,
                        marginTop: 10,
                        marginBottom: 0,
                        position: 'relative'
                    }}
                >
                    <ReusableSliderWrap
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: width,
                            backgroundColor: 'white',
                            zIndex: tabSelection === 1 ? 1 : 0
                        }}
                    >
                        <ReusableText
                            style={{
                                fontFamily: 'Poppins-Bold',
                                fontSize: 16,
                                color: 'black',
                                fontWeight: '600',
                                textAlign: 'center',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginTop: 22,
                                lineHeight: 27
                            }}
                        >
                            {currentMin || 1980} to {currentMax || currentYear}
                        </ReusableText>
                        <LinearGradient
                            style={{
                                width: width,
                                height: 95,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: -1,
                            }}
                            colors={[CustomTheme.colors.white, CustomTheme.colors.gallery]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 0, y: 0 }}
                        />
                        <ReusableSliderWrap
                            style={{
                                width: 308,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }}
                        >
                            <RangeSlider
                                min={1980}
                                max={currentYear}
                                fromValueOnChange={(year) => onFromValueChange(year)}
                                toValueOnChange={(year) => onToValueChange(year)}
                                initialFromValue={currentMin || 1980}
                                initialToValue={currentMax || currentYear}
                                inRangeBarColor={CustomTheme.colors.dodgerBlue}
                                outOfRangeBarColor={CustomTheme.colors.periwinkle}
                                fromKnobColor={CustomTheme.colors.dodgerBlue}
                                toKnobColor={CustomTheme.colors.dodgerBlue}
                                showRangeLabels={false}
                                showValueLabels={false}
                            />
                        </ReusableSliderWrap>
                    </ReusableSliderWrap>
                </ReusableSliderWrap>
    );
}

export default YearRange;