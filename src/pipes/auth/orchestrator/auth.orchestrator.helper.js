"use strict";
import  { HTTP } from '../../../cut/index';
import * as CONSTANTS from '../../../constants/constants';

export function  login_user( body ,callback) {
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

export function  get_user_by_name(user_name,callback) {
    const options = {
        host: CONSTANTS.MICROSERVICES_HOST,
        port: CONSTANTS.MICROSERVICES_PORT,
        path: CONSTANTS.USER_PATH + user_name,
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

export function get_user_token_by_id(user_id,callback) {
    const options = {
        host: CONSTANTS.MICROSERVICES_HOST,
        port: CONSTANTS.MICROSERVICES_PORT,
        path: CONSTANTS.TOKEN_PATH +'user/' + user_id,
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

export function  get_jwt_by_access_token(access_key,callback) {

    const options = {
        host: CONSTANTS.BACKEND_HOST,
        port: CONSTANTS.BACKEND_PORT ,
        path: CONSTANTS.REDIS_PATH + access_key,
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

export function  delete_access_token(access_key,callback) {

    const options = {
        host: CONSTANTS.BACKEND_HOST,
        port: CONSTANTS.BACKEND_PORT ,
        path: CONSTANTS.REDIS_PATH + access_key,
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


export function  set_token_in_cache(body,callback) {

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

export function  get_access_token(token,callback) {
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


export function  update_access_token(user_id,body,callback) {

    const options = {
        host: CONSTANTS.MICROSERVICES_HOST,
        port: CONSTANTS.MICROSERVICES_PORT,
        path: CONSTANTS.TOKEN_PATH + user_id,
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
