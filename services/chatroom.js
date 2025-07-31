import api from "../api";

const PATH = '/rooms';
const NAME = 'chatroomMicroserviceAPI';

const sendMessage = async (testdriveId, type, message) => {
    return await api.post(NAME, `${PATH}/${type}/${testdriveId}`, {message});
};

export default {
    sendMessage
}