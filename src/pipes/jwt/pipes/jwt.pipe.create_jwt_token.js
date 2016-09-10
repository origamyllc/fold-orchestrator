"use strict";

import { responses } from 'hulk-cut';
import * as orchestrator_fascade from '../orchestrator/jwt.orchestrator.fascade';
const  jwt = require('jsonwebtoken');
let $logger = null;

export function create_jwt_token(req,res){
    $logger = req.log;
    $logger.info("entering create_jwt_token ");
    initialize_pipe.call(initialize_pipe,req,res);
}

const initialize_pipe  = function  (req,res){
            $logger.info("create_jwt_token::initialize_pipe :: creating jwt token ");
             get_user_info_by_name(req, res )
            .then( get_role_by_name )
            .then( (jwt_token) => {
                     const access_key = req.headers.authorization ;
                     $logger.info("create_jwt_token :: initialize_pipe :: creating jwt token for access key " + access_key );
                     if(access_key && access_key !== '') {
                         handleResponse ( access_key, jwt_token , req, res);
                     }
                     else {
                          $logger.error("create_jwt_token :: initialize_pipe :: creating jwt token for access key " + access_key + "failed!" );
                         responses.send_bad_implementation_response(res, {
                             message: 'JWT Not created',
                             details: "access token empty or null "
                         });
                     }
                });
}

function handleResponse (access_key, jwt_token , res){
    save_token(access_key, jwt_token).then((isSaved) => {
        if (isSaved) {
            $logger.info("create_jwt_token::jwt token set in header and saved");
            res.setHeader("authorization", jwt_token.response.value);
            res.status(200).send({"message": "authorized"});
        }
        else {
            $logger.error("create_jwt_token::can not create  JWT token ");
            responses.send_bad_implementation_response(res, {
                message: 'JWT Not created',
                details: "JWT Token already exists for the given access token "
            });
        }
    }).catch(() => {
        $logger.error("create_jwt_token::can not create  JWT token ");
        responses.send_bad_implementation_response(res, {
            message: 'JWT Not created',
            details: "JWT Token already exists for the given access token "
        });
    });
}

function get_user_info_by_name(req) {
    return  new Promise( (resolve) => {
        let jwt_object = {};
        orchestrator_fascade.get_user_by_name(req.body.username).then((user) => {
            $logger.info("create_jwt_token:: get_user_info_by_name :: sucessfully got user info for user " + req.body.username );
            $logger.info("create_jwt_token:: get_user_info_by_name :: creating jwt object");
            if (user) {
                jwt_object.userId = user.docs[0]._id;
                jwt_object.username = user.docs[0].username;
                jwt_object.roles = user.docs[0].roles;
            }
            resolve(jwt_object);
        });
    });
}

const get_role_by_name = function (jwt_object) {
    return  new Promise( (resolve) => {
        orchestrator_fascade.get_role_by_role_name(jwt_object.roles).then((role) => {
            $logger.info("create_jwt_token:: get_role_by_name :: sucessfully got role info for role " + jwt_object.roles );
            jwt_object.claimsId = role.docs[0].claims;
            let token =jwt.sign(jwt_object,'hhhhhh');
            $logger.info("create_jwt_token:: get_role_by_name :: created jwt object");
            resolve(token);
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
                $logger.error("create_jwt_token::key already exists" );
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
        orchestrator_fascade.set_token_in_cache(obj).then(() => {
            $logger.info("create_jwt_token::saved jwt token for access key" );
            resolve(true);
        }).catch((err) => {
            $logger.ierror("create_jwt_token::failed to save jwt token for access key" );
           reject(false);
        });
    });
}
