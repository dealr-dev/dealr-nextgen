import api from "../api";

const PATH = '/customers';
const NAME = 'customerMicroserviceAPI';

const addCustomer = async (customer) => {
    return await api.post(NAME, PATH, {customer});
};

const getCustomers = async () => {
    return await api.get(NAME, PATH);
};

const editCustomer = async (id, customer) => {
    return await api.put(NAME, `${PATH}/${id}`, {customer});
};

const changeCustomerAvatar = async (id, url) => {
    const customer = {
        avatar: url
    };
    return await api.put(NAME, `${PATH}/${id}`, {customer});
};

const changeCustomerLicenceDisk = async (id, url) => {
    const customer = {
        licencedisk: url
    };
    return await api.put(NAME, `${PATH}/${id}`, {customer});
};

const changeCustomerIdCard = async (id, url) => {
    const customer = {
        idcard: url
    };
    return await api.put(NAME, `${PATH}/${id}`, {customer});
};
export default {
    addCustomer,
    editCustomer,
    getCustomers,
    changeCustomerAvatar,
    changeCustomerLicenceDisk,
    changeCustomerIdCard
}
