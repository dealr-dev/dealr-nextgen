import api from "../api";

import {generatePathUrl} from "../utils";
const PATH = '/';
const SELLER_PATH = '/sellers';
const NAME = 'vehicleMicroserviceAPI';

const getVehicles = async (sellerId, page = 0, size = 20, sort = null) => {
    return await api.get(NAME, generatePathUrl(page, size, sort, null, null, null, `${SELLER_PATH}/${sellerId}/myvehicles/vehicles`));
};

const getVehicle = async (id) => {
    return await api.get(NAME, `${PATH}/${id}`);
};

export default {
    getVehicles,
    getVehicle,
}
