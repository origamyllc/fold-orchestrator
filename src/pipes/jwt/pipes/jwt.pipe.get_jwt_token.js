/**
 * Created by prashun on 8/15/16.
 */
"use strict";

import { responses } from '../../../cut/index';
import * as orchestrator_fascade from '../orchestrator/jwt.orchestrator.fascade';
const  jwt = require('jsonwebtoken');

export function get_jwt_token(req,res){
    initialize_pipe.call(initialize_pipe,req,res);
}

const initialize_pipe = function (req,res) {
    return   new Promise(() => {
        req.log.info("getting jwt token by access token");
        const access_key = req.headers.authorization ;
        get_jwt_token_by_access_token(  access_key ).then( (jwt_token) => {
                 res.setHeader("authorization",  jwt_token.response.value);
                 responses.sendSuccessResponse(res, {"message": "authorized"});
        }).catch( () => {
             req.log.error("can not get JWT token ")
             responses.send_unauthorized_user_error(req, res);
        });
    });
}

function  get_jwt_token_by_access_token( access_key  ){
    return   new Promise((resolve) => {
        var error = { error : "can not get jwt token by access token " }
        orchestrator_fascade.get_jwt_token_by_access_token(access_key).then((jwt_token) => {
                resolve(jwt_token);
        }).catch(() => {
            resolve(error);
        });
    });
}