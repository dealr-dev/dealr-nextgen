import React from 'react';
import ReusableInnerWrapper from '../Reusable/Wrapper/Inner';

export default function Wrapper({
    children,
    width, 
    height,
    backgroundColor,
    flexDirection,
    borderBottomColor,
    borderBottomWidth,
    borderTopColor,
    borderTopWidth,
    borderLeftColor,
    borderLeftWidth,
    borderRightColor,
    borderRightWidth,
    justifyContent,
    alignItems,
    minHeight,
    marginTop,
    marginBottom,
    marginRight,
    marginLeft,
    flexWrap,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    borderTopRightRadius,
    borderTopLeftRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    position,
    left,
    top,
    zIndex
}) {
    return (
        <ReusableInnerWrapper
            style={{
                ...(
                    marginTop && {
                        marginTop: marginTop,
                    }
                ),
                ...(
                    marginBottom && {
                        marginBottom: marginBottom,
                    }
                ),
                ...(
                    marginRight && {
                        marginRight: marginRight,
                    }
                ),
                ...(
                    marginLeft && {
                        marginLeft: marginLeft,
                    }
                ),
                ...(
                    paddingLeft && {
                        paddingLeft: paddingLeft
                }),
                ...(
                    paddingRight && {
                        paddingRight: paddingRight
                }),
                ...(
                    paddingTop && {
                        paddingTop: paddingTop
                }),
                ...(
                    paddingBottom && {
                        paddingBottom: paddingBottom
                }),
                justifyContent: justifyContent ? justifyContent : 'center',
                alignItems: alignItems ? alignItems : 'center',
                ...(
                    backgroundColor ? {
                        backgroundColor: backgroundColor,
                    } : {
                        transparentBackgroundColor: 'rgba(255,255,255,0)',
                    }
                ),
                ...(
                    flexDirection && {
                        flexDirection: flexDirection
                    }
                ),
                ...(
                    width && {
                        width: width
                    }
                ),
                ...(
                    height && {
                        height: height
                    }
                ),
                ...(
                    minHeight && {
                        minHeight: minHeight
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
                    flexWrap && {
                        flexWrap: flexWrap
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
            }}
        >
            {children}
        </ReusableInnerWrapper>
    );
}