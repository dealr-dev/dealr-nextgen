import React from 'react';
import Diesel from '../../../../assets/img/Features/Diesel';
import FullLed from '../../../../assets/img/Features/FullLed';
import Gasoline from '../../../../assets/img/Features/Gasoline';
import Hybrid from '../../../../assets/img/Features/Hybrid';
import CustomTheme from '../../../../theme';
import ReusableText from '../Reusable/Text';

const textStyle = {
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 18,
    textAlign: 'center'
}

const features = () => {
    return [
        {
            "img": <Diesel fill={CustomTheme.colors.cornflowerBlue} />,
            "name": <ReusableText style={textStyle}>Diesel</ReusableText>,
            "id": "Diesel",
            "cat": "feature"
        },
        {
            "img": <FullLed stroke={CustomTheme.colors.cornflowerBlue} />,
            "name": <ReusableText style={textStyle}>Full LED</ReusableText>,
            "id": "FullLed",
            "cat": "feature"
        },
        {
            "img": <Gasoline stroke={CustomTheme.colors.cornflowerBlue} />,
            "name": <ReusableText style={textStyle}>Gasoline</ReusableText>,
            "id": "Gasoline",
            "cat": "feature"
        },
        {
            "img": <Hybrid stroke={CustomTheme.colors.cornflowerBlue} />,
            "name": <ReusableText style={textStyle}>Hybrid</ReusableText>,
            "id": "Hybrid",
            "cat": "feature"
        },
        {
            "img": <Gasoline stroke={CustomTheme.colors.cornflowerBlue} />,
            "name": <ReusableText style={textStyle}>Manual</ReusableText>,
            "id": "Manual",
            "cat": "feature"
        }
    ]
}

export default features;