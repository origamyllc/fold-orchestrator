import { responses,LRU } from '../../../cut/index';
import * as
OrchestratorUtils
from
'./auth.orchestrator.fascade';
const uuid = require('node-uuid');

export function authenticationPipe(req, res) {
    req.log.info({message: "login in  user .." + req.body.username});
    Promise.resolve(OrchestratorUtils.loginAsynchronously(req)).then((result) => {
        return JSON.parse(result)["username"];
    }).then(function (username) {
        req.log.info({message: "getting user details by name  .." + req.body.username});
        Promise.resolve(OrchestratorUtils.getUserByNameAsynchronously(username).then((user) => {
                return user.docs[0]._id;
            }).then((userId) => {
                req.log.info({message: "getting token by id   .." + userId});
                Promise.resolve(OrchestratorUtils.getTokenByUserId(userId).then((token) => {
                    return token.docs[0].accessToken
                }).then((accessToken) => {
                    if (accessToken) {
                        // save the token in a  LRU cache
                        res.setHeader("authorization", accessToken);
                        responses.sendResponse(res, {"message": "authorized"})
                    } else {
                        sendUnauthorizedError(req, res);
                    }
                }));
            }).catch(() => {
                sendUnauthorizedError(req, res);
            })
        )
    });
}

export function refreshAccessTokenPipe(req, res) {
    return new Promise((resolve) => {
        let keys = LRU.keys();
        for (let index in keys) {
            OrchestratorUtils.getJWTTokenByAccessToken(keys[index]).then((jwtToken)=> {
                if (jwtToken && jwtToken.response) {
                    let token = jwtToken.response.value;
                    OrchestratorUtils.deleteAccessToken(keys[index]);
                    let newToken = uuid.v4();
                    var obj = {key: newToken, value: token};
                    OrchestratorUtils.setTokenToRedis(obj, keys[index]);
                    OrchestratorUtils.getAccessToken(keys[index]).then((accessToken) => {
                        OrchestratorUtils.updateAccessToken(accessToken.docs[0].userId,
                            {userId: accessToken.docs[0].userId, accessToken: newToken});
                    });
                }
            });
        }
        responses.sendSuccessResponse(res, {"message": "tokens refreshed sucessfully .."})
    }).catch(() => {
            const error = {"message": "refreshing tokens failed"}
            responses.sendErrorResponse(res, error)
        });
}



function sendUnauthorizedError(req, res) {
    const error = {"message": "unauthorized access"}
    req.log.error({message: error});
    res.status(401).json(error)
}