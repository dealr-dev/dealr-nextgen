import CustomTheme from '@/theme';
import { border, borderRadius } from '@/utils/Styles';
import React from 'react';
import ReusableImage from '../Reusable/Image';
import ReusableText from '../Reusable/Text';
import ReusableTile from '../Reusable/Tile';
import ReusableInnerWrapper from '../Reusable/Wrapper/Inner';
import { renderComponent } from '../Vehicle';
const CarouselItem = ({ arr, handleTileSelection, itemsSelection, itemsArr }) => {
    const { item } = arr;
    return itemsArr.length > 0 ? (
        <ReusableInnerWrapper
            style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: 355,
                height: 84,
                paddingLeft: 0
            }}
        >
            {item.map((y, i) => {
                //const itemIndex = itemsArr.findIndex(item => item.name === y.name);
                const isSelectedAll = false ;
                const isSelected = itemsSelection && itemsSelection.length ? itemsSelection.includes(y._id) : false; //highlightSelectedTile(itemsSelection, itemIndex);
                return <ReusableTile
                    key={i}
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        width: 83,
                        height: 84,
                        ...(borderRadius(10)),
                        backgroundColor: (isSelectedAll || isSelected) ? 'cornflowerBlue' : 'white',
                        marginRight: 5,
                        ...(border(1, 'alto')),
                    }}
                    handleTileSelection={() => {
                        handleTileSelection(isSelected, y._id)
                    }}
                    shadowColor={CustomTheme.colors.periwinkleGray}
                >
                    {y.logo && <ReusableInnerWrapper
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transparentBackgroundColor: isSelected ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.1)',
                            height: 54,
                            width: 54,
                            ...(borderRadius(54)),
                        }}
                    >
                        <ReusableImage
                            style={{
                                width: 44,
                                height: 44,
                                position: 'relative'
                            }}
                            resizeMode='cover'
                            remote
                            ImgSrc={y.logo}
                        />
                    </ReusableInnerWrapper>}
                    {y.img && <ReusableInnerWrapper>
                        {typeof y.img !== "string" ? y.img : renderComponent(y.img, isSelected)}
                    </ReusableInnerWrapper>}
                    <ReusableText
                        style={{
                            fontFamily: 'Poppins-Medium',
                            fontWeight: '600',
                            fontSize: 10,
                            lineHeight: 18,
                            textAlign: 'center',
                            color: (isSelectedAll || isSelected) ? 'white' : 'black'
                        }}
                    >
                        {y.name}
                    </ReusableText>
                </ReusableTile>
            })}
        </ReusableInnerWrapper>
    ) : null;
};

export default CarouselItem;