import Range from '@/components/Core/Range';
import ReusableButton from '@/components/Reusable/Button';
import ReusableText from '@/components/Reusable/Text';
import ReusableInnerWrapper from '@/components/Reusable/Wrapper/Inner';
import CustomTheme from '@/theme';
import { border } from '@/utils/Styles';
import React from 'react';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default function BudgetTabs({onTabChange, priceSelection: {frequency, min, max}, onFromValueChange, onToValueChange}) {

    const tabContainer = {
        height: 40,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginTop: 10,
        position: 'relative',
        width: width
    };

    const yearlyTabContainer = {
        backgroundColor: frequency === 'yearly' ? 'cornflowerBlue' : 'white',
        height: 40,
        marginTop: 0,
        marginLeft: 0,
        width: '40%',
        ...(border(frequency === 'yearly' ? 0 : 1, frequency === 'yearly' ? 'transparent' : 'cornflowerBlue')),
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    };

    const yearlyTabDisplay = {
        fontFamily: 'Poppins-Regular',
        fontWeight: '600',
        fontSize: 13,
        lineHeight: 15,
        color: frequency === 'yearly' ? 'white' : 'cornflowerBlue',
        width: '100%',
        height: 40,
        textAlign: 'center',
        top: 13,
    };

    const monthlyTabContainer = {
        backgroundColor: frequency === 'monthly' ? 'cornflowerBlue' : 'white',
        height: 40,
        marginTop: 0,
        marginLeft: 0,
        width: '40%',
        ...(border(frequency === 'monthly' ? 0 : 1, frequency === 'monthly' ? 'transparent' : 'cornflowerBlue')),
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    }

    const monthlyTabDisplay = {
        fontFamily: 'Poppins-Regular',
        fontWeight: '600',
        fontSize: 13,
        lineHeight: 15,
        color: frequency === 'monthly' ? 'white' : 'cornflowerBlue',
        width: '100%',
        height: 37,
        textAlign: 'center',
        top: 13
    };

    return (
        <>
            <ReusableInnerWrapper style={tabContainer}>
                <ReusableButton style={yearlyTabContainer} handleOnPress={() => onTabChange('yearly', 0, 2000000)}>
                    <ReusableText style={yearlyTabDisplay}>
                        Total budget
                    </ReusableText>
                </ReusableButton>
                <ReusableButton style={monthlyTabContainer} handleOnPress={() => onTabChange('monthly', 0, 50000)}>
                    <ReusableText style={monthlyTabDisplay}>
                        Monthly budget
                    </ReusableText>
                </ReusableButton>
            </ReusableInnerWrapper>
            <Range width={width} onFromValueChange={onFromValueChange} onToValueChange={onToValueChange} min={0} currentMin={min || 0} currentMax={max || (frequency === 'yearly' ? 2000000 : 50000)} max={frequency === 'yearly' ? 2000000 : 50000} step={frequency === 'yearly' ? 50000 : 500} CustomTheme={CustomTheme}></Range>
        </>
    )
}