import React from 'react';
import ReusableText from '../Reusable/Text';

export default function Text({
    children,
    textColor,
    width, 
    fontFamily, 
    fontSize, 
    lineHeight, 
    fontWeight, 
    textTransform,
    position,
    left,
    top,
    textAlign,
    marginLeft,
    marginRight,
    marginBottom,
    marginTop,
    zIndex,
    justifyContent,
    alignItems,
    flexDirection,
    borderBottomColor,
    borderBottomWidth,
    borderTopColor,
    borderTopWidth,
    borderLeftColor,
    borderLeftWidth,
    borderRightColor,
    borderRightWidth,
    borderTopRightRadius,
    borderTopLeftRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
}) {
    return (
        <ReusableText
            style={{
                fontFamily: fontFamily ? fontFamily : 'Poppins-Regular',
                fontSize: fontSize,
                lineHeight: lineHeight,
                color: textColor ? textColor : 'black',
                fontWeight: fontWeight ? fontWeight : '400',
                textAlign: textAlign ? textAlign : 'left',
                ...(
                    textTransform && { textTransform: textTransform } 
                ),
                ...(
                    width && { width: width } 
                ),
                ...(
                    position && {
                        position: 'absolute',
                        left: left,
                        top: top,
                    }
                ),
                ...(
                    marginLeft && { marginLeft: marginLeft } 
                ),
                ...(
                    marginRight && { marginRight: marginRight } 
                ),
                ...(
                    marginBottom && { marginBottom: marginBottom } 
                ),
                ...(
                    marginTop && { marginTop: marginTop } 
                ),
                justifyContent: justifyContent ? justifyContent : 'center',
                alignItems: alignItems ? alignItems : 'center',
                ...(
                    flexDirection && {
                        flexDirection: flexDirection
                    }
                ),
                ...(
                    position && {
                        position: position
                    }
                ),
                ...(
                    zIndex && {
                        zIndex: zIndex
                    }
                ),
                ...(
                    left && {
                        left: left
                    }
                ),
                ...(
                    top && {
                        top: top
                    }
                ),
                ...(
                    borderBottomColor && {
                        borderBottomColor: borderBottomColor,
                        borderBottomWidth: borderBottomWidth,
                    }
                ),
                ...(
                    borderTopColor && {
                        borderTopColor: borderTopColor,
                        borderTopWidth: borderTopWidth,
                    }
                ),
                ...(
                    borderLeftColor && {
                        borderLeftColor: borderLeftColor,
                        borderLeftWidth: borderLeftWidth,
                    }
                ),
                ...(
                    borderRightColor && {
                        borderRightColor: borderRightColor,
                        borderRightWidth: borderRightWidth,
                    }
                ),
                ...(
                    borderTopRightRadius && {
                        borderTopRightRadius: borderTopRightRadius
                    }
                ),
                ...(
                    borderTopLeftRadius && {
                        borderTopLeftRadius: borderTopLeftRadius
                    }
                ),
                ...(
                    borderBottomLeftRadius && {
                        borderBottomLeftRadius: borderBottomLeftRadius
                    }
                ),
                ...(
                    borderBottomRightRadius && {
                        borderBottomRightRadius: borderBottomRightRadius
                    }
                ),
            }}
        >
            {children}
        </ReusableText>
    );
}