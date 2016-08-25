/**
 * Created by prashun on 7/24/16.
 */
export  const integrationConfig = {
    NODE_ENV:'integration',
    orchestrator:{
        host: process.env.ORCHESTRATOR_HOST || 'integration',
        port: process.env.ORCHESTRATOR_PORT || 9200,
        paths: {
            authenticate : '/api/v1/authenticate'
        }
    },
    microservices:{
        host:process.env.MICROSERVICES_HOST  || 'integration',
        port: process.env.MICROSERVICES_PORT || 9100,
        accsesskey : process.env.ACCESS_KEY || 'Basic jghsdkgfuyeuyertwgdhgjfhjgjkgklugtrgdhgd',
        paths:{
            oauth:process.env.OAUTH_MICROSERVICE_PATH || '/api/oauth2/v1/login',
            token:process.env.TOKEN_MICROSERVICE_PATH || '/api/v1/tokens/',
            user:process.env.USER_MICROSERVICE_PATH   || '/api/v1/user/username/',
            role:process.env.ROLE_MICROSERVICE_PATH   || '/api/v1/roles/name/',
            claim: process.env.ROLE_MICROSERVICE_PATH || '/api/v1/claims/'
        }
    },
    backend:{
        host: process.env.BACKEND_SERVICES_HOST || 'integration',
        port: process.env.BACKEND_SERVICES_PORT || 9000,
        paths: {
            redis:  process.env.REDIS_PATH || '/api/v1/infrastructure/redis/'
        }
    },
    lru: {
        options: {
            max: 500,
            maxAge: 1000 * 60 * 60
        }
    }
}
