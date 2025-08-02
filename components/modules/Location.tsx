import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { googleAPI } from '../../services';

interface LocationModuleProps {
  onLocationSelect: (location: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
}

const LocationModule: React.FC<LocationModuleProps> = ({ onLocationSelect }) => {
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<MapView>(null);

  const fetchAddress = async (latitude: number, longitude: number) => {
    try {
      const results = await googleAPI.reverseLookup(latitude, longitude);
      setAddress(results?.address || '');
      onLocationSelect({ lat: latitude, lng: longitude, address: results?.address || '' });
    } catch (e) {
      console.error('Reverse lookup failed', e);
      setAddress('Unknown');
      onLocationSelect({ lat: latitude, lng: longitude, address: 'Unknown' });
    }
  };

  const onRegionChangeComplete = async (region: Region) => {
    await fetchAddress(region.latitude, region.longitude);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setCurrentLocation({ latitude, longitude });
      await fetchAddress(latitude, longitude);
      setLoading(false);
    })();
  }, []);

  if (loading || !currentLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Fetching location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onRegionChangeComplete={onRegionChangeComplete}
        provider={PROVIDER_GOOGLE}
      />
      <View style={styles.markerOverlay}>
        <Text style={styles.markerIcon}>📍</Text>
      </View>
      {address !== '' && (
        <Text style={styles.addressText}>{address}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: 300,
    width: '100%',
    marginBottom: 20,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  markerOverlay: {
    position: 'absolute',
    top: '42%',
    left: '48%',
    transform: [{ translateX: -12 }, { translateY: -24 }],
  },
  markerIcon: {
    fontSize: 24,
  },
  addressText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 13,
    color: '#333',
  },
  loadingContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LocationModule;
