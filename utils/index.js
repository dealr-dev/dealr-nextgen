import moment from 'moment';
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

export const capitalizeWord = word => {
    if (!word) {
        return '';
    } else {
        const capitalizedWord = (word).toString().split('');
        return capitalizedWord[0].toUpperCase() + (word).toString().substring(1);
    }
}

export const highlightSelectedTile = (arr, i) => {
    return arr.length > 0 && arr.includes(i);
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

export const getDates = () => {
    return [0, 1, 2, 3, 4, 5].map((item, index) => {
        return item === 0 ? {
            "id": `date-field-${index}`,
            "display": "TODAY",
            "date": moment().add(item, 'days').format("YYYY-MM-DD")
        } : {
            "id": `date-field-${index}`,
            "display": moment().add(item, 'days').format("ddd DD MMM"),
            "date": moment().add(item, 'days').format("YYYY-MM-DD")
        }
    })
}

export const mapFromUserAttributes = (attributes) => {
    return {
        condition: typeof attributes['custom:condition'] !== 'undefined' ? attributes['custom:condition'] : null,
        categories: typeof attributes['custom:categories'] !== 'undefined' ? mapToAttributeArray(attributes['custom:categories']) : [],
        budget: typeof attributes['custom:budget'] !== 'undefined' ? attributes['custom:budget'] : null,
        role: attributes['custom:role'],
        customer: attributes['custom:customer'],
        seller: attributes['custom:seller'],
        dealership: attributes['custom:dealership'],
        features: typeof attributes['custom:features'] !== 'undefined' ? mapToAttributeArray(attributes['custom:features']) : [],
        brands: typeof attributes['custom:brands'] !== 'undefined' ? mapToAttributeArray(attributes['custom:brands']) : [],
        years: typeof attributes['custom:years'] !== 'undefined' ? mapToObject(attributes['custom:years']) : null,
        prices: typeof attributes['custom:prices'] !== 'undefined' ? mapToObject(attributes['custom:prices']) : null,
        sort: typeof attributes['custom:sort'] !== 'undefined' ? attributes['custom:sort'] : null,
        location: typeof attributes['custom:location'] !== 'undefined' ? mapToObject(attributes['custom:location']) : null,
        avatar: attributes['custom:avatar'],
        route: attributes['custom:route']
    }
};

const mapToAttributeArray = (stringvalue) => {
    if (stringvalue) {

        return JSON.parse(stringvalue);
    }

    return []
};

const mapToObject = (stringvalue) => {
    if (stringvalue) {
        return JSON.parse(stringvalue);
    }
    return null;
};

export const stringListsAreTheSame = (listA, listB) => {
    if (listA && listB && listA.length === listB.length) {
        return listA.sort().toString() === listB.sort().toString();
    }

    return false;
}

export const stringListReturnWhatsInAandExistsInB = (listA, listB) => {
    if (listA && listB && listA.length > 0 && listB.length > 0) {
        return listA.reduce((toreturn, curr) => {
            if (listB.includes(curr)) {
                return [...toreturn, curr];
            } else {
                return toreturn;
            }
        }, []);
    }

    return null;
}

