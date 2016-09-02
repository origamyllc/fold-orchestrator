/**
 * Created by prashun on 8/15/16.
 */
"use strict";

import { responses ,$logger } from '../../../cut/index';
import * as orchestrator_fascade from '../orchestrator/jwt.orchestrator.fascade';
const  jwt = require('jsonwebtoken');

var request =  null;
export function get_jwt_token(req,res){
    $logger.info("getting JET token ");
    initialize_pipe.call(initialize_pipe,req,res);
}

const initialize_pipe = function (req,res) {
    return   new Promise(() => {
        const access_key = req.headers.authorization ;
        get_jwt_token_by_access_token(  access_key ).then( (jwt_token) => {
             res.setHeader("authorization",  jwt_token.response.value);
             $logger.info("get_jwt_token::got JWT token and set header ");
             responses.sendSuccessResponse(res, {"message": "authorized"});
        }).catch( () => {
             $logger.error("get_jwt_token::can not get JWT token ");
             responses.send_unauthorized_user_error(req, res);
        });
    });
}

function  get_jwt_token_by_access_token( access_key  ){
    return   new Promise((resolve) => {
        var error = { error : "can not get jwt token by access token " }
        orchestrator_fascade.get_jwt_token_by_access_token(access_key).then((jwt_token) => {
            $logger.info('get_jwt_token::got JWT token');
            resolve(jwt_token);
        }).catch(() => {
            $logger.error('get_jwt_token::'+error.error);
            resolve(error);
        });
    });
}

