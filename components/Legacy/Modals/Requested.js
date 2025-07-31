import Constants from 'expo-constants';
import React from 'react';
import { Dimensions, Modal } from 'react-native';
import ScheduleCarImg from '../../../assets/img/schedule.png';
import PrimaryButton from '../Buttons';
import ReusableImage from '../Reusable/Image';
import Text from '../Text';
import Wrapper from '../Wrapper';

const { width, height } = Dimensions.get('window');

export default function Requested({requestedModal, showHideRequestedModal}) {
    const textProps = {
        fontSize: 13,
        lineHeight: 18.2,
        width: '100%'
    }
    const textPropsTwo = {
        lineHeight: 26.4,
        fontSize: 16
    }
    return ( 
        <Modal
            animationType='fade'
            transparent={false}
            visible={requestedModal}
            style={{
                width: width,
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: Constants.statusBarHeight,
            }}
        >
            <Wrapper
                marginTop={Constants.statusBarHeight}
                width='100%'
                minHeight={height}
            >
                <Wrapper
                    justifyContent='flex-start'
                    width='90%'
                    flexDirection='row'
                    marginTop={Constants.statusBarHeight}
                >
                    <Wrapper
                        marginRight={14.99}
                    >
                        <ReusableImage
                            style={{
                                width: 100,
                                height: 100,
                            }}
                            ImgSrc={ScheduleCarImg}
                        />
                    </Wrapper>
                    <Wrapper
                        justifyContent='flex-start'
                        alignContent='flex-start'
                        flexDirection='column'
                        height='100%'
                    >
                        <Text
                            {...textProps}
                        >
                            Schedule a test drive for
                        </Text>
                        <Text
                            fontSize={22}
                            lineHeight={26.2}
                            width='100%'
                            fontFamily={'Poppins-Bold'}
                        >
                            Audi A3
                        </Text>
                        <Text
                            {...textProps}
                            textColor='raven'
                        >
                            You will be driving a
                        </Text>
                        <Text
                            {...textProps}
                        >
                            Audi A3 1.4 Tdci 67CV Elegance
                        </Text>
                    </Wrapper>
                </Wrapper>

                <Wrapper
                    width='25%'
                    minHeight={height}
                    marginBottom={200}
                    borderBottomColor='raven'
                    borderBottomWidth={0.5}
                    marginTop={31}
                    marginBottom={0}
                />

                <Wrapper
                    minHeight={height}
                    marginTop={31}
                    width='90%'
                    marginTop={20}
                    marginBottom={20}
                >
                    <Text
                        textTransform='uppercase'
                        fontFamily='BebasNeue-Regular'
                        lineHeight={34}
                        fontSize={34}
                        marginBottom={20}
                    >
                        test drive requested
                    </Text>
                    <Wrapper
                        borderTopRightRadius={10}
                        borderTopLeftRadius={10}
                        borderBottomLeftRadius={10}
                        borderBottomRightRadius={10}
                        backgroundColor='zircon'
                        width='100%'
                        paddingBottom={20}
                    >
                        <Wrapper
                            flexDirection='row'
                            justifyContent='space-evenly'
                            width='100%'
                            marginBottom={10}
                            marginTop={10}
                        >
                            <Wrapper
                                flexDirection='column'
                            >
                                <Text
                                    {...textPropsTwo}
                                    textColor='raven'
                                >
                                    Date
                                </Text>
                                <Text
                                    {...textPropsTwo}
                                    fontFamily='Poppins-Bold'
                                >
                                    Today
                                </Text>
                            </Wrapper>
                            <Wrapper 
                                height='100%' 
                                width={1} 
                                borderLeftColor='raven'
                                borderLeftWidth={0.5}
                            />
                            <Wrapper
                                flexDirection='column'
                            >
                                <Text
                                    {...textPropsTwo}
                                    textColor='raven'
                                >
                                    Time
                                </Text>
                                <Text
                                    {...textPropsTwo}
                                    fontFamily='Poppins-Bold'
                                >
                                    11:45
                                </Text>
                            </Wrapper>
                        </Wrapper>
                        <Text
                            {...textPropsTwo}
                            textColor='raven'
                        >
                            Pickup location
                        </Text>
                        <Text
                            {...textPropsTwo}
                            fontFamily='Poppins-Bold'
                        >
                            15 Harcourt Street, Dublin D02
                        </Text>
                    </Wrapper>
                </Wrapper>

                <Text
                    {...textProps}
                    width='90%'
                    textAlign='center'
                >
                    You’ll receive a push notification {"\n"} when your request will be accepted.
                </Text>

                <Wrapper
                    marginTop={36}
                    width='100%'
                >
                    <PrimaryButton 
                        handleButtonClick={()=>{
                            showHideRequestedModal(!requestedModal);
                        }}
                        text='Okay'
                        bgColor='cornflowerBlue'
                        textColor='white'
                    />
                </Wrapper>

            </Wrapper>
        </Modal>
    );
}
