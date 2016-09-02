import { responses,$logger } from '../../../cut/index';
import * as authentication_fascade from '../orchestrator/auth.orchestrator.fascade';
const uuid = require('node-uuid');

export function get_access_token_by_user(req, res) {
    $logger.info("getting access token by user");
    initialize_pipe.call(initialize_pipe,req,res);
}

const initialize_pipe = function (req,res) {
    login_user (req)
        .then(get_user_id_by_name)
        .then(get_user_token_by_id)
        .then((token) => {
             responses.send_response(res, {"accesstoken": token.docs[0].accessToken })
        }).catch( () => {
             $logger.error("getting token for user " + req.body.username+ "failed !");
             responses.send_unauthorized_user_error(req, res);
        });
}


function login_user (req){
    return new Promise((resolve) => {
        authentication_fascade.login_user(req).then( (user) =>  {
           $logger.info("get_access_token_by_user::logged in user "+req.body.username);
            resolve(user);
        }).catch((err) => {
            $logger.error("get_access_token_by_user::login failed for user "+req.body.username);
            resolve(err);
        });
    });
}

const get_user_id_by_name =  function (user) {
   var user_name = JSON.parse(user)["username"];
    return new Promise((resolve) => {
        authentication_fascade.get_user_by_name(user_name).then((user) => {
          $logger.info("get_access_token_by_user::getting user info for  "+ user_name);
           resolve(user.docs[0]._id);
        }).catch((err) => {
            $logger.error("get_access_token_by_user::failed to get user info for user "+ user_name + "  with error "+ err);
            resolve(err);
        });
    });
}

const get_user_token_by_id =  function (user_id) {
    return new Promise((resolve) => {
        authentication_fascade.get_user_token_by_id(user_id).then((token) => {
              $logger.info("get_access_token_by_user::got token by user id "+ user_id);
              resolve(token);
        }).catch((err) => {
            $logger.info("get_access_token_by_user::error getting token for user id "+ user_id);
            resolve(err);
        });
    });
}

