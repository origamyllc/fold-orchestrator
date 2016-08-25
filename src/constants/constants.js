
import { devConfig } from  '../config/env/dev.js'
import { integrationConfig } from  '../config/env/integration.js'
import { productionConfig } from  '../config/env/prod.js'
import { qaConfig } from  '../config/env/qa.js'
import { stressConfig } from  '../config/env/stress.js'

let config = devConfig;

if ( process.env.NODE_ENV === 'development') {
    config = devConfig;
}

if ( process.env.NODE_ENV === 'integration' ){
    config = integrationConfig;
}

if ( process.env.NODE_ENV === 'production' ){
    config = productionConfig;
}

if ( process.env.NODE_ENV === 'qa' ){
    config = qaConfig ;
}

if ( process.env.NODE_ENV === 'stress' ){
    config = stressConfig;
}

export const ACCESS_KEY =  config.microservices.accsesskey;

export const MICROSERVICES_PORT = config.microservices.port;
export const ORCHESTRATOR_PORT = config.orchestrator.port;
export const BACKEND_PORT = config.backend.port;

export const ORCHESTRATOR_HOST = config.orchestrator.host;
export const MICROSERVICES_HOST = config.microservices.host;
export const BACKEND_HOST = config.backend.host;

export const OAUTH_PATH = config.microservices.paths.oauth;
export const USER_PATH =  config.microservices.paths.user;
export const TOKEN_PATH = config.microservices.paths.token;
export const ROLE_PATH = config.microservices.paths.role;
export const CLAIM_PATH = config.microservices.paths.claim;

export const LRU_OPTIONS = config.lru.options;
export const AUHTENTICATION_PATH = config.orchestrator.paths.authenticate;
export const REDIS_PATH = config.backend.paths.redis ;


export const POST = 'POST';
export const GET ='GET';
export const DELETE ='DELETE';
export const PUT ='PUT';

export const CONTENT_TYPE_JSON = 'application/json';
export const CONTENT_TYPE_XML = 'application/x-www-form-urlencoded';

export const settings = config;