// app/buyer/vehicles/_layout.tsx
import CustomTheme from '@/theme';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

const activeColor = CustomTheme.colors.cornflowerBlue;
const inactiveColor = 'gray';

export default function VehiclesLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: 'black',
          borderTopWidth: 0,
        },
        tabBarLabel: ({ focused }) => {
          const labelMap: Record<string, string> = {
            index: 'Explore',
            favourite: 'Favourites',
            'test-drives': 'Drives',
            selling: 'Sell',
          };
          return (
            <Text
              style={{
                fontSize: 10,
                color: focused ? activeColor : inactiveColor,
                fontFamily: 'Poppins-Regular',
              }}
            >
              {labelMap[route.name]}
            </Text>
          );
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent = Ionicons;

          switch (route.name) {
            case 'index':
              iconName = 'car-sport-outline';
              break;
            case 'favourite':
              iconName = 'heart';
              IconComponent = FontAwesome5;
              break;
            case 'test-drives':
              iconName = 'steering';
              IconComponent = MaterialCommunityIcons;
              break;
            case 'selling':
              iconName = 'edit';
              IconComponent = FontAwesome5;
              break;
            default:
              iconName = 'apps';
              break;
          }

          return (
            <IconComponent
              name={iconName}
              size={size ?? 24}
              color={focused ? activeColor : inactiveColor}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="favourite" />
      <Tabs.Screen name="test-drives" />
      <Tabs.Screen name="selling" />
    </Tabs>
  );
}
