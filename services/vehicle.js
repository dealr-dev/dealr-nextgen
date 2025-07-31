import api from "../api";

import {generatePathUrl} from "../utils";
const PATH = '/';
const CUSTOMER_PATH = '/customers';
const NAME = 'vehicleMicroServiceAPIv2';

const getVehicles = async (condition = null, category = null, budget = null, page = 0, size = 20, sort = null) => {
    return await api.get(NAME, generatePathUrl(page, size, sort, condition, category, budget, PATH));
};

const getVehiclesWithFilters = async (condition = null, category = null, budget = null, filters, page = 0, size = 20, sort = null) => {
    return await api.post(NAME, generatePathUrl(page, size, sort, condition, category, budget, `${CUSTOMER_PATH}/vehicles/filtered`, {filters}));
};

const getVehiclesByPriceFromHighToLow = async (filters, condition = null, category = null, budget = null, page = 0, size = 20) => {
    if (filters) {
        return await api.post(NAME, generatePathUrl(page, size, null, null, null, null, `${CUSTOMER_PATH}/vehicles/filtered/bypricehigh`), filters);
    }

    return await api.post(NAME, generatePathUrl(page, size, null, condition, category, budget, `${CUSTOMER_PATH}/vehicles/filtered/bypricehigh`), filters);
};

const getVehiclesByPriceFromLowToHigh = async (filters, condition = null, category = null, budget = null, page = 0, size = 20) => {
    if (filters) {
        return await api.post(NAME, generatePathUrl(page, size, null, null, null, null, `${CUSTOMER_PATH}/vehicles/filtered/bypricelow`), filters);
    }

    return await api.post(NAME, generatePathUrl(page, size, null, condition, category, budget, `${CUSTOMER_PATH}/vehicles/filtered/bypricelow`), filters);
};

const getVehiclesByLocation = async (filters, condition = null, category = null, budget = null, page = 0, size = 20) => {
    if (filters) {
        console.log('Get Vehicles By Location', filters)
        return await api.post(NAME, generatePathUrl(page, size, null, null, null, null, `${CUSTOMER_PATH}/vehicles/filtered/bydistance`), filters);
    }

    return await api.post(NAME, generatePathUrl(page, size, null, condition, category, budget, `${CUSTOMER_PATH}/vehicles/filtered/bydistance`), filters);
};

const getVehiclesByBestMatch = async (filters, condition = null, category = null, budget = null, page = 0, size = 20) => {
    if (filters) {
        return await api.post(NAME, generatePathUrl(page, size, null, null, null, null, `${CUSTOMER_PATH}/vehicles/filtered/bybestmatch`), filters);
    }

    return await api.post(NAME, generatePathUrl(page, size, null, condition, category, budget, `${CUSTOMER_PATH}/vehicles/filtered/bybestmatch`), filters);
};

const getVehicle = async (id) => {
    return await api.get(NAME, `${PATH}/${id}`);
};

const prepareVehicleForEdit = async (id) => {
    return await api.post(NAME, `${PATH}${id}/prepare`, {id});
};

const addVehicle = async (vehicle) => {
    return await api.post(NAME, PATH, {vehicle});
};

const addVehicleWithVin = async (vin) => {
    return await api.post(NAME, `${CUSTOMER_PATH}/vehicles/add/withvin`, {vin});
};

const deleteVehicle = async (id) => {
    return await api.del(NAME, `${PATH}vehicles/${id}`);
};

/*const editVehicle = async (id, vehicle, features) => {
    return await api.put(NAME, `${PATH}${id}`, {vehicle, features});
};*/

const editVehicle = async (id, vehicle) => {
    return await api.put(NAME, `${PATH}${id}`, {vehicle});
};

const uploadVehicleImage = async (id, url) => {
    return await api.post(NAME, `${CUSTOMER_PATH}/${id}/images`, {url});
};

const getCustomerVehicles = async (customer, page = 0, size = 20, sort = null) => {
    return await api.get(NAME, generatePathUrl(page, size, sort, null, null, null, `${CUSTOMER_PATH}/${customer}/vehicles`));
};

export default {
    getVehicles,
    getVehicle,
    editVehicle,
    addVehicle,
    addVehicleWithVin,
    deleteVehicle,
    uploadVehicleImage,
    getVehiclesWithFilters,
    getCustomerVehicles,
    getVehiclesByBestMatch,
    getVehiclesByLocation,
    getVehiclesByPriceFromHighToLow,
    getVehiclesByPriceFromLowToHigh,
    prepareVehicleForEdit
}
