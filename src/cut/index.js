/**
 * Created by prashun on 6/10/16.
 */

import { app,router } from './middleware/cut.express';

const lru = require('./components/cache/lru/cut.components.cache.lru');
const mongo = require('./components/db/mongo/cut.components.db.mongo');
const redis = require('./components/db/redis/cut.components.redis');
const http = require('./components/http/cut.components.http');
const rabbit = require('./components/rabbit/cut.components.rabbitmq');
const response = require('./components/responses/cut.components.responses');
const  authentications = require('./middleware/security/cut.security.utils');
const models = require('./components/db/mongo/cut.components.db.mongo.model');
// ROUTERS
export const cranberryRouter = router;

// MODULES
export const LRU = lru;
export const MONGO = mongo;
export const RABBIT = rabbit;
export const REDIS = redis;

// HTTP
export const HTTP = http;

// UTILS
export const responses = response;
export const authentication =  authentications ;
export const Collections = models;

