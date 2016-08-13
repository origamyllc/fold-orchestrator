
import * as login_helper from './auth.orchestrator.helper';
const Promise = require("bluebird");


export function get_user_by_name(user_name) {
    return new Promise((resolve) => {
        login_helper.get_user_by_name(user_name, (result) => {
            resolve(result);
        });
    });
}

export function login_user(req) {
    return new Promise((resolve) => {
        login_helper.login_user(req.body, (result) => {
            resolve(result);
        });
    });
}

export function get_user_token_by_id(user_id){
    return new Promise((resolve) => {
        login_helper.get_user_token_by_id(user_id, (result) => {
            resolve(result);
        });
    });
}

export function get_jwt_by_access_token(access_key){
    return new Promise((resolve) => {
        login_helper.get_jwt_by_access_token(access_key, (result) => {
            resolve(result);
        });
    });
}

export function delete_access_token(access_key){
    return new Promise((resolve) => {
        login_helper.delete_access_token(access_key, (result) => {
            resolve(result);
        });
    });
}

export function set_token_in_cache(body){
    return new Promise((resolve) => {
        login_helper.set_token_in_cache(body, (result) => {
            resolve(result);
        });
    });
}

export function get_access_token(token){
    return new Promise((resolve) => {
        login_helper.get_access_token(token,(result) => {
            resolve(result);
        });
    });
}

export function  update_access_token(user_id,body){
    return new Promise((resolve) => {
        login_helper.update_access_token(user_id,body,(result) => {
            resolve(result);
        });
    });
}