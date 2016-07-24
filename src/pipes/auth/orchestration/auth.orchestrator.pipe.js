
import { responses } from '../../../cut/index';
import * as OrchestratorUtils from './auth.orchestrator.fascade';

//TODO: add logging ..

export function authenticationPipe(req,res){
    Promise.resolve(OrchestratorUtils.loginAsynchronously(req)).then((result) =>  {
        return JSON.parse(result)["username"];
    }).then(function(username) {
        Promise.resolve(OrchestratorUtils.getUserByNameAsynchronously(username).then((user) => {
            return user.docs[0]._id;
        }).then((userId) => {
            Promise.resolve(OrchestratorUtils.getTokenByUserId(userId).then((token) => {
                return token.docs[0].accessToken
            }).then((accessToken) => {
                if (accessToken) {
                    res.setHeader("authorization", accessToken);
                    responses.sendResponse(res, {"message": "authorized"})
                } else {
                    const error = {"message": "unauthorized access"}
                    res.status(401).json(error)
                }
            }));
         }))
    });
}
