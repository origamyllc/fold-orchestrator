import * as work_flows from '../pipes/jwt.pipe.jwttoken';

/**
 * @param req,res
 * @param jwttoken
 */
export function get_jwt_token(req,res) {
    work_flows.get_jwt_token(req,res);
}

