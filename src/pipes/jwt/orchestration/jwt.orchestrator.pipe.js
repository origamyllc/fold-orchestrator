"use strict";

import { responses } from '../../../cut/index';
import * as OrchestratorFascade from './jwt.orchestrator.fascade';
const  jwt = require('jsonwebtoken');

// TODO : add logging

export function getJWToken(req,res){
    let jwtObj = {};
    OrchestratorFascade.getAccessToken(req.body).then((result) => {
        const accesskey  = result;
        if(accesskey) {
            OrchestratorFascade.getUserByName(req.body.username, accesskey).then((user) => {
                if (user) {
                    jwtObj.userId = user.docs[0]._id;
                    jwtObj.username = user.docs[0].username;
                    jwtObj.roles = user.docs[0].roles;
                }
                OrchestratorFascade.getRoleByName(jwtObj.roles, accesskey).then((roles) => {
                    jwtObj.claims = roles.docs[0].claims;
                    OrchestratorFascade.getTokenFromRedis(jwtObj.username,accesskey).then((token) =>{
                        if(token.status === 500){
                            var obj = { key: accesskey, value :jwt.sign(jwtObj, 'shhhhh')};
                            OrchestratorFascade.setTokenToRedis(obj,accesskey);
                        }
                    });
                    res.setHeader("authorization",   jwt.sign(jwtObj, 'shhhhh'));
                    responses.sendResponse(res, {"message": "authorized"})
                });
            });
        } else {
            const error = {"message": "unauthorized access"}
            res.status(401).json(error)
        }
    });
}


