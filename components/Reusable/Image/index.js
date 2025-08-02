import React from 'react';
import { Image } from 'react-native';
import { styles } from '../../../styles';

export default function ReuseableImage({style, ImgSrc, remote}) {
    if (remote){
        return <Image style={styles(style).image} source={{uri:ImgSrc}} />;
    }

    return <Image style={styles(style).image} source={ImgSrc} />;
}
