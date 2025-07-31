import api from "../api";

const PATH = '/bookings';
const SCHEDULE_PATH = '/schedules'
const CUSTOMER_TO_CUSTOMER = `${PATH}/customertocustomer`;
const CUSTOMER_TO_SELLER = `${PATH}/customertoseller`;
const SELLER_TO_CUSTOMER = `${PATH}/sellertocustomer`;
const SELLER_TO_SELLER = `${PATH}/sellertoseller`;
const NAME = 'scheduleMicroserviceAPI';

import {mapFromUserAttributes} from "../utils"

//seller = null, buyerseller = null, buyercustomer = null, sellercustomer = null
const getTestDrives = async (role, id, page = 0, size = 3, history = false, upcoming = false, sort = 'recent') => {
    const offset = page * size;
    const limit = size;

    let query = {offset, limit};

    query[role] = id;

    if (history) {
        query.before = true;
    }

    if (upcoming) {
        query.after = true;
    }

    if (sort === 'recent') {
        query.descend = 'datetime';
    } else {
        query.ascend = 'datetime';
    }

    return await api.get(NAME, PATH, query);
}

const getTestDriveSlotsForVehicle = async (vehicle, date) => {
    return await api.get(NAME, `${SCHEDULE_PATH}/vehicle/${vehicle}/availability`, {date});
}

const bookCustomerToCustomerTestDrive = async (buyercustomer, sellercustomer, date, slot, vehicle) => {
    const booking = {
        buyercustomer,
        sellercustomer,
        date,
        vehicle,
        slot
    }
    return await api.post(NAME, CUSTOMER_TO_CUSTOMER, {booking});
}

const bookCustomerToSellerTestDrive = async (buyercustomer, seller, dealership, date, slot, vehicle) => {
    const booking = {
        buyercustomer,
        seller,
        date,
        vehicle,
        slot,
        dealership
    }
    return await api.post(NAME, CUSTOMER_TO_SELLER, {booking});
}

const bookSellerToCustomerTestDrive = async (buyerseller, sellercustomer, date, slot, vehicle) => {
    const booking = {
        buyerseller,
        sellercustomer,
        date,
        vehicle,
        slot
    }
    return await api.post(NAME, SELLER_TO_CUSTOMER, {booking});
}

const bookSellerToSellerTestDrive = async (buyerseller, seller, dealership, date, slot, vehicle) => {
    const booking = {
        buyerseller,
        seller,
        date,
        vehicle,
        slot,
        dealership
    }
    return await api.post(NAME, SELLER_TO_SELLER, {booking});
}

const bookTestDriver = async (authenticatedUser, vehicle, slot, date, sellerDetails) => {
    const {type, id} = sellerDetails;
    const {role, seller, customer} = mapFromUserAttributes(authenticatedUser);

    if (type === 'Customer' && role === 'seller') {
        return await bookSellerToCustomerTestDrive(seller, id, date, slot, vehicle);
    } else if (type === 'Customer' && role !== 'seller') {
        return await bookCustomerToCustomerTestDrive(customer, id, date, slot, vehicle);
    } else if (type === 'Seller' && role === "seller") {
        return await bookSellerToSellerTestDrive(seller, id, null, date, slot, vehicle);
    } else {
        return await bookCustomerToSellerTestDrive(customer, id, null, date, slot, vehicle);
    }
}

const getTestDrive = async (id) => {
    return await api.get(NAME, `${PATH}/${id}`);
};

const storeBuyerTestDriveDetail = async (id, notes, images) => {

    let detail = {
        notes,
        images
    };

    return await api.put(NAME, `${PATH}/${id}/detail/buyer`, {detail});
}

const storeSellerTestDriveDetail = async (id, notes, images) => {

    let detail = {
        notes,
        images
    };

    return await api.put(NAME, `${PATH}/${id}/detail/seller`, {detail});
}

const beginTestDrive = async (id) => {
    return await api.post(NAME, `${PATH}/${id}/begin`);
}

const cancelTestDrive = async (id) => {
    return await api.post(NAME, `${PATH}/${id}/cancel`);
}

const completeTestDrive = async (id) => {
    return await api.post(NAME, `${PATH}/${id}/complete`);
}

export default {
    getTestDrives,
    bookCustomerToCustomerTestDrive,
    bookCustomerToSellerTestDrive,
    bookSellerToCustomerTestDrive,
    bookSellerToSellerTestDrive,
    bookTestDriver,
    getTestDrive,
    getTestDriveSlotsForVehicle,
    storeBuyerTestDriveDetail,
    storeSellerTestDriveDetail,
    beginTestDrive,
    cancelTestDrive,
    completeTestDrive
}
