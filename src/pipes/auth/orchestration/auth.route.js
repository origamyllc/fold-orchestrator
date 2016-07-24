
import { cranberryRouter  } from  '../../../cut/index';
import  * as  authenticationController from './auth.orchestrator.controller';

export const authenticationRouter = cranberryRouter;

authenticationRouter.post('/api/v1/authenticate',authenticationController.authenticate);
