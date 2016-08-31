import { responses,LRU } from '../../../cut/index';
import * as authentication_fascade from '../orchestrator/auth.orchestrator.fascade';
const uuid = require('node-uuid');

export function get_access_token_by_user(req, res) {
    initialize_pipe.call(initialize_pipe,req,res);
}

const initialize_pipe = function (req,res) {
    login_user (req)
        .then(get_user_by_name)
        .then(get_user_token_by_id)
        .then((token) => {
             responses.send_response(res, {"accesstoken": token.docs[0].accessToken })
        }).catch( () => {
             req.log.error("getting token for user " + req.body.username+ "failed !");
             responses.send_unauthorized_user_error(req, res);
        });
}


function login_user (req){
    return new Promise((resolve) => {
        authentication_fascade.login_user(req).then( (user) =>  {
            resolve(user);
        }).catch((err) => {
            resolve(err);
        });
    });
}

const get_user_by_name =  function (user) {
   var user_name = JSON.parse(user)["username"];
    return new Promise((resolve) => {
        authentication_fascade.get_user_by_name(user_name).then((user) => {
           resolve(user.docs[0]._id);
        }).catch((err) => {
            resolve(err);
        });
    });
}

const get_user_token_by_id =  function (user_id) {
    return new Promise((resolve) => {
        authentication_fascade.get_user_token_by_id(user_id).then((token) => {
              resolve(token);
        }).catch((err) => {
            resolve(err);
        });
    });
}

