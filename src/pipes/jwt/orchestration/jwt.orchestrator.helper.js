"use strict";
import  { HTTP } from '../../../cut/index';

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
        host: 'localhost',
        port: 9200,
        path: '/api/v1/authenticate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
        host: 'localhost',
        port: 9100,
        path: '/api/v1/user/username/'+ name,
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization:accesskey
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
        host: 'localhost',
        port: 9100,
        path: '/api/v1/roles/name/' + name,
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization:accesskey
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

export function  getTokenFromRedis(name,accesskey,callback) {

    const options = {
        host: 'localhost',
        port: 9000,
        path: '/api/v1/infrastructure/redis/' + name,
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization:accesskey
        }
    };

    HTTP.get(options, (result) => {
        return callback(result);
    });
}


/**
 * set the token in the cache
 * @param body
 * @param callback
 */

export function  getTokenFromRedis(name,accesskey,callback) {

    const options = {
        host: 'localhost',
        port: 9000,
        path: '/api/v1/infrastructure/redis/' + name,
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization:accesskey
        }
    };

    HTTP.get(options, (result) => {
        return callback(result);
    });
}

export function  setTokenToRedis(body,accesskey,callback) {

    const options = {
        host: 'localhost',
        port: 9000,
        path: '/api/v1/infrastructure/redis/' ,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length':JSON.stringify(body).length,
            authorization:accesskey
        }
    };

    HTTP.post(options ,body,(result) => {
        return callback(result);
    });
}