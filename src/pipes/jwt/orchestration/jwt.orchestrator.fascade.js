
import * as MandalaHelper from './jwt.orchestrator.helper';
const Promise = require("bluebird");
const crypto = require('crypto');

export function getAccessToken(body) {
    return new Promise((resolve) => {
        MandalaHelper.getAccessToken(body, (result) => {
            resolve(result);
        });
    });
}

export function getUserByName(name,accesskey) {
    return new Promise((resolve) => {
        MandalaHelper.getUserByName(name,accesskey, (result) => {
            resolve(result);
        });
    });
}


export function getRoleByName (name,accesskey) {
    return new Promise((resolve) => {
        MandalaHelper.getRoleByName(name,accesskey, (result) => {
            resolve(result);
        });
    });
}

export function getJWTTokenByAccessToken(accesskey){
    return new Promise((resolve) => {
        MandalaHelper.getJWTTokenByAccessToken(accesskey, (result) => {
            resolve(result);
        });
    });
}

export function  setTokenToRedis(body,accesskey){
    return new Promise((resolve) => {
        MandalaHelper.setTokenToRedis(body, accesskey,(result) => {
            resolve(result);
        });
    });

}