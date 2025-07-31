import React from 'react';
import ReusableButton from '../Reusable/Button';
import ReusableText from '../Reusable/Text';

export default function PrimaryButton({text, textColor, handleButtonClick, bgColor, disabled}) {
    return (
        <ReusableButton
            style = {{
                fontFamily: 'Poppins-Regular',
                backgroundColor: bgColor,
                height: 55,
                width: '90%',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
            }}
            handleOnPress={handleButtonClick}
            disabled={disabled}
        >
            <ReusableText
                style = {{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 14,
                    lineHeight: 19,
                    color: textColor,
                    fontWeight: '700',
                }}
            >
                {text}
            </ReusableText>
        </ReusableButton>
    );
}