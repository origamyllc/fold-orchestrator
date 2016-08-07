"use strict";

import { responses,LRU } from '../../../cut/index';
import * as OrchestratorFascade from './jwt.orchestrator.fascade';
const  jwt = require('jsonwebtoken');

export function getJWToken(req,res){
    let jwtObj = {};
    req.log.info({message:"getting access token for user"});
    OrchestratorFascade.getAccessToken(req.body).then((result) => {
        const accesskey  = result;
        if(accesskey) {
            req.log.info({message:"getting  user for username " + req.body.username});
            OrchestratorFascade.getUserByName(req.body.username, accesskey).then((user) => {
                if (user) {
                    jwtObj.userId = user.docs[0]._id;
                    jwtObj.username = user.docs[0].username;
                    jwtObj.roles = user.docs[0].roles;
                }
                req.log.info({message:"getting  role for " + jwtObj.roles[0]});
                OrchestratorFascade.getRoleByName(jwtObj.roles, accesskey).then((roles) => {
                    jwtObj.claims = roles.docs[0].claims;
                    OrchestratorFascade.getJWTTokenByAccessToken(accesskey).then((token) =>{
                        LRU.set(accesskey);
                        if(token.status === 500){
                            req.log.info({message:"adding key to cache.." });
                            // TODO: add pem key to secure the JWT
                            var obj = { key: accesskey, value :jwt.sign(jwtObj, 'shhhhh')};
                            OrchestratorFascade.setTokenToRedis(obj,accesskey);
                        }
                    });
                    res.setHeader("authorization",   jwt.sign(jwtObj, 'shhhhh'));
                    responses.sendResponse(res, {"message": "authorized"})
                });
            });
        } else {
            const error = { "message": "unauthorized access"}
            req.log.error({ message:err });
            res.status(401).json(error)
        }
    });
}


