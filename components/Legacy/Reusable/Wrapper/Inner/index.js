import React from 'react';
import { Block } from 'galio-framework';
import { styles } from '../../../../styles';

export default function Inner({style, children, safe = false}) {
    if( safe ) {
        return (
            <Block
                safe
                style={styles(style).innerBlock} 
            >
                {children}
            </Block>
        );
    }
    return (
        <Block
            style={styles(style).innerBlock} 
        >
            {children}
        </Block>
    );
}