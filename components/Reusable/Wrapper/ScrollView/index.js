import React from 'react';
import { ScrollView } from 'react-native';
import { styles } from '../../../../styles';

export default function ReusableScrollView({style, children}) {
        return <ScrollView 
                contentContainerStyle={{ 
                        flexGrow: 1, 
                        backgroundColor: 'white', 
                        padding: 0
                }} 
                style={styles(style).scrollViewWrapper}>{children}
        </ScrollView>
}