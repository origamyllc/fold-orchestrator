import * as work_flows from './auth.orchestrator.pipe';

export function authenticate(req,res) {
    work_flows.authenticate(req,res);
}

export function refresh_access_token(req,res) {
    work_flows.refresh_access_token(req, res);
}