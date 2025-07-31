import api from "../api";
import {mapFromUserAttributes} from "../utils";
const PATH = '/favorites';
const NAME = 'favoritesMicroserviceAPI';

const getFavorites = async (authenticatedUser, page = 0, size = 20, sort = 'recent') => {
    
    const {role, customer, seller} = mapFromUserAttributes(authenticatedUser.attributes);

    const offset = page * size;
    const limit = size;

    let query = {offset, limit};

    if (sort === 'recent') {
        query.ascend = 'createdAt';
    } else {
        query.descend = 'createdAt';
    }
console.log('CUSTOMER', customer);
    return await api.get(NAME, `${PATH}/${role === 'seller' ? 'seller' : 'customer'}/${role === 'seller' ? seller : customer}`, query);
};

const getFavoriteIds = async (authenticatedUser) => {
    
    const {role, customer, seller} = mapFromUserAttributes(authenticatedUser.attributes);

    return await api.get(NAME, `${PATH}/slim/${role === 'seller' ? 'seller' : 'customer'}/${role === 'seller' ? seller : customer}`);
};

const toggleFavorites = async (authenticatedUser, vehicle) => {

    const {role, customer, seller} = mapFromUserAttributes(authenticatedUser.attributes);

    return await api.post(NAME, `${PATH}/${role === 'seller' ? 'seller' : 'customer'}/${role === 'seller' ? seller : customer}/vehicle/${vehicle}`);
};

export default {
    getFavorites,
    getFavoriteIds,
    toggleFavorites
}
