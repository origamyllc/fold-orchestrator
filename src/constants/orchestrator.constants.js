
import { config } from  '../config.js'

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

export const AUHTENTICATION_PATH = config.orchestrator.paths.authenticate;
export const REDIS_PATH = config.backend.paths.redis ;

export const POST = 'POST';
export const GET ='GET';

export const CONTENT_TYPE_JSON = 'application/json';
export const CONTENT_TYPE_XML = 'application/x-www-form-urlencoded';