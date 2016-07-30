import * as Workflow from './jwt.orchestrator.pipe';

/**
 * 1)  for the given user
 * 2)  get the access token
 * 3)  if the access token exists then generate jwt token
 * @param req,res
 * @param jwttoken
 */
export function getJWToken(req,res) {
    Workflow.getJWToken(req,res);
}

