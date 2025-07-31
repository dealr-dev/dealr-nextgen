import api from "../api";
import deviceInfo from "../device/info";
import { mapFromUserAttributes } from "../utils";

const PATH = '/devices';
const NAME = 'deviceMicroserviceAPI';

const storeDevice = async (nativetoken, expotoken, authenticatedUser) => {

    let device = {...deviceInfo, nativetoken, expotoken};

    const {seller, customer} = mapFromUserAttributes(authenticatedUser.attributes);

    if (seller) {
        device.seller = seller;
    }

    if (customer) {
        device.customer = customer;
    }

    if (device && !device.deviceId) {
        device.deviceId = (new Date()).getTime();
    }

    return await api.post(NAME, PATH, {device});
};

export default {
    storeDevice
}
