import React from 'react';
import ReusableOuterWrapper from '../Wrapper/Outer';
import ReusableInnerWrapper from '../Wrapper/Inner';
import {Dimensions, ActivityIndicator} from 'react-native';

export default function Loader({wrapperHeight}) {
    const {width, height} = Dimensions.get('window');
    return (
        <ReusableOuterWrapper
            style={{
                transparentBackgroundColor: 'rgba(255,255,255,.3)',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: 2800,
                width: width,
                position: 'absolute',
                zIndex: 99,
                paddingTop: 200
            }}
        >
            <ReusableInnerWrapper
                style={{
                    transparentBackgroundColor: 'rgba(255,255,255,0)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: width,
                    paddingLeft: 20,
                    paddingTop: 20,
                    marginTop: (height/2),
                    ...(wrapperHeight && {
                        marginTop: (wrapperHeight/2)
                    })
                }}
            >
                <ActivityIndicator size='large' color='#5A89EA' />
            </ReusableInnerWrapper>
        </ReusableOuterWrapper>
    );
}