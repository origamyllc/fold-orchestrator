
import { cutRouter  } from  '../../../cut/index';
import  * as  JWTController from './jwt.orchestrator.controller';

export const JWTRouter = cutRouter;

JWTRouter.post('/api/v1/jwttoken/',JWTController.getJWToken);

