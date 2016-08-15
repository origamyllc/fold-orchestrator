import * as authentication_work_flow from '../pipes/auth.pipe.authenticate.js';
import * as refresh_token_work_flow from '../pipes/auth.pipe.refreshtoken.js';

export function authenticate(req,res) {
    authentication_work_flow.authenticate(req,res);
}

export function refresh_access_token(req,res) {
    refresh_token_work_flow.refresh_access_token(req, res);
}
