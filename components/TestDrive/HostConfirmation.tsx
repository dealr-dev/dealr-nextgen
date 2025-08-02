import Constants from 'expo-constants';
import moment from 'moment';
import React from 'react';
import { Dimensions } from 'react-native';
import { border, borderRadius, topBarProps } from '../../../utils/Styles';
import ScreenTopNav from '../../navigation/TopNav';
import Rating from '../Core/Rating';
import ReusableButton from '../Reusable/Button';
import ReusableImage from '../Reusable/Image';
import Text from '../Text';
import Wrapper from '../Wrapper';


interface Buyer {
  name: string;
  avatar?: string;
}

interface Vehicle {
  rating: number;
}

interface Booking {
  buyer?: Buyer;
  date?: string;
  time?: string;
  address?: string;
  vehicle?: Vehicle;
}

interface HostConfirmationProps {
  booking: Booking;
  onOkay: () => void;
  onSendMessage?: () => void;
}

export default function HostConfirmation({
  booking,
  onOkay,
  onSendMessage,
}: HostConfirmationProps) {
  const { width } = Dimensions.get('window');

  return (
    <>
      <Wrapper
        backgroundColor="white"
        flexDirection="column"
        width={width}
        marginTop={Constants.statusBarHeight}
      >
        <ScreenTopNav
          style={{
            width: '90%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            left: 1,
          }}
        >
          <Wrapper
            width="100%"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Text {...topBarProps} width="90%" textAlign="center">
              test drive request
            </Text>
          </Wrapper>
        </ScreenTopNav>
      </Wrapper>

      <Wrapper
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        width="100%"
        marginTop={24}
      >
        <Wrapper
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width={150}
          height={150}
          backgroundColor="white"
          {...borderRadius(75)}
          {...border(1, 'mishka')}
        >
          <ReusableImage
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
            remote
            ImgSrc={booking?.buyer?.avatar || undefined}
          />
        </Wrapper>
      </Wrapper>

      <Wrapper
        flexDirection="column"
        justifyContent="center"
        width="100%"
        marginTop={24}
      >
        <Text
          textTransform="uppercase"
          fontFamily="BebasNeue-Regular"
          textColor="cornflowerBlue"
          fontSize={48}
          marginTop={7}
          marginBottom={3}
          lineHeight={48}
        >
          {booking?.buyer?.name || ''}
        </Text>
        <Text
          textTransform="uppercase"
          fontFamily="BebasNeue-Regular"
          fontSize={24}
          marginTop={3}
          marginBottom={3}
          lineHeight={24}
        >
          will be your guest
        </Text>
      </Wrapper>

      <Wrapper
        flexDirection="column"
        justifyContent="center"
        width="100%"
        marginTop={24}
      >
        <Rating vehicle={{ rating: booking?.vehicle?.rating || 0 }} hideValue size={18} iconSpacing={5} />
        <Text
          color="cornflowerBlue"
          fontSize={10}
          marginTop={3}
          marginBottom={3}
          lineHeight={14}
        >
          {booking?.vehicle?.rating || 0} (16 reviews)
        </Text>
      </Wrapper>

      <Wrapper flexDirection="column" width="100%" marginTop={27.54}>
        <Wrapper
          width="90%"
          backgroundColor="zircon"
          flexDirection="column"
          {...borderRadius(10)}
        >
          <Wrapper
            flexDirection="row"
            justifyContent="space-evenly"
            width="100%"
            marginTop={25}
            marginBottom={30}
          >
            <Wrapper flexDirection="column" justifyContent="center">
              <Text fontSize={16} lineHeight={22.4} textColor="raven">
                Date
              </Text>
              <Text fontSize={16} lineHeight={22.4} fontFamily="Poppins-Bold">
                {booking?.date ? moment(booking.date).calendar().split(' at ')[0] : ''}
              </Text>
            </Wrapper>
            <Wrapper {...border(1, 'mishka')} height="100%" />
            <Wrapper flexDirection="column" justifyContent="center">
              <Text fontSize={16} lineHeight={22.4} textColor="raven">
                Time
              </Text>
              <Text fontSize={16} lineHeight={22.4} fontFamily="Poppins-Bold">
                {booking?.time || ''}
              </Text>
            </Wrapper>
          </Wrapper>
          <Wrapper flexDirection="column" justifyContent="space-evenly" marginBottom={23}>
            <Text fontSize={16} lineHeight={22.4} textColor="raven">
              Pickup location
            </Text>
            <Text fontSize={16} lineHeight={22.4} fontFamily="Poppins-Bold">
              {booking?.address || ''}
            </Text>
          </Wrapper>
        </Wrapper>
      </Wrapper>

      <Wrapper
        flexDirection="row"
        justifyContent="center"
        width="100%"
        marginTop={24}
      >
        <ReusableButton
          style={{
            fontFamily: 'Poppins-Regular',
            backgroundColor: 'cornflowerBlue',
            textAlign: 'center',
            height: 55,
            width: '25%',
            paddingRight: 68,
            ...borderRadius(10),
          }}
          handleOnPress={onOkay}
        >
          <Text
            fontFamily="Poppins-Bold"
            fontSize={14}
            lineHeight={19}
            textColor="white"
            fontWeight="700"
            textAlign="center"
          >
            Accept
          </Text>
        </ReusableButton>
      </Wrapper>
    </>
  );
}
