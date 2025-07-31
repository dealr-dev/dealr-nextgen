import api from "../api";
const PATH = '/dealerships';
const NAME = 'dealershipMicroserviceAPI';

const getDealership = async (id) => {
    return await api.get(NAME, `${PATH}/${id}`);
};

export default {
    getDealership
}
