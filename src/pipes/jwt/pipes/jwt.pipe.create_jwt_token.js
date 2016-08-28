"use strict";

import { responses,LRU,log } from '../../../cut/index';
import * as orchestrator_fascade from '../orchestrator/jwt.orchestrator.fascade';
const  jwt = require('jsonwebtoken');

export function create_jwt_token(req,res){
    initialize_pipe.call(initialize_pipe,req,res);
}

const initialize_pipe  = function  (req,res){
             get_user_info_by_name(req, res )
            .then( get_role_by_name )
            .then( (jwt_token) => {
                     const access_key = req.headers.authorization ;
                    save_token(access_key ,jwt_token).then((isSaved) => {
                        if(isSaved){
                            res.setHeader("authorization",  jwt_token.response.value);
                            responses.sendSuccessResponse(res, {"message": "authorized"});
                        }
                        else{
                            req.log.error("can not create  JWT token ");
                            responses.sendErrorResponse(res ,{ message:'JWT Not created' ,details:"JWT Token already exists for the given access token "});
                        }
                    }).catch(() => {
                        req.log.error("can not create  JWT token ");
                        responses.sendErrorResponse(res ,{ message:'JWT Not created',details:"JWT Token already exists for the given access token " });
                    });
                });
}

function get_user_info_by_name(req) {
    return  new Promise( (resolve) => {
        let jwt_object = {};
        log.info( " Getting  user info for user:: " + JSON.stringify( req.body ));
        orchestrator_fascade.get_user_by_name(req.body.username).then((user) => {
           log.info( "Got user info::" + JSON.stringify(user) );
            if (user) {
                jwt_object.userId = user.docs[0]._id;
                jwt_object.username = user.docs[0].username;
                jwt_object.roles = user.docs[0].roles;
            }
            resolve(jwt_object);
        }).catch(() => {
            log.error("Can not get user by user name ");
        });
    });
}

const get_role_by_name = function (jwt_object) {
    return  new Promise( (resolve) => {
        log.info(" Getting role info by name::"+ jwt_object.roles );
        orchestrator_fascade.get_role_by_role_name(jwt_object.roles).then((role) => {
            log.info( "Got role info::" + JSON.stringify(role) );
            jwt_object.claimsId = role.docs[0].claims;
            resolve(jwt.sign(jwt_object,'hhhhhh'));
        }).catch(() => {
            log.error("Can not get role by user name::" +  jwt_object.username );
        });
    });
}

function save_token(access_key ,jwt_token){
    return new Promise((resolve) => {
        orchestrator_fascade.get_jwt_token_by_access_token(access_key).then((result) => {
            if(result.status === 500){
                setKey(access_key,jwt_token)
            }
            else {
                log.error("Token already exists");
                resolve(false);
            }
        }).catch(() => {
            setKey(access_key,jwt_token)
        });
    });
}

function setKey(access_key,jwt_token){
    return new Promise((resolve,reject) => {
        var obj = { key: access_key, value :"Bearer "+ jwt_token };
        log.info(" Setting jwt token as key for access token "+ access_key );
        orchestrator_fascade.set_token_in_cache(obj).then(() => {
            resolve(true);
        }).catch((err) => {
           reject(false);
        });
    });
}