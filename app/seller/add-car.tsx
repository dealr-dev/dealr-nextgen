import PrimaryButton from '@/components/Buttons';
import BodyColor from '@/components/Modals/BodyColor';
import GenericDropdown from '@/components/Modals/GenericDropdown';
import Make from '@/components/Modals/Make';
import CarModel from '@/components/Modals/Model';
import ScreenTopNav from '@/components/nav/TopNav';
import BackButton from '@/components/Reusable/BackButton';
import ReusableButton from '@/components/Reusable/Button';
import ReusableIcon from '@/components/Reusable/Icon';
import ReusableInputText from '@/components/Reusable/InputText';
import Loader from '@/components/Reusable/Loader';
import ReusableTile from '@/components/Reusable/Tile';
import ReusableOuterWrapper from '@/components/Reusable/Wrapper/Outer';
import ReusableScrollView from '@/components/Reusable/Wrapper/ScrollView';
import * as SellerStyles from '@/components/Stylers/Seller';
import Text from '@/components/Text';
import Wrapper from '@/components/Wrapper';
import CustomTheme from '@/theme';
import React, { useEffect, useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform } from 'react-native';

const CONDITIONS = [
    { label: "New", value: "new" },
    { label: "Used", value: "used" }
];

const VEHICLE_TYPES = [
    { label: "Mini Van", value: "minivan" },
    { label: "Sedan", value: "sedan" },
    { label: "SUV", value: "suv" },
    { label: "Bakkie", value: "bakkie" },
    { label: "Hatchback", value: "hatchback" },
    { label: "Luxury", value: "luxury" },
    { label: "Sport", value: "sport" },
    { label: "Hyper", value: "hyper" },
    { label: "Electric", value: "electric" },
];

const FUEL_TYPES = [
    { label: "Diesel", value: "diesel" },
    { label: "Electric", value: "electric" },
    { label: "Petrol", value: "petrol" },
    { label: "Hybrid", value: "hybrid" }
];


export default function AddACar({ navigation, route }) {

    const [vehicleSearchError, setVehicleSearchError] = useState('')

    const [makeModal, setMakeModal] = useState(false);
    const [carMake, setCarMake] = useState(null);
    const [regError, setRegError] = useState(true);
    const [customerdetails, setCustomerDetails] = useState(null);
    const [mmcode, setMMCode] = useState(null)

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const showHideMakeModal = () => {
        setMakeModal(!makeModal);
    };
    const handleMakeText = text => {
        setCarMake(text);
    };

    const [bodyColorModal, setBodyColorModal] = useState(false);
    const [bodyColor, setBodyColor] = useState(null);
    const showHideBodyColorModal = () => {
        setBodyColorModal(!bodyColorModal);
    };
    const handleBodyColor = text => {
        setBodyColor(text);
    };

    const [registration, setRegistration] = useState(null);
    const handleRegistration = text => {

        // setRegError(test);
        setRegistration(text);
    };

    const [year, setYear] = useState(null);
    const handleYear = text => {
        setYear(text);
    };

    const [model, setModel] = useState(null);
    const [modelModal, setModelModal] = useState(false);
    const showHideModelModal = () => {
        setModelModal(!modelModal);
    };
    const handleModel = text => {
        setModel(text);
    };

    const [fuelType, setFuelType] = useState(null);
    const [fuelModal, setFuelModal] = useState(false);
    const handleFuelType = text => {
        setFuelType(text);
    };


    const [vehicleType, setVehicleType] = useState(null);
    const [vehicleModal, setVehicleModal] = useState(false);
    const handleVehicleType = text => {
        setVehicleType(text);
        //setVehicleModal(!vehicleModal);
    };

    const [plateVin, setPlateVin] = useState(null);
    const handlePlateOrVin = text => {
        setPlateVin(text);
    }

    const [condition, setCondition] = useState(null);
    const [conditionModal, setConditionModal] = useState(false);
    const handleCondition = (text: string) => {
        setCondition(text);
    }

    const mapValueToDisplay = (value, list) => {
        const item = list.find(x => x.value === value);

        if (!value) 
            return null;

        if (item)
            return item.label;

        return null;
    }

    const searchByPlateOrVin = async () => {

        if (!plateVin) {
            setError("Please enter Vin!");
        } else {
            setVehicleSearchError('Vehicle not found, please enter details below!');
        }
    }

    const isNext = condition !== null && carMake !== null && bodyColor !== null && registration !== null && year !== null && model !== null && fuelType !== 'Select fuel type...' && vehicleType !== 'Select vehicle type...';

    const handleNavigate = (screen: string) => {
        //navigateToAScreen(nav, screen);
    };

    /*useEffect(() => {
        resetFields();
        dispatch(error(''));
        dispatch(loading(false));
        Auth.currentAuthenticatedUser({
            bypassCache: true
        })
            .then(user => {
                dispatch(loading(false));
                const { attributes } = user;
                const { customer, location } = mapFromUserAttributes(attributes);
                setCustomerDetails({ customer, location });
            });

        if (route && route.params && route.params.vehicle) {
            const {color, registration, brand, model, year} = route.params.vehicle;
            setBodyColor(color);
            setRegistration(registration);
            setCarMake(brand);
            setModel(model);
            setYear(year.toString());
        }
    }, [route]);*/

    useEffect(() => {
        async function load() {
            try {
                resetFields();
                setError('');
                setLoading(false);
                //get customer details here
                //check for route
            } catch (e) {
                setError(e.message);
                setLoading(false);
            }
        }

        load();
    }, [route]);

    const resetFields = () => {
        handleMakeText('');
        handleRegistration(null);
        handleBodyColor('');
        handleYear('');
        handleCondition('');
        handleVehicleType(null);
        handleFuelType(null);
        handleModel('');
    }

    /*const nextStep = async () => {
        try {
            if (isNext) {
                const { customer, location } = customerdetails
                dispatch(error(''));
                dispatch(loading(true));

                const response = await vehicleAPI.addVehicle({
                    registration,
                    brand: carMake,
                    model,
                    fueltype: fuelType,
                    vehicletype: vehicleType,
                    condition,
                    color: bodyColor,
                    customer,
                    location: { type: 'Point', coordinates: [location.lat, location.lng] },
                    address: location.address,
                    year,
                    mmcode
                });

                const {vehicle: {_id}} = response;
                dispatch(loading(false));
                await fetchUserThenUpdateDefaultRoute();
                navigation.navigate('SellerAdDetails', {id: _id, from: 'AddACar'});
            }
        } catch(e) {
            dispatch(error(e.message));
        }
    }*/

    const { width, height } = Dimensions.get('window');

    const wrapperProps = {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%'
    }

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
            }}
            enabled
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={10}
        >
            <ReusableScrollView>
                <ReusableOuterWrapper
                    style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        backgroundColor: 'white',
                        marginBottom: 100,
                        width: width,
                        minHeight: height
                    }}
                >
                    {makeModal &&
                        <Make
                            makeModal={makeModal}
                            showHideMakeModal={showHideMakeModal}
                            handleMakeText={handleMakeText}
                        />
                    }
                    {bodyColorModal &&
                        <BodyColor
                            bodyColorModal={bodyColorModal}
                            showHideBodyColorModal={showHideBodyColorModal}
                            handleBodyColor={handleBodyColor}
                        />
                    }
                    {modelModal &&
                        <CarModel
                            modelModal={modelModal}
                            showHideModelModal={showHideModelModal}
                            handleModel={handleModel}
                            brand={carMake}
                        />
                    }
                    {fuelModal && (<GenericDropdown
                        displayModal={fuelModal}
                        showHideModal={setFuelModal}
                        handleSelect={setFuelType}
                        list={FUEL_TYPES}
                        title="Fuel type"
                    />)}

                    {vehicleModal &&
                        <GenericDropdown
                            displayModal={vehicleModal}
                            showHideModal={setVehicleModal}
                            handleSelect={setVehicleType}
                            list={VEHICLE_TYPES}
                            title="Vehicle type"
                        />
                    }

                    {conditionModal &&
                        (<GenericDropdown
                            displayModal={conditionModal}
                            showHideModal={setConditionModal}
                            handleSelect={setCondition}
                            list={CONDITIONS}
                            title="Condition"
                        />)
                    }
                    <ScreenTopNav
                        style={{
                            width: width,
                            justifyContent: 'space-between',
                            left: 1,
                            backgroundColor: 'white',
                            height: 100
                        }}
                    >
                        <Wrapper
                            flexDirection='row'
                            marginLeft={25}
                        >
                            <BackButton
                                iconName="arrowleft"
                                handleOnPress={() => { navigation.goBack() }}
                                iconSize={38}
                                iconColor={CustomTheme.colors.cornflowerBlue}
                            />
                            <Text
                                textTransform='uppercase'
                                fontFamily='BebasNeue-Regular'
                                fontSize={34}
                                marginTop={16}
                                marginBottom={16}
                                lineHeight={40}
                            >
                                vehicle data
                            </Text>
                        </Wrapper>
                        <Wrapper
                            position='relative'
                            marginRight={25}
                        >
                            <ReusableTile
                                style={{
                                    width: 75,
                                    height: 50,
                                    marginRight: 0,
                                    borderTopRightRadius: 10,
                                    borderTopLeftRadius: 10,
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                    backgroundColor: 'cornflowerBlue'
                                }}
                                disabled={true}
                                handleTileSelection={() => { handleNavigate('FindYourCar') }}
                                shadowColor={CustomTheme.colors.periwinkleGray}
                            >
                                <ReusableIcon
                                    iconName='camera'
                                    iconSize={24}
                                    iconColor='white'
                                    feather={true}
                                />
                            </ReusableTile>
                        </Wrapper>
                    </ScreenTopNav>

                    {loading && <Loader />}

                    <Wrapper
                        width='100%'
                        height={125}
                        paddingLeft={0}
                        marginBottom={20}
                    >
                        <Wrapper
                            justifyContent='space-between'
                            position='absolute'
                            zIndex={2}
                            width={34}
                            height={34}
                            borderTopRightRadius={17}
                            borderTopLeftRadius={17}
                            borderBottomLeftRadius={17}
                            borderBottomRightRadius={17}
                            backgroundColor='white'
                            left='45%'
                            top='80%'
                        >
                            <ReusableButton
                                style={{
                                    width: 34,
                                    height: 34,
                                    borderTopRightRadius: 17,
                                    borderTopLeftRadius: 17,
                                    borderBottomLeftRadius: 17,
                                    borderBottomRightRadius: 17,
                                    backgroundColor: 'white',
                                }}
                                handleOnPress={() => { console.log('Go') }}
                            >
                                <Text
                                    fontFamily='Poppins-Bold'
                                    fontSize={12}
                                    lineHeight={32}
                                    height={34}
                                >
                                    Or
                                </Text>
                            </ReusableButton>
                        </Wrapper>
                        <Wrapper
                            width={width}
                            flexDirection='row'
                            justifyContent='space-between'
                            height={111}
                            backgroundColor='zircon'
                        >
                            <ReusableInputText
                                style={{
                                    width: '110%',
                                    height: 52,
                                    color: 'raven',
                                    fontSize: 13,
                                    borderBottomColor: 'alto',
                                    borderBottomWidth: 1,
                                    marginLeft: 25
                                }}
                                borderless={true}
                                color={CustomTheme.colors['raven']}
                                placeholder="Type your registration plate or VIN n°"
                                handleTextChange={text => { handlePlateOrVin(text) }}
                                placeholderTextColor={CustomTheme.colors.mineShaft}
                            />
                            <ReusableTile
                                style={{
                                    height: 52,
                                    width: 54,
                                    borderTopRightRadius: 10,
                                    borderTopLeftRadius: 10,
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                    backgroundColor: 'cornflowerBlue',
                                    marginRight: 25
                                }}
                                handleTileSelection={() => {
                                    searchByPlateOrVin();
                                }}
                                shadowColor={CustomTheme.colors.periwinkleGray}
                                activeOpacity={1}
                            >
                                <ReusableIcon
                                    iconName='md-search'
                                    iconSize={30}
                                    iconColor='white'
                                    ionicons={true}
                                />
                            </ReusableTile>
                        </Wrapper>
                        
                    </Wrapper>


                    
                    {vehicleSearchError !== '' && 
                    <SellerStyles.InputBottomBorder>
                        <Wrapper
                                {...wrapperProps}
                                height={15}
                                marginBottom={0}
                            >
                                <SellerStyles.Error>
                                    {vehicleSearchError}
                                </SellerStyles.Error>
                            </Wrapper>
                            
                            </SellerStyles.InputBottomBorder>
                        }
                    <SellerStyles.InputBottomBorder>
                        <SellerStyles.Title>Make</SellerStyles.Title>
                        <SellerStyles.InputContainer>
                            <ReusableInputText
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    color: 'raven',
                                    fontSize: 16,
                                    borderBottomColor: 'transparent',
                                    borderBottomWidth: 0,
                                    paddingLeft: 0,
                                    backgroundColor: 'transparent',
                                    paddingTop: 20
                                }}
                                // borderless={true}
                                color={CustomTheme.colors['black']}
                                placeholder=""
                                defaultValue={carMake}
                                value={carMake}
                                onFocus={() => { showHideMakeModal() }}
                                placeholderTextColor={CustomTheme.colors['raven']}
                            />
                        </SellerStyles.InputContainer>
                    </SellerStyles.InputBottomBorder>

                    <SellerStyles.InputBottomBorder>
                        <SellerStyles.Title>First registration</SellerStyles.Title>
                        <SellerStyles.InputContainer>
                            <ReusableInputText
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    color: 'raven',
                                    fontSize: 16,
                                    borderBottomColor: 'transparent',
                                    borderBottomWidth: 0,
                                    backgroundColor: 'transparent',
                                    paddingLeft: 0,
                                    paddingTop: 20
                                }}
                                borderless={true}
                                // color={CustomTheme.colors['black']}
                                // placeholder="First registration"
                                handleTextChange={text => { handleRegistration(text) }}
                                defaultValue={registration}
                                placeholderTextColor={CustomTheme.colors['raven']}
                            />
                        </SellerStyles.InputContainer>
                        {!regError && <SellerStyles.ErrorContainer><SellerStyles.Error>Please enter a valid South African ID number.</SellerStyles.Error></SellerStyles.ErrorContainer>}
                    </SellerStyles.InputBottomBorder>

                    <SellerStyles.InputBottomBorder>
                        <SellerStyles.Title>Year</SellerStyles.Title>
                        <SellerStyles.InputContainer>
                            <ReusableInputText
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    color: 'raven',
                                    fontSize: 16,
                                    borderBottomColor: 'alto',
                                    borderBottomWidth: 0,
                                    paddingLeft: 0,
                                    backgroundColor: 'transparent',
                                    paddingLeft: 0,
                                    paddingTop: 20
                                }}
                                borderless={true}
                                color={CustomTheme.colors['black']}
                                // placeholder='Year'
                                handleTextChange={text => { handleYear(text) }}
                                placeholderTextColor={CustomTheme.colors['raven']}
                                defaultValue={year}
                                keyboardType='phone-pad'
                            />
                        </SellerStyles.InputContainer>
                    </SellerStyles.InputBottomBorder>

                    <SellerStyles.InputBottomBorder>
                        <SellerStyles.Title>Body color</SellerStyles.Title>
                        <SellerStyles.InputContainer>
                            <ReusableInputText
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    // height: 52,
                                    color: 'raven',
                                    fontSize: 16,
                                    // lineHeight: 22.4,
                                    borderBottomColor: 'alto',
                                    borderBottomWidth: 0,
                                    backgroundColor: 'transparent',
                                    paddingLeft: 0,
                                    paddingTop: 20
                                }}
                                borderless={true}
                                color={CustomTheme.colors['black']}
                                // placeholder="Body color"
                                onFocus={() => { showHideBodyColorModal() }}
                                defaultValue={bodyColor || ''}
                                value={bodyColor}
                                placeholderTextColor={CustomTheme.colors['raven']}
                            />
                        </SellerStyles.InputContainer>
                    </SellerStyles.InputBottomBorder>

                    {carMake ? <SellerStyles.InputBottomBorder>
                        <SellerStyles.Title>Model</SellerStyles.Title>
                        <SellerStyles.InputContainer>
                            <ReusableInputText
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    // height: 52,
                                    color: 'raven',
                                    fontSize: 16,
                                    // lineHeight: 22.4,
                                    borderBottomColor: 'transparent',
                                    borderBottomWidth: 0,
                                    paddingLeft: 0,
                                    backgroundColor: 'transparent',
                                    paddingLeft: 0,
                                    paddingTop: 20
                                }}
                                borderless={true}
                                color={CustomTheme.colors['black']}
                                // placeholder="Model"
                                defaultValue={model || ''}
                                value={model}
                                handleTextChange={text => { handleModel(text) }}
                                onFocus={() => { showHideModelModal() }}
                                placeholderTextColor={CustomTheme.colors['raven']}
                            />
                        </SellerStyles.InputContainer>
                    </SellerStyles.InputBottomBorder> : <></>}

                    <SellerStyles.InputBottomBorder>
                        <SellerStyles.Title>Fuel type</SellerStyles.Title>
                        <SellerStyles.InputContainer>
                            <ReusableInputText
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    // height: 52,
                                    color: 'raven',
                                    fontSize: 16,
                                    // lineHeight: 22.4,
                                    borderBottomColor: 'alto',
                                    borderBottomWidth: 0,
                                    backgroundColor: 'transparent',
                                    paddingLeft: 0,
                                    paddingTop: 20
                                }}
                                borderless={true}
                                color={CustomTheme.colors['black']}
                                // placeholder="Body color"
                                onFocus={() => { setFuelModal(!fuelModal) }}
                                defaultValue={fuelType ? mapValueToDisplay(fuelType, FUEL_TYPES) : ''}
                                value={mapValueToDisplay(fuelType, FUEL_TYPES)}
                                placeholderTextColor={CustomTheme.colors['raven']}
                            />
                        </SellerStyles.InputContainer>
                    </SellerStyles.InputBottomBorder>

                    <SellerStyles.InputBottomBorder>
                        <SellerStyles.Title>Vehicle type</SellerStyles.Title>
                        <SellerStyles.InputContainer>
                            <ReusableInputText
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    // height: 52,
                                    color: 'raven',
                                    fontSize: 16,
                                    // lineHeight: 22.4,
                                    borderBottomColor: 'alto',
                                    borderBottomWidth: 0,
                                    backgroundColor: 'transparent',
                                    paddingLeft: 0,
                                    paddingTop: 20
                                }}
                                borderless={true}
                                color={CustomTheme.colors['black']}
                                // placeholder="Body color"
                                onFocus={() => { setVehicleModal(!vehicleModal) }}
                                defaultValue={vehicleType ? mapValueToDisplay(vehicleType, VEHICLE_TYPES) : ''}
                                value={mapValueToDisplay(vehicleType, VEHICLE_TYPES)}
                                placeholderTextColor={CustomTheme.colors['raven']}
                            />
                        </SellerStyles.InputContainer>
                    </SellerStyles.InputBottomBorder>

                    <SellerStyles.InputBottomBorder>
                        <SellerStyles.Title>Vehicle condition</SellerStyles.Title>
                        <SellerStyles.InputContainer>
                            <ReusableInputText
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    // height: 52,
                                    color: 'raven',
                                    fontSize: 16,
                                    // lineHeight: 22.4,
                                    borderBottomColor: 'alto',
                                    borderBottomWidth: 0,
                                    backgroundColor: 'transparent',
                                    paddingLeft: 0,
                                    paddingTop: 20
                                }}
                                borderless={true}
                                color={CustomTheme.colors['black']}
                                onFocus={() => { setConditionModal(!conditionModal) }}
                                defaultValue={condition ? mapValueToDisplay(condition, CONDITIONS) : ''}
                                value={mapValueToDisplay(condition, CONDITIONS)}
                                placeholderTextColor={CustomTheme.colors['raven']}
                            />
                        </SellerStyles.InputContainer>
                    </SellerStyles.InputBottomBorder>

                    {error !== '' && <Wrapper
                        {...wrapperProps}
                        height={15}
                        marginBottom={0}
                        marginTop={30}
                    >
                        <SellerStyles.Error>
                            Error: {error}
                        </SellerStyles.Error>
                    </Wrapper>}

                    {/* <Button disabled={isNext} bgColor={isNext ? '#5A89EA' : '#5A89EA'} onPress={() => { nextStep() }}>
                        <ButtonTitle color={"#fff"} fontsize={'16px'} fontfamily={'Poppins-Medium'}>Next</ButtonTitle>
                    </Button> */}
                    <Wrapper
                        marginTop={36}
                        width='100%'
                    >
                        <PrimaryButton
                            handleButtonClick={() => { isNext && nextStep() }}
                            text='Next'
                            bgColor={isNext ? 'cornflowerBlue' : 'cadetBlue'}
                            textColor='white'
                        />
                    </Wrapper>

                </ReusableOuterWrapper>
            </ReusableScrollView>
        </KeyboardAvoidingView>
    );
}
