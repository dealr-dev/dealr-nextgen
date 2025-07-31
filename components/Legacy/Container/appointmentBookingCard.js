import { useRouter } from 'expo-router';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { openMaps } from '../../../utils';
import Rating from '../Core/rating';
import ReuseableImage from '../Reusable/Image';

const commonStyle = { height: '100%', width: '100%' };

const AppointmentBookingCard = ({ width, booking, handleOnPress, client }) => {
    const [expand, setExpand] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkTime = () => {
            const now = moment();
            const bookingTime = moment(booking.date);
            const startTime = bookingTime.clone().subtract(200, 'minutes');
            const endTime = bookingTime.clone().add(5, 'minutes');

            if (booking.status === 'Confirmed') {
                setIsButtonEnabled(now.isBetween(startTime, endTime));
            } else {
                setIsButtonEnabled(true);
            }
        };

        checkTime();
        const intervalId = setInterval(checkTime, 60000);
        return () => clearInterval(intervalId); 
    }, [booking]);

    const BeginButton = isButtonEnabled ? TouchableOpacity : View;
    const beginbuttontext = booking.status === 'Confirmed' ? 'Begin' : 'View';
    const avatar = client === 'host' ? booking?.host?.avatar : booking?.buyer?.avatar;

    return (
        <View style={[styles.cardContainer, { width: width - 50 }]}>
            <TouchableOpacity style={styles.cardHeading} onPress={() => setExpand(!expand)}>
                <View style={styles.avatarContainer}>
                    <View style={styles.twinAvatar}>
                        <View style={styles.avatar}>
                            <ReuseableImage style={commonStyle} remote ImgSrc={booking?.vehicle?.image} />
                        </View>
                        <View style={styles.overlayAvatar}>
                            <ReuseableImage style={commonStyle} remote ImgSrc={avatar} />
                        </View>
                    </View>
                </View>
                <View style={styles.cardInfo}>
                    <View style={styles.cardTitles}>
                        <View style={styles.headingLeft}>
                            <Text style={styles.title}>{moment(booking.date).format('dddd')}</Text>
                        </View>
                        <View style={styles.headingRight}>
                            <Text style={[styles.title, { textAlign: 'right' }]}>{booking.time}</Text>
                        </View>
                    </View>
                    <Text style={styles.subTitle}>{booking?.vehicle?.name}</Text>
                </View>
            </TouchableOpacity>
            {expand && (
                <View>
                    <BeginButton style={isButtonEnabled ? styles.button : styles.disabledButton} onPress={handleOnPress}>
                        <Text style={styles.buttonText}>{beginbuttontext}</Text>
                    </BeginButton>
                    <View style={styles.moreInfo}>
                        <View style={styles.moreInfoContent}>
                            <Text style={styles.infoLabel}>Pickup location:</Text>
                            <Text style={styles.infoValue}>{booking?.address}</Text>
                        </View>
                        <View style={styles.moreInfoAction}>
                            <TouchableOpacity style={styles.outlineButton} onPress={() => openMaps(booking?.coordinates?.lat, booking?.coordinates?.lng, booking.address)}>
                                <Text style={styles.linkText}>View on Maps</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.moreInfo}>
                        <View style={styles.moreInfoContent}>
                            <Text style={styles.infoLabel}>
                                {client === 'host' ? 'Host' : 'Client'}: <Text style={styles.infoValue}>{booking[client]?.name}</Text>
                            </Text>
                            <Rating space={5} size={12} iconSpacing={4} vehicle={booking?.vehicle} />
                        </View>
                        <View style={styles.moreInfoAction}>
                            <TouchableOpacity
                                style={styles.outlineButton}
                                onPress={() => router.push({ pathname: '/Chat', params: { id: booking?._id } })}
                            >
                                <Text style={styles.linkText}>Send a message</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginTop: 10,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#D4D7DD',
        backgroundColor: 'white',
        elevation: 2,
        marginBottom: 10,
    },
    cardHeading: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    avatarContainer: {
        flexDirection: 'row',
        width: 90,
    },
    twinAvatar: {
        position: 'relative',
    },
    avatar: {
        height: 48,
        width: 48,
        borderRadius: 100,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    overlayAvatar: {
        height: 48,
        width: 48,
        borderRadius: 100,
        overflow: 'hidden',
        backgroundColor: '#fff',
        position: 'absolute',
        left: '60%',
        borderWidth: 3,
        borderColor: '#fff',
    },
    cardInfo: {
        flex: 1,
    },
    cardTitles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headingLeft: {
        flex: 1,
    },
    headingRight: {
        marginLeft: 5,
    },
    title: {
        fontFamily: 'Poppins-Bold',
        letterSpacing: 0.5,
        fontSize: 20,
        color: '#000000',
        textAlign: 'left',
    },
    subTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 13,
        color: '#000000',
    },
    button: {
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: '#5A89EA',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    disabledButton: {
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: '#999999',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
    },
    moreInfo: {
        flexDirection: 'row',
        backgroundColor: '#EEF4FF',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#D4D7DD',
    },
    moreInfoContent: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 5,
    },
    moreInfoAction: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    infoLabel: {
        color: '#6F7889',
        fontSize: 10,
        fontFamily: 'Poppins-Medium',
    },
    infoValue: {
        color: '#000',
        fontSize: 10,
        fontFamily: 'Poppins-Medium',
    },
    outlineButton: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#5A89EA',
        paddingHorizontal: 10,
        paddingVertical: 7,
        backgroundColor: 'transparent',
    },
    linkText: {
        color: '#5A89EA',
        fontSize: 10,
        fontFamily: 'Poppins-Medium',
    },
});

export default AppointmentBookingCard;
