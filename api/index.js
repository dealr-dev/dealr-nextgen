import {API, Auth} from 'aws-amplify';

const responseBody = res => res;
const errorBody = res => {

    if (res.response && res.response.data && res.response.data.error) {
        throw new Error(res.response.data.error.message)
    } else {
        if (typeof res === 'string') {
            throw new Error(res);
        } else {
            if (res.message) {
                throw new Error(res.message);
            } else {
                throw new Error(res.response.data.message);
            }
        }
    }
}

const get = async (name, path, query = null) => {
    let options = {
        response: false,
        headers: {

        }
    };

    if (query) {
        options.queryStringParameters = query;
    }

    return API.get(name, path, options).then(responseBody).catch(errorBody);
};

const post = async (name, path, body, headers = null) => {
    let options = {
        response: false,
        body
    };

    if (headers) {
        options.headers = headers;
    }

    return API.post(name, path, options).then(responseBody).catch(errorBody);
};

const put = async (name, path, body, headers = null) => {
    let options = {
        response: false,
        body
    };

    if (headers) {
        options.headers = headers;
    }

    return API.put(name, path, options).then(responseBody).catch(errorBody);
};

const del = async (name, path, headers = null) => {
    let options = {
        response: false
    };

    if (headers) {
        options.headers = headers;
    }

    return API.del(name, path, options).then(responseBody).catch(errorBody);
};

export default {
    get,
    post,
    put,
    del
}
