import React from 'react';
import CustomTheme from '../../../theme';
import ReusableText from '../Reusable/Text';
import ReusableTile from '../Reusable/Tile';

export default function Button({time, handleTimeSelection, selected, greyedOut}) {
    const bgColor = () => {
        if(greyedOut) {
            return 'cadetBlue'
        }
        if(selected) {
            return 'cornflowerBlue'
        } else {
            return 'zircon'
        }
    }
    const borderColor = () => {
        if(greyedOut) {
            return 'cadetBlue'
        } else {
            return 'periwinkle'
        }
    }
    const color = () => {
        if(greyedOut) {
            return 'mishka'
        }
        if(selected) {
            return 'white'
        } else {
            return 'cornflowerBlue'
        }
    }
    return (
        <ReusableTile
            style={{
                width: 84,
                height: 41,
                marginRight: 10,
                marginBottom: 0,
                marginTop: 5,
                marginLeft: 0,
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                backgroundColor: bgColor(),
                borderBottomColor: borderColor(),
                borderBottomWidth: 1,
                borderTopColor: borderColor(),
                borderTopWidth: 1,
                borderLeftColor: borderColor(),
                borderLeftWidth: 1,
                borderRightColor: borderColor(),
                borderRightWidth: 1,
            }}
            disabled={greyedOut}
            handleTileSelection={handleTimeSelection}
            activeOpacity={1}
            shadowColor={CustomTheme.colors.periwinkleGray}
        >
            <ReusableText 
                style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 14,
                    lineHeight: 21,
                    textAlign: 'center', 
                    color: color()
                }}
            >
                {time}
            </ReusableText>
        </ReusableTile>
    );
}
