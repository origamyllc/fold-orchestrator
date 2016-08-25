import * as create_jwt_work_flow from '../pipes/jwt.pipe.create_jwt_token.js';
import * as get_jwt_token_workflow from '../pipes/jwt.pipe.get_jwt_token.js';
import * as verify_token_work_flow from '../pipes/jwt.pipe.verify_jwt_token.js';


/**
 * @param req,res
 * @param jwttoken
 */
export function create_jwt_token(req,res) {
    create_jwt_work_flow.create_jwt_token(req,res);
}

export function get_jwt_token(req,res) {
    get_jwt_token_workflow.get_jwt_token(req, res);
}

export function verify_jwt_token(req,res) {
    verify_token_work_flow.verify_jwt_token(req, res);
}