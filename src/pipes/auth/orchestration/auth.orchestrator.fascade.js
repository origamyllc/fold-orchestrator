
import * as LoginHelper from './auth.orchestrator.helper';
const Promise = require("bluebird");
const crypto = require('crypto');

export function getUserByNameAsynchronously(name) {
    return new Promise((resolve) => {
        LoginHelper.getUserByName(name, (result) => {
            resolve(result);
        });
    });
}

export function loginAsynchronously(req) {
    return new Promise((resolve) => {
        LoginHelper.login(req.body, (result) => {
            resolve(result);
        });
    });
}

export function getTokenByUserId(id){
    return new Promise((resolve) => {
        LoginHelper.getTokenByUserId(id, (result) => {
            resolve(result);
        });
    });
}

export function getJWTTokenByAccessToken(accesskey){
    return new Promise((resolve) => {
        LoginHelper.getJWTTokenByAccessToken(accesskey, (result) => {
            resolve(result);
        });
    });
}

export function deleteAccessToken(accesskey){
    return new Promise((resolve) => {
        LoginHelper.deleteAccessToken(accesskey, (result) => {
            resolve(result);
        });
    });
}

export function setTokenToRedis(body){
    return new Promise((resolve) => {
        LoginHelper.setTokenToRedis(body, (result) => {
            resolve(result);
        });
    });
}

export function getAccessToken(token){
    return new Promise((resolve) => {
        LoginHelper.getAccessToken(token,(result) => {
            resolve(result);
        });
    });
}

export function  updateAccessToken(userId,body){
    return new Promise((resolve) => {
        LoginHelper.updateAccessToken(userId,body,(result) => {
            resolve(result);
        });
    });
}