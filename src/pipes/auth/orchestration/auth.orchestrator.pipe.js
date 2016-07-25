
import { responses } from '../../../cut/index';
import * as OrchestratorUtils from './auth.orchestrator.fascade';

//TODO: add logging ..

export function authenticationPipe(req,res){
    req.log.info({message:"login in  user .." + req.body.username});
    Promise.resolve(OrchestratorUtils.loginAsynchronously(req)).then((result) =>  {
        return JSON.parse(result)["username"];
    }).then(function(username) {
        req.log.info({message:"getting user details by name  .." + req.body.username});
        Promise.resolve(OrchestratorUtils.getUserByNameAsynchronously(username).then((user) => {
            return user.docs[0]._id;
        }).then((userId) => {
            req.log.info({message:"getting token by id   .." + userId});
            Promise.resolve(OrchestratorUtils.getTokenByUserId(userId).then((token) => {
                return token.docs[0].accessToken
            }).then((accessToken) => {
                if (accessToken) {
                    res.setHeader("authorization", accessToken);
                    responses.sendResponse(res, {"message": "authorized"})
                } else {
                    const error = {"message": "unauthorized access"}
                    req.log.error({message:error});
                    res.status(401).json(error)
                }
            }));
         }))
    });
}
