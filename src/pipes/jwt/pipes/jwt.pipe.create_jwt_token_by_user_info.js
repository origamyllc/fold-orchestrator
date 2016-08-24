"use strict";

import { responses,LRU } from '../../../cut/index';
import * as orchestrator_fascade from '../orchestrator/jwt.orchestrator.fascade';
const  jwt = require('jsonwebtoken');

export function get_jwt_token_by_user(req,res){
    initialize_pipe.call(initialize_pipe,req,res);
}

const initialize_pipe = function (req,res) {
    req.log.info("creating JWT  token for user");
    const access_key = req.headers.authorization ;
        create_jwt_token (req,res)
            .then(( jwt_token ) => {
                save_token(req, access_key ,jwt_token).then((isSaved) => {
                    if(isSaved){
                        res.setHeader("authorization",  jwt_token.response.value);
                        responses.sendSuccessResponse(res, {"message": "authorized"});
                    }
                    else{
                        req.log.error("can not create  JWT token ");
                        responses.send_response(res ,{ error:'can not create  JWT token' });
                    }
                }).catch(() => {
                    req.log.error("can not create  JWT token ");
                    responses.send_response(res ,{ error:'can not create  JWT token' });
                });
            });
}

function create_jwt_token (req,res){
    return  new Promise( (resolve) => {
        resolve(get_user_by_name(req, res ));
    });
}

function get_user_by_name(req, res) {
    return  new Promise( (resolve) => {
        let jwt_object = {};
        req.log.info( "getting  user for username " + req.body.username);
        orchestrator_fascade.get_user_by_name(req.body.username).then((user) => {
            if (user) {
                jwt_object.userId = user.docs[0]._id;
                jwt_object.username = user.docs[0].username;
                jwt_object.roles = user.docs[0].roles;
            }
            resolve(get_role_by_user_name(req, res, jwt_object));
        }).catch(() => {
            req.log.error("can not get user by user name ")
            responses.send_unauthorized_user_error(req, res);
        });
    });
}

function get_role_by_user_name(req, res, jwt_object) {
    return  new Promise( (resolve) => {
        req.log.info(" getting role info  by role ");
        orchestrator_fascade.get_role_by_role_name(jwt_object.roles).then((role) => {
            jwt_object.claimsId = role.docs[0].claims;
            resolve(jwt.sign(jwt_object,'hhhhhh'));
        }).catch(() => {
            req.log.error("can not get role by user name ")
            responses.send_unauthorized_user_error(req, res);
        });
    });
}

function save_token(req, access_key ,jwt_token){
    return new Promise((resolve,reject) => {
        orchestrator_fascade.get_jwt_token_by_access_token(access_key).then((jwt_token) => {
             // do nothing
            req.log.info("token already exists");
            resolve(false);
        }).catch((err) => {
            var obj = { key: access_key, value :"Bearer "+ jwt_token };
            orchestrator_fascade.set_token_in_cache(obj).then((result) => {
                resolve(true);
            }).catch((err) => {
                reject(false);
            });
        });
    });
}

