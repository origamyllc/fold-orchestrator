"use strict";
import  { HTTP } from '../../../cut/index';

// set the access key from local cache
const accessKey = 'Basic jghsdkgfuyeuyertwgdhgjfhjgjkgklugtrgdhgd';

export function  login( body ,callback) {

    const  options = {
        host: 'localhost',
        port: 9100,
        path: '/api/oauth2/v1/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    HTTP.post(options ,body,(result) => {
        return callback(result);
    });

}

export function  getUserByName(name,callback) {

    const options = {
        host: 'localhost',
        port: 9100,
        path: '/api/v1/user/username/'+ name,
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: accessKey
        }
    };

    HTTP.get(options ,(result) => {
        return callback(result);
    });
}

export function getTokenByUserId(userid,callback) {

    const options = {
        host: 'localhost',
        port: 9100,
        path: '/api/v1/tokens/'+ userid,
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization:accessKey
        }
    };

    HTTP.get(options ,(result) => {
        return callback(result);
    });
}

