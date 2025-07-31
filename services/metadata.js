import api from "../api";

const PATH = '/';
const COLORS = '/colors';
const MODELS = '/models';
const BRANDS = '/brands';
const NAME = 'vehicleMetadataMicroserviceAPI';
const ATTRIBUTE_NAME = 'vehicleMicroserviceAPI';
const ATTRIBUTE_PATH = '/attributes/search/term';

const searchColors = async (input = null) => {
    if (input) {
        return await api.get(NAME, COLORS, {input});
    }

    return await api.get(NAME, COLORS);
};

const searchBrands = async (input = null) => {
    if (input) {
        return await api.get(NAME, BRANDS, {input});
    }

    return await api.get(NAME, BRANDS);
};

const fetchAllBrands = async () => {
    return await api.get(NAME, `${BRANDS}/all`);
};

const searchModels = async (brand = null, input = null) => {
    if (input && !brand) {
        return await api.get(NAME, MODELS, {input});
    } else if (input && brand) {
        return await api.get(NAME, MODELS, {input, brand});
    } else if (!input && brand) {
        return await api.get(NAME, MODELS, {brand});
    }

    return await api.get(NAME, MODELS);
};

const searchFeatures = async (input) => {
    const type = 'boolean';
    return await api.get(ATTRIBUTE_NAME, ATTRIBUTE_PATH, {input, type});
};

export default {
    searchColors,
    searchBrands,
    fetchAllBrands,
    searchModels,
    searchFeatures
}
