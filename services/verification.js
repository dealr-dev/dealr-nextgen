import api from "../api";

const PATH = '/verifiers';
const NAME = 'verifyMicroserviceAPI';

const verifyIdNumber = async (customer, idnumber) => {
    return await api.post(NAME, `${PATH}/${customer}/identity`, {idnumber});
}

const verifyIdCard = async (customer, licenseimageurl) => {
    return await api.post(NAME, `${PATH}/${customer}/recognition`, {licenseimageurl});
}

export default {
    verifyIdNumber,
    verifyIdCard
}
