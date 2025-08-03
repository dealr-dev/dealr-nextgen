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

export const generateMobileNumber = (code, mobilenumber) => {
    if (mobilenumber) {
        const mobilenumberwithnozero = mobilenumber.charAt(0) === '0' ? mobilenumber.replace(mobilenumber.charAt(0), "") : mobilenumber;

        return `${code}${mobilenumberwithnozero}`;
    }

    return `${code}${mobilenumber}`;
}

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

export const generatePathUrl = (page, size, sort, condition, category, budget, base) => {
    const offset = page * size;
    const separator = "&";
    const equater = "=";
    let filter = `?offset${equater}${offset}${separator}limit${equater}${size}`;
    if (sort) {
        const key = Object.keys(sort)[0];
        filter += separator + key + equater + sort[key];
    }
    if (condition) {
        filter += separator + 'condition' + equater + condition
    }
    if (category) {
        filter += separator + 'vehicletype' + equater + category
    }
    if (budget) {
        filter += separator + 'budget' + equater + budget
    }
    return base + filter;
};

export const generateCustomPathUrl = (attributes, page, size, sort, base) => {
    const offset = page * size;
    const separator = "&";
    const equater = "=";
    let filter = `?offset${equater}${offset}${separator}limit${equater}${size}`;
    if (sort) {
        const key = Object.keys(sort)[0];
        filter += separator + key + equater + sort[key];
    }
    const keys = Object.keys(attributes);
    const attributefilters = keys.reduce((curr, key) => {
        curr += separator + key + equater + attributes[key]
        return curr;
    }, '');
    return base + filter + attributefilters;
};

