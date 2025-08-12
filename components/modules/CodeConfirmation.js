
import CustomTheme from '@/theme';
import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell
} from 'react-native-confirmation-code-field';
import ReusableInnerWrapper from '../Reusable/Wrapper/Inner';

const { width } = Dimensions.get('window');

const CodeComfirmation = ({cellCount, value, setValue}) => {

    const ref = useBlurOnFulfill({ value, cellCount });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
  return (
    <ReusableInnerWrapper style={styles.containter}>
        <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={cellCount}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
                <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
            )}
        />
    </ReusableInnerWrapper>
  );
};

const styles = StyleSheet.create({
    containter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: width,
        marginTop: 46,
        marginBottom: 46
    },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 41,
        height: 56,
        lineHeight: 50,
        borderWidth: 2,
        borderColor: CustomTheme.colors.alto,
        borderRadius: 5,
        textAlign: 'center',
        backgroundColor: 'white',
        color: CustomTheme.colors.dodgerBlue,
        fontSize: 30,
        fontFamily: 'Poppins-Bold',
        fontWeight: '700',
        marginRight: 10,
    },
    focusCell: {
        borderColor: '#000',
    },
});

export default CodeComfirmation;