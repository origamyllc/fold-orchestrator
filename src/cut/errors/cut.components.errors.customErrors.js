'use strict';

import { createCustomError } from './cut.components.errors.errorFactory';

if (process.env.NODE_ENV === 'development') {
   const  conf = require('../config/env/cut.config.dev');
}

export function InternalServerError(settings){
    settings.status = 500;
    return createCustomError( settings , InternalServerError ) ;
}

export function MongooseModelDoesNotExist(){
    let settings = {
        status : 422,
        errorCode :  2200,
        message : "Mongoose model does not exist ",
        type : "Database Error",
        details : {
            database: "Mongo",
            connectionUrl: conf.mongo.uri
        }
    };
    return createCustomError( settings , MongooseModelDoesNotExist ) ;
}
