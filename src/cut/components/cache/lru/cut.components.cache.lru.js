'use strict';

const LRUCache = require('lru-cache');
const cache = LRUCache(1000);

export function get(key, cb) {
    cb(cache.get(key));
}

export function set(key, value) {
    cache.set(key, value);
}

export function update(key, value) {
    let result = cache.get(key);
    if (result && result.indexOf(value) === -1) {
        cache.set(key, value);
    }
}

export function del(key) {
    cache.del(key);
}

export function clear() {
    cache.reset();
}

export function hasKey(key) {
    return cache.has(key);
}

export function keys(){
    return  cache.keys();
}

