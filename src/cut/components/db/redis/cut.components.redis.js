'use strict';

const redis = require("redis");
import * as CONSTANTS from '../../../../constants/constants';
let client = redis.createClient(CONSTANTS.REDIS_SERVER_CONF);

import Promise from 'bluebird';

export function get(key) {
    return new Promise((resolve) => {
        client.get(key, function (err, reply) {
            resolve(reply);
        });
    });
}

export function set(key, value) {
    return new Promise((resolve) => {
        client.set(key, value);
        resolve("ok")
    });
}

/*
 * client.hset([ 'tests', 'slurpee', 'orange' ]);
 *
 */

export function hset(string) {
    return new Promise((resolve) => {
        let set = string.split(",");
        client.hset(set, redis.print);
        resolve(set);
    });
}


export function hget(key) {
    return new Promise((resolve) => {
        client.hkeys(key, function (err, reply) {
            resolve(reply)
        });
    });
}

export function del(key) {
    return new Promise((resolve) => {
        client.del(key);
        resolve(key)
    });
}

export function clear() {
    return new Promise((resolve) => {
        client.flushdb();
        resolve(true)
    });
}

export function size() {
    return new Promise((resolve) => {
        resolve(client.dbsize())
    });
}

export function publish(channel, message) {
    return new Promise((resolve) => {
        client.on("message", function (channel, message) {
            resolve({channel: channel, message: message})
        });
    });
}
export function subscribe() {
    return new Promise((resolve) => {
        client.publish(channel, message, function () {
            resolve({channel: channel, message: message})
        });
    });
}
