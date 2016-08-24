import { responses,LRU } from '../../../cut/index';
import * as authentication_fascade from '../orchestrator/auth.orchestrator.fascade';
const uuid = require('node-uuid');

export function get_access_token_by_user(req, res) {
    initialize_pipe.call(initialize_pipe,req,res);
}

const initialize_pipe = function (req,res) {
    return new Promise(() => {
        req.log.info( "login in user " + req.body.username);
        authentication_fascade.login_user(req).then(function (user) {
            get_user_by_name(req,res,JSON.parse(user)["username"])
        }).catch(() => {
            req.log.error("login in user " + req.body.username + "failed !");
            responses.send_unauthorized_user_error(req, res);
        });
    });
}

function get_user_by_name(req,res,user_name) {
    req.log.info( "getting user info for user " + user_name);
    authentication_fascade.get_user_by_name(user_name).then((user_id) => {
        get_user_token_by_id(req,res,user_id.docs[0]._id);
    }).catch(() => {
        req.log.error( "getting user info for user " + user_name + "failed !");
        responses.send_unauthorized_user_error(req, res);
    });
}

function get_user_token_by_id(req,res,user_id) {
    req.log.info({message: "getting token by id " + user_id});
    authentication_fascade.get_user_token_by_id(user_id).then((token) => {
        responses.send_response(res, {"accesstoken": token.docs[0].accessToken })
    }).catch(() => {
        req.log.error("getting token by id " + user_id + "failed !");
        responses.send_unauthorized_user_error(req, res);
    });
}

