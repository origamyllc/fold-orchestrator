/**
 * Created by prashun on 8/15/16.
 */

import { responses } from '../../../cut/index';
import * as orchestrator_fascade from '../orchestrator/jwt.orchestrator.fascade';
const  jwt = require('jsonwebtoken');
const uuid = require('node-uuid');
let $logger = null;

export function verify_jwt_token(req,res){
     $logger = req.log;
    initialize_pipe.call(initialize_pipe,req,res);
}

const initialize_pipe = function (req,res) {
    $logger.info("verifying  JWT  token for user");
    let token = req.headers.authorization.split(" ")[1] ;
    jwt.verify(token, 'hhhhhh', (err, decoded_token) => {
        if(err){
            responses.send_bad_implementation_response(res, {
                message: err.message,
                details: "access token empty or null "
            });
        }
        get_claims_by_id(res,decoded_token);
    });
}

function get_claims_by_id(res,token){

    $logger.info("verify_jwt_token::get claims by id");
    if(token) {
        orchestrator_fascade.get_claims_by_id(token.claimsId).then((claim) => {

           $logger.info("verify_jwt_token::got claims by id");

            let permissions = {};
            let newToken = uuid.v4();

            delete token.claimsId;
            permissions.devices = claim.docs[0]["devices"];
            permissions.api_white_list = claim.docs[0]["api_white_list"];
            permissions.applications = claim.docs[0]["applications"];

            token.permissions = permissions;
            $logger.info("verify_jwt_token::adding permissions to the token ");

            res.setHeader("x-authorization-header", "Bearer " + jwt.sign(token, 'hhhhhh'));
            res.setHeader("x-transaction-id", newToken);

            $logger.info("verify_jwt_token::set token as header ");
            res.status(200).send({"message": "authorized" , "status":200 })
        }).catch(() => {
            var error = "JWT token verification failed no claims exist" ;
            $logger.error(error);
            responses.send_bad_implementation_response(res, {
                message: error,
                details: "access token empty or null "
            });
        });
    }
}