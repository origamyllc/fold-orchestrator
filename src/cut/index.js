/**
 * Created by prashun on 6/10/16.
 */

import { app,router } from './middleware/cut.express';

const lru = require('./components/cache/lru/cut.components.cache.lru');
const http = require('./components/http/cut.components.http');
const rabbit = require('./components/rabbit/cut.components.rabbitmq');
const response = require('./components/responses/cut.components.responses');
const  authentications = require('./middleware/security/cut.security.utils');

const grunth  = require ('grunth');

// ROUTERS
export const cutRouter = router;

// MODULES
export const LRU = lru;

export const RABBIT = rabbit;


// HTTP
export const HTTP = http;
export const $logger = grunth.$logger;

// UTILS
export const responses = response;
export const authentication =  authentications ;

