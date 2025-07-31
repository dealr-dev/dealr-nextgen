import api from "../api";
import {generatePathUrl, generateCustomPathUrl} from "../utils";

const PATH = '/schedules';
const NAME = 'scheduleMicroserviceAPI';
const SLOTS_PATH = '/slots';
const ALLOCATION_PATH = '/allocations';

const getSellerScheduleSlots = async (seller, date) => {
    return await api.get(NAME, `${PATH}/sellers/${seller}/slots/${date}`);
};

const getCustomerScheduleSlots = async (customer, date) => {
    return await api.get(NAME, `${PATH}/customers/${customer}/slots/${date}`);
};

const getScheduleSlots = async (id, role, date) => {
    return await api.get(NAME, `${PATH}/${role}s/${id}/slots/${date}`);
}

const saveSellerScheduleSlots = async (seller, date, slots, defaults) => {
    return await api.post(NAME, `${PATH}/sellers/${seller}/slots/${date}`, {slots, defaults});
};

const saveCustomerScheduleSlots = async (customer, date, slots, defaults) => {
    return await api.post(NAME, `${PATH}/customers/${customer}/slots/${date}`, {slots, defaults});
};

const saveScheduleSlots = async (id, role, date, slots, defaults) => {
    return await api.post(NAME, `${PATH}/${role}s/${id}/slots/${date}`, {slots, defaults});
}

const getCustomerAvailableSlots = async (customer, date) => {
    return await api.get(NAME, `${PATH}/customers/${customer}/slots/${date}/availability`);
};

const getSellerAvailableSlots = async (seller, date) => {
    return await api.get(NAME, `${PATH}/sellers/${seller}/slots/${date}/availability`);
};

const getCustomerSchedules = async (customer, start, page = 0, size = 20, sort = null) => {
    return await api.get(NAME, generateCustomPathUrl({start}, page, size, sort, `${PATH}/customer/${customer}`));
};

const getSchedule = async (id) => {
    return await api.get(NAME, `${PATH}/${id}`);
};

const addSchedule = async (schedule) => {
    return await api.post(NAME, PATH, {schedule});
};

const deleteSchedule = async (id) => {
    return await api.del(NAME, `${PATH}/${id}`);
};

const editSchedule = async (id, schedule) => {
    return await api.put(NAME, `${PATH}/${id}`, {schedule});
};

const getSlots = async () => {
    return await api.get(NAME, SLOTS_PATH);
};

const addSlot = async (slot) => {
    return await api.post(NAME, SLOTS_PATH, {slot});
};

const deleteSlot = async (id) => {
    return await api.del(NAME, `${SLOTS_PATH}/${id}`);
};

const getAllocation = async (seller, date) => {
    return await api.get(NAME, `${ALLOCATION_PATH}/${date}/${seller}`);
};

const addOrUpdateAllocation = async (allocation) => {
    return await api.post(NAME, ALLOCATION_PATH, {allocation});
};

export default {
    saveSellerScheduleSlots,
    saveCustomerScheduleSlots,
    saveScheduleSlots,
    getSellerScheduleSlots,
    getCustomerScheduleSlots,
    getScheduleSlots,
    getCustomerSchedules,
    getSchedule,
    editSchedule,
    addSchedule,
    deleteSchedule,
    getSlots,
    addSlot,
    deleteSlot,
    getAllocation,
    addOrUpdateAllocation,
    getCustomerAvailableSlots,
    getSellerAvailableSlots
}
