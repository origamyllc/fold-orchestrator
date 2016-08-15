import { responses,LRU } from '../../../cut/index';
import * as authentication_fascade from './auth.orchestrator.fascade';
const uuid = require('node-uuid');

export function authenticate(req, res) {
    initialize_pipe.call(initialize_pipe,req,res);
}

const initialize_pipe = function (req,res) {
    return new Promise(() => {
          req.log.info({message: "login in user " + req.body.username});
        authentication_fascade.login_user(req).then(function (user) {
            get_user_by_name(req,res,JSON.parse(user)["username"])
        }).catch(() => {
            req.log.error({message: "login in user " + req.body.username + "failed !"});
            responses.send_unauthorized_user_error(req, res);
        });
    });
}

function get_user_by_name(req,res,user_name) {
    req.log.info({message: "getting user info for user " + user_name});
    authentication_fascade.get_user_by_name(user_name).then((user_id) => {
        get_user_token_by_id(req,res,user_id.docs[0]._id);
    }).catch(() => {
        req.log.error({message: "getting user info for user " + user_name + "failed !"});
        responses.send_unauthorized_user_error(req, res);
    });
}

 function get_user_token_by_id(req,res,user_id) {
     req.log.info({message: "getting token by id " + user_id});
     authentication_fascade.get_user_token_by_id(user_id).then((token) => {
          res.setHeader("authorization", token.docs[0].accessToken);
          responses.send_response(res, {"message": "authorized"})
     }).catch(() => {
         req.log.info({message: "getting token by id " + user_id + "failed !"});
         responses.send_unauthorized_user_error(req, res);
     });
 }


export function refresh_access_token(req, res) {
    let keys = LRU.keys();
    console.log(keys);
    if(keys || typeof keys !== "undefined"){
        refresh_tokens(req, res,keys);
    } else {
        req.log.info({message: "refresh tokens failed .."});
        responses.send_unauthorized_user_error(req, res);
    }
}

function refresh_tokens(req, res,keys) {
    for (let index in keys) {
        console.log("processed token::"+ keys[index]);
        authentication_fascade.get_jwt_by_access_token( keys[index]).then((jwt_token) => {
            get_jwt_by_access_token(req, res,jwt_token,keys[index]);
        }).catch(() => {
            responses.send_unauthorized_user_error(req, res);
        });
    }
}

function get_jwt_by_access_token(req, res,jwt_token,key) {
    if (jwt_token && jwt_token.response) {
        let token = jwt_token.response.value;
        authentication_fascade.delete_access_token(key).then(() => {
            set_token_in_cache (key);
        }).catch(() => {
            responses.send_unauthorized_user_error(req, res);
        });
    }
}

function set_token_in_cache (key){
    let newToken = uuid.v4();
    var obj = { key: newToken, value: token };
    authentication_fascade.set_token_in_cache(obj, key).then( () => {
        get_access_token();
    }).catch(() => {
        responses.send_unauthorized_user_error(req, res);
    });
}

function get_access_token(){
    authentication_fascade.get_access_token(key).then((accessToken) => {
        update_access_token(accessToken);
    }).catch(() => {
        responses.send_unauthorized_user_error(req, res);
    });;
}

function update_access_token(accessToken) {
    authentication_fascade.update_access_token(accessToken.docs[0].userId,{userId: accessToken.docs[0].userId, accessToken: newToken})
        .then(() => {
            responses.sendSuccessResponse(res,{message:"tokens refresh processed"});
        })
        .catch(() => {
            responses.send_unauthorized_user_error(req, res);
        });
}