import React from 'react';
import Bakkies from '../../../../assets/img/Category/Bakkies';
import HatchBacks from '../../../../assets/img/Category/HatchBacks';
import MiniVans from '../../../../assets/img/Category/MiniVans';
import Sedans from '../../../../assets/img/Category/Sedans';
import SUVs from '../../../../assets/img/Category/SUVs';
import CustomTheme from '../../../../theme';
import ReusableText from '../Reusable/Text';

const textStyle = {
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 18,
    textAlign: 'center'
}

const bodyTypes = () => {
    return [
        {
            "img": <MiniVans fill={CustomTheme.colors.cornflowerBlue} />,
            "name": <ReusableText style={textStyle}>Mini Vans</ReusableText>,
            "id": "MiniVans",
            "cat": "type"
        },
        {
            "img": <Sedans fill={CustomTheme.colors.cornflowerBlue} />,
            "name": <ReusableText style={textStyle}>Sedans</ReusableText>,
            "id": "Sedans",
            "cat": "type"
        },
        {
            "img": <SUVs stroke={CustomTheme.colors.cornflowerBlue} />,
            "name": <ReusableText style={textStyle}>SUVs</ReusableText>,
            "id": "SUVs",
            "cat": "type"
        },
        {
            "img": <Bakkies fill={CustomTheme.colors.cornflowerBlue} />,
            "name": <ReusableText style={textStyle}>Bakkies</ReusableText>,
            "id": "Bakkies",
            "cat": "type"
        },
        {
            "img": <HatchBacks fill={CustomTheme.colors.cornflowerBlue} />,
            "name": <ReusableText style={textStyle}>Hatch Backs</ReusableText>,
            "id": "HatchBacks",
            "cat": "type"
        }
    ]
}

export default bodyTypes;