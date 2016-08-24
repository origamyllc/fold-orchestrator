import * as get_jwt_token_by_user_work_flow from '../pipes/jwt.pipe.create_jwt_token_by_user_info.js';
import * as get_jwt_token_by_access_token_work_flow from '../pipes/jwt.pipe.get_jwt_by_access_token.js';

/**
 * @param req,res
 * @param jwttoken
 */
export function get_jwt_token_by_user(req,res) {
    get_jwt_token_by_user_work_flow.get_jwt_token_by_user(req,res);
}

export function get_jwt_token_by_access_token(req,res) {
    get_jwt_token_by_access_token_work_flow.get_jwt_token_by_access(req, res);
}