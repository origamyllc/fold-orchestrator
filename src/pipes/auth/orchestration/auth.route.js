
import { cutRouter  } from  '../../../cut/index';
import  * as  authenticationController from './auth.orchestrator.controller';

export const authenticationRouter = cutRouter;

authenticationRouter.post('/api/v1/authenticate',authenticationController.authenticate);
