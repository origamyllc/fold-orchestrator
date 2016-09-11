/**
 * Created by prashun on 8/15/16.
 */
"use strict";

import { responses  } from 'hulk-cut';
import * as orchestrator_fascade from '../orchestrator/jwt.orchestrator.fascade';
const  jwt = require('jsonwebtoken');

let $logger = null;

export function get_jwt_token(req,res){
    $logger = req.log;
    $logger.debug("getting JET token ");
    initialize_pipe.call(initialize_pipe,req,res);
}

const initialize_pipe = function (req,res) {
    return   new Promise(() => {
        const access_key = req.headers.authorization ;
        get_jwt_token_by_access_token(  access_key ).then( (jwt_token) => {
             res.setHeader("authorization",  jwt_token.response.value);
             res.status(200).send({"message":"jwt returned","status":200});
             $logger.info("get_jwt_token::got JWT token and set header ");
        }).catch( () => {
             $logger.error("get_jwt_token::can not get JWT token ");
             responses.send_unauthorized_error(res, {
                 details : { message:"can not get JWT token" } ,
                 statusCode:11000
             });
        });
    });

}

function  get_jwt_token_by_access_token( access_key  ){
    return   new Promise((resolve) => {
        orchestrator_fascade.get_jwt_token_by_access_token(access_key).then((jwt_token) => {
            resolve(jwt_token);
            $logger.info('get_jwt_token::got JWT token for access token ' + access_key );
        }).catch(() => {
            var error =  "can not get jwt token for access token " + access_key ;
            $logger.error('get_jwt_token::'+ error );
            resolve({error:error});
        });
    });
}

