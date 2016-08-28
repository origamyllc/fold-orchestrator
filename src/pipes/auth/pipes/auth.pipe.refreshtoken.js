/**
 * Created by prashun on 8/14/16.

import { responses,LRU } from '../../../cut/index';
import * as authentication_fascade from '../orchestrator/auth.orchestrator.fascade';
const uuid = require('node-uuid');

export function refresh_access_token(req, res) {
    let keys = LRU.keys();
    if(keys.length !== 0  && typeof keys !== "undefined"){
        refresh_tokens(req, res,keys);
    } else {
        req.log.error("refresh tokens failed !");
        responses.send_unauthorized_user_error(req, res);
    }
}

function refresh_tokens(req, res,keys) {
    for (let index in keys) {
        req.log.info("processing token::"+ keys[index]);
        authentication_fascade.get_jwt_by_access_token( keys[index]).then((jwt_token) => {
            req.log.info( "getting  JWT by access token");
            get_jwt_by_access_token(req, res,jwt_token,keys[index]);
        }).catch(() => {
            req.log.error( "can not get JWT by access token");
            responses.send_unauthorized_user_error(req, res);
        });
    }
}

function get_jwt_by_access_token(req, res,jwt_token,key) {
    if (jwt_token && jwt_token.response) {
        let token = jwt_token.response.value;
        authentication_fascade.delete_access_token(key).then(() => {
            req.log.info( "resetting token in the cache ");
            set_token_in_cache (req, res,key,token);
        }).catch(() => {
            req.log.error( "resetting token in the cache failed");
            responses.send_unauthorized_user_error(req, res);
        });
    }
}

function set_token_in_cache (req, res,key,token){
    let newToken = uuid.v4();
    var obj = { key: newToken, value: token };
    authentication_fascade.set_token_in_cache(obj, key).then( () => {
        req.log.info( "resetting token in the cache ");
        get_access_token(req, res,key,newToken );
    }).catch(() => {
        req.log.error( "resetting token in the cache failed");
        responses.send_unauthorized_user_error(req, res);
    });
}

function get_access_token(req, res,key,newToken){
    authentication_fascade.get_access_token(key).then((accessToken) => {
        req.log.info( "getting current access token ");
        update_access_token(req,res,accessToken,newToken );
    }).catch(() => {
        req.log.error( "can not get access token ");
        responses.send_unauthorized_user_error(req, res);
    });
}

function update_access_token(req,res,accessToken,newToken ) {
        authentication_fascade.update_access_token(accessToken.docs[0].userId,
            {userId: accessToken.docs[0].userId, accessToken: newToken})
        .then(() => {
                req.log.info( "token sucessfully updated  ");
            responses.sendSuccessResponse(res,{message:"tokens refresh processed"});
        })
        .catch(() => {
                req.log.error( "token update failed !");
            responses.send_unauthorized_user_error(req, res);
        });
}
 */
