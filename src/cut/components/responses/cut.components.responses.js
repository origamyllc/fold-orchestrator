'use strict';

const _ = require('lodash');
import { logger } from '../../middleware/logger/cut.middleware.bunyan';
import * as errors from '../../errors/cut.components.errors.customErrors';
import Promise from 'bluebird';


function getSucessMessage(obj){
    if(! obj.hasOwnProperty('message')){
        return 'HTTP OK!';
    } else {
        return obj.message;
    }
}

function getSucessResponse(obj){
    if(! obj.hasOwnProperty('response')){
        return "SUCCESS!";
    } else {
        return obj.response;
    }
}

export function sendResponse(res,obj ){
    if(obj.response) {
        delete obj.response.message;
        res.json(obj.response);
    } else {
        res.json(obj);
    }

}

export function  sendSuccess(obj){
    return new Promise( (resolve) => {
        resolve({ response:getSucessResponse(obj),status: 200 } );
    });
}


 function  sendError(obj){
    let error = errors.InternalServerError({
        message:obj.message ,
        errorCode:obj.errorCode ,
        type:obj.type,
        details: obj.details
    });

    return new Promise( (resolve) => {
        resolve( error );
    });
}

export function sendSuccessResponse(res ,obj){
    logger.info({ response:getSucessResponse(obj) , status: 200 });
    sendSuccess(obj).then((response) => {
        res.status(200).json(response)
    });

}

export function sendErrorResponse(res ,obj){
    sendError(obj).then((error) => {
        res.status(500).json(error)
    });
}

