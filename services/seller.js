import { generatePathUrl } from "@/utils";
import api from "../api";
import sessionService from "./AuthService";

const PATH = '/sellers';
const NAME = 'sellerMicroserviceAPI';

const getSellers = async (page = 0, size = 20, sort = null) => {

    const user = await sessionService.getSession();

    const {attributes} = user;

    const dealership = attributes ? (attributes['custom:dealership'] ? attributes['custom:dealership'] : null) : null;

    return await api.get(NAME, generatePathUrl(dealership, page, size, sort, PATH));
};

const searchSellers = async (input, page = 0, size = 20, sort = null) => {

    const user = await sessionService.getSession();

    const {attributes} = user;

    const dealership = attributes ? (attributes['custom:dealership'] ? attributes['custom:dealership'] : null) : null;

    return await api.get(NAME, generatePathUrl(dealership, page, size, sort, `${PATH}/search/term`), {input});
};

const addSeller = async (seller) => {
    return await api.post(NAME, PATH, {seller});
};

const deleteSeller = async (id) => {
    return await api.del(NAME, `${PATH}/${id}`);
};

const editSeller = async (id, seller) => {
    return await api.put(NAME, `${PATH}/${id}`, {seller});
};

export default {
    getSellers,
    searchSellers,
    editSeller,
    addSeller,
    deleteSeller
}
