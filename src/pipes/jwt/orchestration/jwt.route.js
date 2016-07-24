
import { cranberryRouter  } from  '../../../cut/index';
import  * as  MandalaController from './jwt.orchestrator.controller';

export const MandalaRouter = cranberryRouter;

MandalaRouter.post('/api/v1/jwttoken/',MandalaController.getJWToken);

// MandalaRouter.get('/api/v1/jwttoken/',MandalaController.validateJWToken);