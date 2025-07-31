import api from "../api";

const PATH = '/places';
const NAME = 'googleMicroserviceAPI';

const autoComplete = async (input) => {
    return await api.get(NAME, PATH, {input});
};

const getPlaceDetails = async (googleplaceid) => {
    return await api.post(NAME, PATH, {googleplaceid});
};

const reverseLookup = async (latitude, longitude) => {

    const coordinates = {
        latitude,
        longitude
    }

    return await api.post(NAME, `${PATH}/reverse`, {coordinates});
};

export default {
    autoComplete,
    reverseLookup,
    getPlaceDetails
}

