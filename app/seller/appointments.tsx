import ReuseableImage from '@/components/Reusable/Image';
import ReusableText from '@/components/Reusable/Text';
import ReusableTile from '@/components/Reusable/Tile';
import ReusableInnerWrapper from '@/components/Reusable/Wrapper/Inner';
import ReusableOuterWrapper from '@/components/Reusable/Wrapper/Outer';
import CustomTheme from '@/theme';
import React from 'react';
import { Dimensions } from 'react-native';

type Appointment = {
  date: string;           // ISO string
  description: string;
  image: { uri: string }; // or a require(...) if you prefer local assets
  repimage: { uri: string };
};

export default function Appointments() {
  // --- Mock data ------------------------------------------------------------
  const list: Appointment[] = [
    {
      date: new Date().toISOString(),
      description: 'Test drive with Sipho at BMW Sandton. Bring proof of address.',
      image: { uri: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=400' },
      repimage: { uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200' },
    },
    {
      date: new Date(Date.now() + 24 * 60 * 60 * 1000 + 75 * 60 * 1000).toISOString(), // tomorrow + 1h15
      description: 'Finance consultation (remote). We’ll review your documents and deposit.',
      image: { uri: 'https://images.unsplash.com/photo-1511910849309-0dffb3c2e42e?q=80&w=400' },
      repimage: { uri: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200' },
    },
    {
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(), // in 3 days + 3h
      description: 'Vehicle inspection at AutoKings Midrand. Arrive 10 mins early.',
      image: { uri: 'https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=400' },
      repimage: { uri: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200' },
    },
  ];
  // -------------------------------------------------------------------------

  const { height, width } = Dimensions.get('window');

  const dayLabel = (iso: string) => {
    const d = new Date(iso);
    const today = new Date();
    const onlyDate = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
    const diffDays = (onlyDate(d) - onlyDate(today)) / (24 * 60 * 60 * 1000);

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return d.toLocaleDateString(undefined, { weekday: 'short', day: '2-digit', month: 'short' });
  };

  const timeLabel = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ReusableOuterWrapper
      style={{
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: width,
        minHeight: height,
      }}
    >
      {list.map(({ date, description, image, repimage }, index) => (
        <ReusableTile
          key={`${date}-${index}`}
          handleTileSelection={() => {
            console.log('handleTileSelection', { index, date });
          }}
          shadowColor={CustomTheme.colors.periwinkleGray}
          activeOpacity={1}
        >
          <ReusableInnerWrapper
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'white',
              width: '80%',
              marginBottom: 5,
              marginLeft: 10,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              height: 101,
              boxShadow: true,
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowOffsetWidth: 0,
              shadowOffsetHeight: 2,
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              borderBottomColor: 'gallery',
              borderBottomWidth: 1,
              borderTopColor: 'gallery',
              borderTopWidth: 1,
              borderLeftColor: 'gallery',
              borderLeftWidth: 1,
              borderRightColor: 'gallery',
              borderRightWidth: 1,
            }}
          >
            {/* Left avatars */}
            <ReusableInnerWrapper
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'white',
                height: 101,
                width: '40%',
              }}
            >
              <ReusableInnerWrapper
                style={{
                  backgroundColor: 'white',
                  borderTopRightRadius: 24,
                  borderTopLeftRadius: 24,
                  borderBottomLeftRadius: 24,
                  borderBottomRightRadius: 24,
                  height: 48,
                  width: 48,
                  position: 'absolute',
                  zIndex: 0,
                  left: 17,
                  top: 26,
                }}
              >
                <ReuseableImage
                  ImgSrc={image}
                  style={{
                    width: 73,
                    height: 73,
                  }}
                />
              </ReusableInnerWrapper>

              <ReusableInnerWrapper
                style={{
                  backgroundColor: 'white',
                  borderBottomColor: 'white',
                  borderBottomWidth: 3,
                  borderTopColor: 'white',
                  borderTopWidth: 3,
                  borderLeftColor: 'white',
                  borderLeftWidth: 3,
                  borderRightColor: 'white',
                  borderRightWidth: 3,
                  borderTopRightRadius: 24,
                  borderTopLeftRadius: 24,
                  borderBottomLeftRadius: 24,
                  borderBottomRightRadius: 24,
                  height: 48,
                  width: 48,
                  position: 'absolute',
                  zIndex: 1,
                  left: 44,
                  top: 26,
                }}
              >
                <ReuseableImage
                  ImgSrc={repimage}
                  style={{
                    width: 73,
                    height: 73,
                  }}
                />
              </ReusableInnerWrapper>
            </ReusableInnerWrapper>

            {/* Right content */}
            <ReusableInnerWrapper
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                backgroundColor: 'white',
                height: 101,
                width: '75%',
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              <ReusableInnerWrapper
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  width: '100%',
                }}
              >
                <ReusableText
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontWeight: '700',
                    fontSize: 22,
                    lineHeight: 26,
                    color: 'black',
                    textAlign: 'center',
                  }}
                >
                  {dayLabel(date)}
                </ReusableText>
                <ReusableText
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontWeight: '700',
                    fontSize: 22,
                    lineHeight: 26,
                    color: 'black',
                    textAlign: 'center',
                  }}
                >
                  {timeLabel(date)}
                </ReusableText>
              </ReusableInnerWrapper>

              <ReusableInnerWrapper
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  backgroundColor: 'white',
                  width: '100%',
                }}
              >
                <ReusableText
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 13,
                    lineHeight: 18.2,
                    color: 'black',
                    fontWeight: '700',
                    textAlign: 'left',
                  }}
                >
                  {description}
                </ReusableText>
              </ReusableInnerWrapper>
            </ReusableInnerWrapper>
          </ReusableInnerWrapper>
        </ReusableTile>
      ))}
    </ReusableOuterWrapper>
  );
}
