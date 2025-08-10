import ReusableTile from '@/components/Reusable/Tile';
import CustomTheme from '@/theme';
import React from 'react';

export default function IconButton({children, handleTileSelection}) {
    return (
        <ReusableTile
            style={{
                width: '15%',
                height: 52,
                marginRight: 13,
                marginLeft: 5,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
            }}
            handleTileSelection={handleTileSelection}
            shadowColor={CustomTheme.colors.periwinkleGray}
        >
            {children}
        </ReusableTile>
    );
}