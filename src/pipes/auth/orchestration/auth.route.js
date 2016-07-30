
import { cutRouter  } from  '../../../cut/index';
import  * as  authenticationController from './auth.orchestrator.controller';

export const authenticationRouter = cutRouter;


authenticationRouter.get('/api/v1/refreshtokens',authenticationController.refreshAccessToken);
authenticationRouter.post('/api/v1/authenticate',authenticationController.authenticate);