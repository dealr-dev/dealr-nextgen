import { Alert, Linking, Platform } from 'react-native';

export const openMaps = (latitude, longitude, label = 'Location') => {
  if (!latitude || !longitude) {
    Alert.alert('Invalid coordinates', 'Latitude and longitude must be provided.');
    return;
  }

  const latLng = `${latitude},${longitude}`;
  const url =
    Platform.OS === 'ios'
      ? `http://maps.apple.com/?ll=${latLng}&q=${encodeURIComponent(label)}`
      : `geo:${latLng}?q=${encodeURIComponent(label)}`;

  Linking.openURL(url).catch(err => {
    console.error('Failed to open maps:', err);
    Alert.alert('Error', 'Unable to open map application.');
  });
};


export const highlightSelectedTile = (arr, i) => {
    return arr.length > 0 && arr.includes(i);
}

export const capitalizeWord = word => {
    if (!word) {
        return '';
    } else {
        const capitalizedWord = (word).toString().split('');
        return capitalizedWord[0].toUpperCase() + (word).toString().substring(1);
    }
}

const ID = () => Math.floor(Math.random() * 100);

export const displayInCurrencyFormat = number => {
    return (number).toLocaleString('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
    });
}

export const sortItemsByAsc = (items, field, asc = true) => {
    if (asc) {
        return items.sort((a, b) => {
            if (a[`${field}`] < b[`${field}`]) { return -1; }
            if (a[`${field}`] > b[`${field}`]) { return 1; }
            return 0;
        });
    } else {
        return items.sort((a, b) => {
            if (a[`${field}`] > b[`${field}`]) { return -1; }
            if (a[`${field}`] < b[`${field}`]) { return 1; }
            return 0;
        });
    }
}

