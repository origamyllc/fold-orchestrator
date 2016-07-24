
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

