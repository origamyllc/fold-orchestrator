import * as work_flows from './jwt.orchestrator.pipe';

/**
 * @param req,res
 * @param jwttoken
 */
export function get_jwt_token(req,res) {
    work_flows.get_jwt_token(req,res);
}

