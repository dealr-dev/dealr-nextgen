import React from 'react';
import Audi from '../../../../assets/img/Brands/Audi';
import Bmw from '../../../../assets/img/Brands/Bmw';
import Ford from '../../../../assets/img/Brands/Ford';
import LandRover from '../../../../assets/img/Brands/LandRover';
import ReusableText from '../Reusable/Text';

const textStyle = {
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 18,
    textAlign: 'center'
}

const brands = () => {
    return [
        {
            "img": <Audi />,
            "name": <ReusableText style={textStyle}>Audi</ReusableText>,
            "id": "Audi",
            "cat": "brand"
        },
        {
            "img": <Bmw />,
            "name": <ReusableText style={textStyle}>BMW</ReusableText>,
            "id": "BMW",
            "cat": "brand"
        },
        {
            "img": <Ford />,
            "name": <ReusableText style={textStyle}>Ford</ReusableText>,
            "id": "Ford",
            "cat": "brand"
        },
        {
            "img": <LandRover />,
            "name": <ReusableText style={textStyle}>Land Rover</ReusableText>,
            "id": "LandRover",
            "cat": "brand"
        },
        {
            "img": <Ford />,
            "name": <ReusableText style={textStyle}>Mercedes Benz</ReusableText>,
            "id": "Mercedes",
            "cat": "brand"
        },
        {
            "img": <Ford />,
            "name": <ReusableText style={textStyle}>Bentley</ReusableText>,
            "id": "Bentley",
            "cat": "brand"
        }
    ]
}

export default brands;