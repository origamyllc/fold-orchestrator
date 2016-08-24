
import * as jwt_token_helper from './jwt.orchestrator.helper';
const Promise = require("bluebird");

export function get_access_token(body) {
    return new Promise((resolve) => {
        jwt_token_helper.get_access_token(body, (result) => {
            resolve(result);
        });
    });
}

export function get_user_by_name(user_name) {
    return new Promise((resolve) => {
        jwt_token_helper.get_user_by_name(user_name,(result) => {
            resolve(result);
        });
    });
}


export function get_role_by_role_name (role_name) {
    return new Promise((resolve) => {
        jwt_token_helper.get_role_by_role_name(role_name,(result) => {
            resolve(result);
        });
    });
}

export function get_jwt_token_by_access_token(access_key){
    return new Promise((resolve) => {
        jwt_token_helper.get_jwt_token_by_access_token(access_key, (result) => {
            resolve(result);
        });
    });
}

export function  set_token_in_cache(body){
    return new Promise((resolve) => {
        jwt_token_helper.set_token_in_cache(body,(result) => {
            resolve(result);
        });
    });

}