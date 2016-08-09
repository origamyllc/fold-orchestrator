"use strict";
import  { HTTP } from '../../../cut/index';
import * as CONSTANTS from '../../../constants/orchestrator.constants';

export function  login( body ,callback) {
    const  options = {
        host: CONSTANTS.MICROSERVICES_HOST,
        port: CONSTANTS.MICROSERVICES_PORT,
        path: CONSTANTS.OAUTH_PATH,
        method: CONSTANTS.POST ,
        headers: {
            'Content-Type': CONSTANTS.CONTENT_TYPE_JSON
        }
    }

    HTTP.post(options ,body,(result) => {
        return callback(result);
    });
}

export function  getUserByName(name,callback) {
    const options = {
        host: CONSTANTS.MICROSERVICES_HOST,
        port: CONSTANTS.MICROSERVICES_PORT,
        path: CONSTANTS.USER_PATH + name,
        method: CONSTANTS.GET,
        headers: {
            accept: CONSTANTS.CONTENT_TYPE_JSON,
            authorization: CONSTANTS.ACCESS_KEY
        }
    };

    HTTP.get(options ,(result) => {
        return callback(result);
    });
}

export function getTokenByUserId(userid,callback) {
    const options = {
        host: CONSTANTS.MICROSERVICES_HOST,
        port: CONSTANTS.MICROSERVICES_PORT,
        path: CONSTANTS.TOKEN_PATH +'user/' + userid,
        method: CONSTANTS.GET ,
        headers: {
            accept: CONSTANTS.CONTENT_TYPE_JSON,
            authorization: CONSTANTS.ACCESS_KEY
        }
    };

    HTTP.get(options ,(result) => {
        return callback(result);
    });
}

export function  getJWTTokenByAccessToken(accesskey,callback) {

    const options = {
        host: CONSTANTS.BACKEND_HOST,
        port: CONSTANTS.BACKEND_PORT ,
        path: CONSTANTS.REDIS_PATH + accesskey,
        method: CONSTANTS.GET,
        headers: {
            accept: CONSTANTS.CONTENT_TYPE_JSON ,
            authorization:CONSTANTS.ACCESS_KEY
        }
    };

    HTTP.get(options, (result) => {
        return callback(result);
    });
}

export function  deleteAccessToken(accesskey,callback) {

    const options = {
        host: CONSTANTS.BACKEND_HOST,
        port: CONSTANTS.BACKEND_PORT ,
        path: CONSTANTS.REDIS_PATH + accesskey,
        method: CONSTANTS.DELETE,
        headers: {
            accept: CONSTANTS.CONTENT_TYPE_JSON ,
            authorization:CONSTANTS.ACCESS_KEY
        }
    };

    HTTP.get(options, (result) => {
        return callback(result);
    });
}


export function  setTokenToRedis(body,callback) {

    const options = {
        host: CONSTANTS.BACKEND_HOST,
        port: CONSTANTS.BACKEND_PORT ,
        path: CONSTANTS.REDIS_PATH ,
        method: CONSTANTS.POST,
        headers: {
            'Content-Type': CONSTANTS.CONTENT_TYPE_XML,
            'Content-Length':JSON.stringify(body).length,
            authorization:CONSTANTS.ACCESS_KEY
        }
    };

    HTTP.post(options ,body,(result) => {
        return callback(result);
    });
}

export function  getAccessToken(token,callback) {
        const options = {
          host: CONSTANTS.MICROSERVICES_HOST,
            port: CONSTANTS.MICROSERVICES_PORT,
            path: CONSTANTS.TOKEN_PATH + token,
            method: CONSTANTS.GET ,
            headers: {
                accept: CONSTANTS.CONTENT_TYPE_JSON,
                authorization: CONSTANTS.ACCESS_KEY
            }
        };

        HTTP.get(options, (result) => {
            return callback(result);
        });

}


export function  updateAccessToken(userId,body,callback) {

    const options = {
        host: CONSTANTS.MICROSERVICES_HOST,
        port: CONSTANTS.MICROSERVICES_PORT,
        path: CONSTANTS.TOKEN_PATH + userId,
        method: CONSTANTS.PUT ,
        headers: {
            accept: CONSTANTS.CONTENT_TYPE_JSON,
            authorization: CONSTANTS.ACCESS_KEY
        }
    };



    HTTP.put(options,body, (result) => {
        return callback(result);
    });

}
