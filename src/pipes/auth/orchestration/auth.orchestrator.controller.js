import * as Workflow from './auth.orchestrator.pipe';

export function authenticate(req,res) {
    Workflow.authenticationPipe(req,res);
}

export function refreshAccessToken(req,res) {
    Workflow.refreshAccessTokenPipe(req, res);
}