import Schedule from '@/components/Modals/TestDrive';
import ScreenTopNav from '@/components/nav/TopNav';
import BackButton from '@/components/Reusable/BackButton';
import ReusableButton from '@/components/Reusable/Button';
import ReusableImage from '@/components/Reusable/Image';
import Loader from '@/components/Reusable/Loader';
import ReusableText from '@/components/Reusable/Text';
import ReusableInnerWrapper from '@/components/Reusable/Wrapper/Inner';
import ReusableOuterWrapper from '@/components/Reusable/Wrapper/Outer';
import ReusableScrollView from '@/components/Reusable/Wrapper/ScrollView';
import Wrapper from '@/components/Wrapper';
import { vehicleAPI } from "@/services";
import CustomTheme from '@/theme';
import { capitalizeWord } from '@/utils';
import { border } from '@/utils/Styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, KeyboardAvoidingView } from 'react-native';


function Heading({title}) {
    return (
        <ReusableText
            style = {{
                fontFamily: 'BebasNeue-Regular',
                fontSize: 24,
                lineHeight: 28.8,
                color: 'raven',
                textAlign: 'left',
                width: '100%'
            }}
        >
            {title}
        </ReusableText>
    )
}

function LineItem ({title, value}) {
    return (
        <ReusableInnerWrapper
            style={{
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 28
            }}
        >
            <ReusableText
                style = {{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 13,
                    lineHeight: 18.2,
                    color: 'black',
                    fontWeight: '700',
                    textAlign: 'left',
                    width: '42%'
                }}
            >
                {title}
            </ReusableText>
            <ReusableText
                style = {{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 13,
                    lineHeight: 18.2,
                    color: 'black',
                    fontWeight: '700',
                    textAlign: 'left',
                    width: '50%'
                }}
            >
                {value ? capitalizeWord(value) : 'N/A'}
            </ReusableText>
        </ReusableInnerWrapper>
    );
}

function VehicleDetails ({vehicle, features}) {
    const {brand, model, year, vehicletype, condition} = vehicle;

    return (
        <ReusableInnerWrapper
                    style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'column',
                        marginTop: 31,
                        width: '90%'
                    }}
                >
                <Heading title="Vehicle Details" />
                <LineItem title="Condition" value={condition} onChange={(newvalue) => onChange('vehicle', 'condition', newvalue)} />
                <LineItem title="Body Type" value={vehicletype} onChange={(newvalue) => onChange('vehicle', 'vehicletype', newvalue)} />
                <LineItem title="Reg Year" value={year} onChange={(newvalue) => onChange('vehicle', 'year', newvalue)} />
                <LineItem title="Make" value={brand} onChange={(newvalue) => onChange('vehicle', 'brand', newvalue)} />
                <LineItem title="Model" value={model} onChange={(newvalue) => onChange('vehicle', 'model', newvalue)} />
        </ReusableInnerWrapper>
    );
}

export default function AdDetails() {

    const { id } = useLocalSearchParams<{ id: string }>();

    const router = useRouter();

    const handleNavigate = (screen: string) => {
        router.push(screen);
    };

    const [vehicle, setVehicle] = useState([]);
    const [features, setFeatures] = useState({});
    const [vehicleData, setVehicleData] = useState([]);
    const [scheduleModal, showHideScheduleModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [test, setTest] = useState({
        new: false,
        bestMatch: true,
        superDealer: false,
        price: 250000,
        name: "VW Polo",
        description: "A wonderful polo for all your needs",
        descriptionType: "Used",
        address: "Elm Ave, Fourways, Johannesburg, 2191, South Africa",
        rating: 5,
        favorite: true,
        matches: 34, 
        isNewCar: true,
        image: "http://dealr-production-images.s3-website-eu-west-1.amazonaws.com/public/65380e6e0e69d10008fe016f/brand/VW/polo.jpeg",
        imagekey: "65380e6e0e69d10008fe016f/brand/VW/polo.jpeg",
        imageurl: "https://dealradminc0355365c9654e3498933cb424dcf63b172403-dev.s3-eu-west-1.amazonaws.com/public/8000f409169eafcd39059d9dcbbc8800.png"
        })
    const handleSchedule = date => {
        setScheduledDate(date);
    }

    const {width, height} = Dimensions.get('window');

    useEffect(() => {
        if( id ) {
            fetchVehicle(id);
        }

        async function fetchVehicle(id:string) {
            try {
                setLoading(true);
                setError('');
                const {vehicle, features} = await vehicleAPI.prepareVehicleForEdit(id);
                setLoading(false);
                setVehicle(vehicle);
                setFeatures(features);
            } catch (e) {
                setLoading(false);
                setError(e.message);
            }
        }
    }, []);

    const {
        condition,
        color,
        vehicletype,
        fueltype,
        address,
        description
    } = vehicle;

    const {
        matches, 
        bestMatch, 
        favorite, 
        superDealer, 
        name, 
        image,
        descriptionType, 
        rating, 
        isNewCar, 
        price
    } = test;
    
    return (
        <KeyboardAvoidingView
            style={{ 
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
            }} 
            behavior="padding" 
            enabled 
            keyboardVerticalOffset={10}
        >
        <ReusableScrollView>
            <ReusableOuterWrapper  
                style={{
                    backgroundColor: 'white',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: width,
                    minHeight: height,
                    paddingLeft: 0,
                    marginBottom: 100
                }}
            >
                {loading && <Loader />}
                {scheduleModal && <Schedule
                    scheduleModal={scheduleModal}
                    showHideScheduleModal={showHideScheduleModal}
                    handleSchedule={handleSchedule}
                    vehicleData={vehicleData}
                />}
                <ScreenTopNav
                    style={{
                        width: '90%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginLeft: 0,
                        marginRight: 0,
                        left: 1,
                        paddingLeft: 0
                    }}
                >
                    <ReusableInnerWrapper
                        style={{
                            width: '100%',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}
                    >
                        <Wrapper
                            width='80%'
                            justifyContent='flex-start'
                            alignItems='center'
                            flexDirection='row'
                        >
                            <BackButton 
                                iconName="arrowleft" 
                                handleOnPress={() => handleNavigate('Listing')} 
                                iconSize={44}
                                iconColor={CustomTheme.colors.cornflowerBlue}
                            />
                            <ReusableText 
                                style={{
                                    textTransform: 'uppercase',
                                    fontFamily: 'BebasNeue-Regular',
                                    color: 'black',
                                    fontSize: 34,
                                    marginTop: 16, 
                                    marginBottom: 16,
                                    lineHeight: 41,
                                    height: 41,
                                    textAlign: 'left'
                                }}
                            >
                                ad details
                            </ReusableText>
                        </Wrapper>
                    </ReusableInnerWrapper>
                </ScreenTopNav>

                <ReusableInnerWrapper
                    style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row',
                        ...border(1, 'mishka'),
                        width: '90%',
                        height: 190,
                    }}
                >
                    <ReusableImage
                        style={{
                            width: '100%',
                            height: 190,
                            position: 'absolute'
                        }}
                        resizeMode='cover'
                        remote
                        ImgSrc={image}
                    />
                </ReusableInnerWrapper>

                <ReusableInnerWrapper
                    style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: 30,
                        width: '90%'
                    }}
                >
                    <ReusableText
                        style={{
                            fontFamily: 'Poppins-Bold',
                            color: 'black',
                            fontSize: 45,
                            // lineHeight: 47.25,
                            textAlign: 'left'
                        }}
                    >
                        {capitalizeWord(name)}
                    </ReusableText>
                </ReusableInnerWrapper>

                <ReusableInnerWrapper
                    style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: 7,
                        width: '90%'
                    }}
                >
                    <ReusableButton
                        style = {{
                            backgroundColor: 'cornflowerBlue',
                            textAlign: 'center',
                            height: 55,
                            width: '100%',
                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                        }}
                        handleOnPress={()=>{
                            //setVehicleData({matches, bestMatch, favorite, superDealer, name, image, price, descriptionType, description, address, rating, isNewCar, id});
                            showHideScheduleModal(!scheduleModal);
                        }}
                    >
                        <ReusableText
                            style = {{
                                fontFamily: 'Poppins-Bold',
                                fontSize: 15,
                                lineHeight: 22,
                                color: 'white',
                                fontWeight: '700',
                                textAlign: 'center'
                            }}
                        >
                            Book a test drive
                        </ReusableText>
                    </ReusableButton>
                </ReusableInnerWrapper>

                <ReusableInnerWrapper
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        marginTop: 31,
                        width: '90%',
                        backgroundColor: 'zircon',
                        paddingTop: 15,
                        paddingBottom: 18,
                        borderTopLeftRadius: 10, 
                        borderTopRightRadius: 10,
                        borderBottomLeftRadius: 10, 
                        borderBottomRightRadius: 10,
                    }}
                >
                    <ReusableText
                        style={{
                            fontFamily: 'Poppins-Regular',
                            color: 'raven',
                            fontSize: 10,
                            lineHeight: 14,
                            textAlign: 'left'
                        }}
                    >
                        Asked Price
                    </ReusableText>
                    <ReusableText
                        style={{
                            fontFamily: 'Poppins-Bold',
                            color: 'black',
                            fontSize: 22,
                            lineHeight: 26.4,
                            textAlign: 'left'
                        }}
                    >
                        R{price}
                    </ReusableText>
                </ReusableInnerWrapper>

                <VehicleDetails 
                        vehicle={vehicle} 
                        features={features}
                />

            </ReusableOuterWrapper>
        </ReusableScrollView>
        </KeyboardAvoidingView>
    );
}