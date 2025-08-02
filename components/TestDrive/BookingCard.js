import moment from 'moment';
import React from 'react';
import CustomTheme from '../../../theme';
import { openMaps } from '../../../utils';
import { border, borderRadius, margin, padding } from '../../../utils/Styles';
import ReusableButton from '../Reusable/Button';
import ReuseableImage from '../Reusable/Image';
import ReusableStarsRating from '../Reusable/Rating';
import ReusableTile from '../Reusable/Tile';
import Text from '../Text';
import Wrapper from '../Wrapper';

export default function BookingCard({booking, onCollapse, collapse, live}) {

    const {_id, time, date, vehicle: {name, imageurl: image}, host, buyer, address} = booking;
    return (<Wrapper 
        flexDirection='column'
        justifyContent='center'
        width='90%'
        {...border(1, 'mishka')}
        {...borderRadius(10)}
        marginTop={11}
        marginBottom={11}
    >
        <ReusableTile
            style={{
                width: '100%',
                ...(padding(0, 0, 0, 0))
            }}
            handleTileSelection={() => {
                onCollapse(_id);
            }}
            shadowColor={CustomTheme.colors.periwinkleGray}
            flexDirection='column'
        >
            <Wrapper 
                flexDirection='row'
                justifyContent='flex-start'
                width='100%'
            >
                <Wrapper
                    width='30%'
                    height={48}
                >
                    <Wrapper
                        backgroundColor='white'
                        {...borderRadius(24)}
                        {...border(3, 'white')}
                        height={48}
                        width={48}
                        position='absolute'
                        zIndex={0}
                        left={17}
                        top={0}
                    >
                        <ReuseableImage 
                            ImgSrc={image} 
                            remote
                            style={{
                                width: 73,
                                height: 73
                            }} 
                        />
                    </Wrapper>
                    <Wrapper
                        backgroundColor='white'
                        {...border(3, 'white')}
                        {...borderRadius(24)}
                        height={48}
                        width={48}
                        position='absolute'
                        zIndex={1}
                        left={44}
                        top={0}
                    >
                        <ReuseableImage 
                            ImgSrc={host.avatar} 
                            remote
                            style={{
                                width: 73,
                                height: 73
                            }} 
                        />
                    </Wrapper>
                </Wrapper>
                <Wrapper
                    flexDirection='column'
                    justifyContent='flex-start'
                    width='65%'
                    {...margin(8, 8, 8, 8)}
                >
                    <Wrapper
                        flexDirection='row'
                        justifyContent='space-between'
                        width='100%'
                        marginTop={8}
                        marginBottom={8}
                    >
                        <Text
                            fontFamily='Poppins-Bold'
                            fontSize={22}
                            lineHeight={26}
                        >
                            {moment(date).calendar().split('at')[0]}
                        </Text>
                        <Text
                            fontFamily='Poppins-Bold'
                            fontSize={22}
                            lineHeight={26}
                        >
                            {time}
                        </Text>
                    </Wrapper>
                    <Wrapper
                        justifyContent='flex-start'
                    >
                        <Text
                            fontFamily='Poppins-Regular'
                            fontSize={13}
                            lineHeight={18}
                            textAlign='left'
                        >
                            {name}
                        </Text>
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        </ReusableTile>
        {collapse && <Wrapper
            marginTop={10}
            width='100%'
        >
            <ReusableButton
                    style = {{
                        backgroundColor: live ? 'cornflowerBlue' : 'mishka',
                        height: 50,
                        marginTop: 0,
                        marginLeft: 0,
                        width: '90%',
                        ...(borderRadius(10))
                    }}
                    disabled={!live}
                    handleOnPress={()=>{
                        console.log('Begin Test Drive');
                    }}
            >
                <Text
                    fontFamily='Poppins-Bold'
                    fontSize={13}
                    lineHeight={22.4}
                    textColor='white'
                    width='100%'
                    height={23}
                    textAlign='center'
                >
                    {live ? 'Begin' : 'Ended'}
                </Text>
            </ReusableButton>
            <Wrapper
                backgroundColor='zircon'
                borderBottomColor='mishka'
                borderBottomWidth={1}
                flexDirection='column'
                width='100%'
                marginTop={19}
            >
                <Wrapper
                    flexDirection='row'
                    justifyContent='flex-start'
                    width='90%'
                    paddingTop={10}
                    paddingBottom={10}
                >
                    <Wrapper
                        flexDirection='column'
                        justifyContent='flex-start'
                        width='60%'
                    >
                        <Text
                            fontFamily='Poppins-Regular'
                            fontSize={13}
                            lineHeight={18.2}
                            textColor='raven'
                            textAlign='left'
                            width='100%'
                        >
                            Pickup location:
                        </Text>
                        <Text
                            fontFamily='Poppins-Regular'
                            fontSize={13}
                            lineHeight={18.2}
                            textAlign='left'
                            width='100%'
                        >
                            {address}
                        </Text>
                    </Wrapper>
                    <Wrapper
                        justifyContent='flex-start'
                        {...margin(10, 10, 10, 10)}
                    >
                        <ReusableButton
                            style = {{
                                backgroundColor: 'zircon',
                                height: 34,
                                width: 121,
                                ...(borderRadius(10)),
                                ...(border(2, 'cornflowerBlue')),
                                padding: 10
                            }}
                            handleOnPress={() => {
                                openMaps(-26.08041, 27.9799);
                                console.log('View Maps');
                            }}
                        >
                            <Text
                                fontFamily='Poppins-Bold'
                                fontSize={13}
                                lineHeight={22.4}
                                textColor='cornflowerBlue'
                                width='100%'
                                height={23}
                                textAlign='center'
                                
                            >
                                View on Maps
                            </Text>
                        </ReusableButton>
                    </Wrapper>
                </Wrapper>
            </Wrapper>
            <Wrapper
                backgroundColor='zircon'
                flexDirection='row'
                width='100%'
                paddingTop={12}
                paddingBottom={12}
                justifyContent='space-evenly'
            >
                <Wrapper
                    flexDirection='column'
                    justifyContent='space-between'
                    width='48%'
                >
                    <Text
                        width='100%'
                    >
                        <Text
                            fontFamily='Poppins-Regular'
                            fontSize={13}
                            lineHeight={18.2}
                            textColor='raven'
                            textAlign='left'
                            width='100%'
                        >
                            Client:{" "}
                        </Text>
                        <Text
                            fontFamily='Poppins-Regular'
                            fontSize={13}
                            lineHeight={18.2}
                            textAlign='left'
                            width='100%'
                        >
                            {buyer.name}
                        </Text>
                    </Text>
                    <Wrapper
                        width='100%'
                        flexDirection='row'
                        justifyContent='flex-start'
                        marginTop={5}
                    >
                        <ReusableStarsRating
                            style={{
                                backgroundColor: 'zircon',
                                marginLeft: 5,
                                width: 65,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}
                            rating={4.0}
                        />
                        <Text
                            fontFamily='Poppins-Regular'
                            fontSize={13}
                            lineHeight={18.2}
                            textColor='raven'
                            textAlign='left'
                            width='100%'
                        >
                            {" "}4.0
                        </Text>
                    </Wrapper>
                </Wrapper>

                <Wrapper
                    flexDirection='column'
                    width='40%'
                >
                    <ReusableButton
                        style = {{
                            backgroundColor: 'zircon',
                            height: 34,
                            width: 135,
                            ...(borderRadius(10)),
                            ...(border(2, 'cornflowerBlue')),
                            padding: 10
                        }}
                        handleOnPress={()=>{
                            console.log('View Maps');
                        }}
                    >
                        <Text
                            fontFamily='Poppins-Bold'
                            fontSize={13}
                            lineHeight={22.4}
                            textColor='cornflowerBlue'
                            width='100%'
                            height={23}
                            textAlign='center'
                            
                        >
                            Send a message
                        </Text>
                    </ReusableButton>
                </Wrapper>
            </Wrapper>
        </Wrapper>}
    </Wrapper>);
}