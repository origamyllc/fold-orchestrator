"use strict";

import { responses,LRU } from '../../../cut/index';
import * as orchestrator_fascade from './jwt.orchestrator.fascade';
const  jwt = require('jsonwebtoken');

export function get_jwt_token(req,res){
    let jwt_object = {};
    req.log.info({message:"getting access token for user"});
    orchestrator_fascade.get_access_token(req.body).then((access_token) => {
        const access_key  = access_token;
        if(access_key) {
            req.log.info({message:"getting  user for username " + req.body.username});
            orchestrator_fascade.get_user_by_name(req.body.username).then((user) => {
                if (user) {
                    jwt_object.userId = user.docs[0]._id;
                    jwt_object.username = user.docs[0].username;
                    jwt_object.roles = user.docs[0].roles;
                }
                get_role_by_user_name(req, res, access_key, jwt_object);
            });
        } else {
            send_unauthorized_user_error(req, res);
        }
    });
}

function send_unauthorized_user_error(req, res) {
    const error = {"message": "unauthorized access"}
    req.log.error({message: error});
    res.status(401).json(error)
}

function get_role_by_user_name(req, res, access_key, jwt_object) {
    orchestrator_fascade.get_role_by_user_name(jwt_object.roles).then((role) => {
        req.log.info({"message": "getting role by user name"});
        jwt_object.claims = role.docs[0].claims;
        get_jwt_token_by_access_token(req, res, access_key, jwt_object);
    }).catch(() => {
        req.log.error({"message": "can not get role by user name "})
        send_unauthorized_user_error(req, res);
    });
}

function get_jwt_token_by_access_token(req, res,access_key,jwt_object){
    req.log.info({ "message": "getting jwt token by access token"});
    orchestrator_fascade.get_jwt_token_by_access_token(access_key).then((jwt_token) => {
        LRU.set(access_key,jwt.sign(jwt_object, 'shhhhh'));
        if(jwt_token.status === 500){
            req.log.debug({message:"adding key to cache.." });
            var obj = { key: access_key, value :jwt.sign(jwt_object, 'shhhhh') };
            orchestrator_fascade.set_token_in_cache(obj);
        }
        res.setHeader("authorization",   jwt.sign(jwt_object, 'shhhhh'));
        responses.sendSuccessResponse(res, {"message": "authorized"});
    }).catch(() => {
        req.log.error({ "message": "jwt token does not exist for the given access token"});
        send_unauthorized_user_error(req, res);
    });
}