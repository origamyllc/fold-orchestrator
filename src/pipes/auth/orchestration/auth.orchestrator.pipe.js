import { responses,LRU } from '../../../cut/index';
import * as authentication_fascade from './auth.orchestrator.fascade';
const uuid = require('node-uuid');

export function authenticate(req, res) {
    req.log.info({message: "login in  user .." + req.body.username});
    Promise.resolve(authentication_fascade.login_user(req)).then((result) => {
        return JSON.parse(result)["username"];
    }).then(function (user_name) {
        req.log.info({message: "getting user details by name  .." + req.body.username});
        Promise.resolve(authentication_fascade.get_user_by_name(user_name).then((user) => {
                return user.docs[0]._id;
            }).then((user_id) => {
                req.log.info({message: "getting token by id   .." + user_id});
                Promise.resolve(authentication_fascade.get_user_token_by_id(user_id).then((token) => {
                    return token.docs[0].accessTokenss
                }).then((access_token) => {
                    if (access_token) {
                        res.setHeader("authorization", access_token);
                        responses.sendResponse(res, {"message": "authorized"})
                    } else {
                        send_unauthorized_user_error(req, res);
                    }
                }));
            }).catch(() => {
                send_unauthorized_user_error(req, res);
            })
        )
    });
}

export function refresh_access_token(req, res) {
    return new Promise((resolve) => {
        let keys = LRU.keys();
        for (let index in keys) {
            console.log("processed token ::"+ keys[index]);
            authentication_fascade.get_jwt_by_access_token( keys[index]).then((jwt_token)=> {
                if (jwt_token && jwt_token.response) {
                    let token = jwt_token.response.value;
                    authentication_fascade.delete_access_token(keys[index]);
                    let newToken = uuid.v4();
                    var obj = {key: newToken, value: token};
                    authentication_fascade.set_token_in_cache(obj, keys[index]);
                      authentication_fascade.get_access_token(keys[index]).then((accessToken) => {
                        authentication_fascade.update_access_token(accessToken.docs[0].userId,
                            {userId: accessToken.docs[0].userId, accessToken: newToken});
                    });
                }
            });
        }
       responses.sendSuccessResponse(res,{message:"tokens refresh processed"});
    });
}

function send_unauthorized_user_error(req, res) {
    const error = {"message": "unauthorized access"}
    req.log.error({message: error});
    res.status(401).json(error)
}