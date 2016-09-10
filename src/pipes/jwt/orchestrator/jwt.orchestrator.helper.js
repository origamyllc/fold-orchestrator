"use strict";
import  { HTTP } from 'hulk-cut';
import * as CONSTANTS from '../../../constants/constants';

/**
 * get the access token using the username and password
 * @param body
 * @param callback
 */
export function  get_access_token( body ,callback) {

    const  options = {
        host: CONSTANTS.ORCHORCHESTRATOR_HOST,
        port: CONSTANTS.ORCHESTRATOR_PORT,
        path: CONSTANTS.AUHTENTICATION_PATH,
        method: CONSTANTS.POST,
        headers: {
            'Content-Type': CONSTANTS.CONTENT_TYPE_JSON
        }
    }

    HTTP.post(options ,body,(result) => {
        return callback(result);
    });

}

/**
 * get the user object by user name
 * @param body
 * @param callback
 */

export function  get_user_by_name(user_name,callback) {

    const options = {
        host: CONSTANTS.MICROSERVICES_HOST,
        port: CONSTANTS.MICROSERVICES_PORT ,
        path: CONSTANTS.USER_PATH + user_name,
        method: CONSTANTS.GET,
        headers: {
            accept: CONSTANTS.CONTENT_TYPE_JSON ,
            authorization:CONSTANTS.ACCESS_KEY
        }
    };

    HTTP.get(options ,(result) => {
        return callback(result);
    });
}


/**
 * get the user role by the username
 * @param body
 * @param callback
 */
export function  get_role_by_role_name(role_name,callback) {

    const options = {
        host: CONSTANTS.MICROSERVICES_HOST,
        port: CONSTANTS.MICROSERVICES_PORT,
        path: CONSTANTS.ROLE_PATH + role_name,
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

/**
 * get the jwt token with the help of access token
* @param body
* @param callback
*/

export function get_jwt_token_by_access_token(access_key,callback) {

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

export function  get_claims_by_id(claim_id,callback) {
    const options = {
        host: CONSTANTS.MICROSERVICES_HOST,
        port: CONSTANTS.MICROSERVICES_PORT ,
        path: CONSTANTS.CLAIM_PATH + claim_id,
        method: CONSTANTS.GET,
        headers: {
            accept: CONSTANTS.CONTENT_TYPE_JSON ,
            authorization:CONSTANTS.ACCESS_KEY
        }
    };

    HTTP.get(options ,(result) => {
        return callback(result);
    });
}