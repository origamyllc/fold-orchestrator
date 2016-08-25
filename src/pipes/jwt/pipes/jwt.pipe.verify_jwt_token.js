/**
 * Created by prashun on 8/15/16.
 */

import { responses,LRU } from '../../../cut/index';
import * as orchestrator_fascade from '../orchestrator/jwt.orchestrator.fascade';
const  jwt = require('jsonwebtoken');

export function verify_jwt_token(req,res){
    initialize_pipe.call(initialize_pipe,req,res);
}

const initialize_pipe = function (req,res) {
    req.log.info("verifying  JWT  token for user");
    let token = req.headers.authorization.split(" ")[1] ;
    jwt.verify(token, 'hhhhhh', (err, decoded_token) => {
        if(err){
            responses.sendErrorResponse(res ,{
                message:err.message ,
                errorCode:5002 ,
                type:err.name
            });
        }

        orchestrator_fascade.get_claims_by_id(decoded_token.claimsId).then((claim) => {

            let permissions = {};

            delete decoded_token.claimsId;
            permissions.devices = claim.docs[0]["devices"];
            permissions.api_white_list = claim.docs[0]["api_white_list"];
            permissions.applications = claim.docs[0]["applications"];

            decoded_token.permissions =  permissions;

            res.setHeader("x-authorization-header","Bearer " + jwt.sign( decoded_token,'hhhhhh'));
            responses.sendSuccessResponse(res, {"message": "authorized"});
        }).catch(() => {
            req.log.error("JWT token verification failed no claims exist");
            responses.sendErrorResponse(res ,{ message:'JWT token verification failed no claims exist',details:"JWT verification failed" });
        });
    });
}
