import * as authentication_work_flow from '../pipes/auth.pipe.get_access_token_by_user_info.js';
import * as refresh_token_work_flow from '../pipes/auth.pipe.refreshtoken.js';

export function get_access_token_by_user(req,res) {
    authentication_work_flow.get_access_token_by_user(req,res);
}

export function refresh_access_token(req,res) {
    refresh_token_work_flow.refresh_access_token(req, res);
}
