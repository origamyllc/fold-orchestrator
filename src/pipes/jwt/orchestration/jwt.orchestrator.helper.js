"use strict";
import  { HTTP } from '../../../cut/index';
import * as CONSTANTS from '../../../constants/orchestrator.constants';

/**
 * Only an administrator should be able to get the access token
 * current administrator is
 * username : joeyfatone
 * password : administrator
 * @param body
 * @param callback
 */
export function  getAccessToken( body ,callback) {

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
 * Once the Administator has the Access token
 * Administrator should be able to get user
 * @param body
 * @param callback
 */

export function  getUserByName(name,accesskey,callback) {

    const options = {
        host: CONSTANTS.MICROSERVICES_HOST,
        port: CONSTANTS.MICROSERVICES_PORT ,
        path: CONSTANTS.USER_PATH + name,
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
 * Once the Administator has the user
 * Administrator should be able to get roles
 * @param body
 * @param callback
 */
export function  getRoleByName(name,accesskey,callback) {

    const options = {
        host: CONSTANTS.MICROSERVICES_HOST,
        port: CONSTANTS.MICROSERVICES_PORT,
        path: CONSTANTS.ROLE_PATH + name,
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
* Once the Administator has the claim
* Administrator should be able to get jwt token frm cache
* @param body
* @param callback
*/

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

export function  setTokenToRedis(body,accesskey,callback) {

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