'use strict';

import { createCustomError } from './cut.components.errors.errorFactory';

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
            database: "Mongo"
        }
    };
    return createCustomError( settings , MongooseModelDoesNotExist ) ;
}


export function ResourceDoesNotExist(){
    let settings = {
        status : 404,
        errorCode :  2200,
        message : "Resource does not exist",
        type : "Resource misssing "
    };
    return createCustomError( settings , ResourceDoesNotExist ) ;
}
