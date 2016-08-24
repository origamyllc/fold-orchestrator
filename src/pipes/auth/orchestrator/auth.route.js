
import { cutRouter  } from  '../../../cut/index';
import  * as  authentication_controller from './auth.orchestrator.controller';

export const authentication_router = cutRouter;

authentication_router.get('/api/v1/refreshtokens',authentication_controller.refresh_access_token);
authentication_router.post('/api/v1/accesstoken',authentication_controller.get_access_token_by_user);