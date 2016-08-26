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

export function send_response(res,obj ){
    if(obj.response) {
        delete obj.response.message;
        res.json(obj.response);
    } else {
        res.json(obj);
    }

}



function  sendError(obj){
    let error = null;

    if(obj.error === 'Resource Not Found'){
        error = errors.ResourceDoesNotExist({ message:"Resource Not Found" });
    } else {
        error = errors.InternalServerError({
            message:obj.message ,
            errorCode:obj.errorCode ,
            type:obj.type,
            details: obj.details
        });
    }

   return  new Promise( (resolve) => {
        resolve( error );
    });

}

export function sendSuccessResponse(res ,obj){
    logger.info({ response:getSucessResponse(obj) , status: 200 });
    let response = { response:getSucessResponse(obj),status: 200 }
        res.status(200).json(response)

}

export function sendErrorResponse(res ,obj){

    sendError(obj).then((error) => {
       if(obj.error === 'Resource Not Found'){
           res.status(404).json(error)
       }
        else{
           res.status(500).json(error)
       }
        return null;
    });

}

export function send_unauthorized_user_error(req, res) {
    const error = {"message": "unauthorized access"}
    req.log.error(error);
    res.status(401).json(error)
}
