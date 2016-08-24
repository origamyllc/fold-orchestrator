
import { cutRouter  } from  '../../../cut/index';
import  * as  jwt_conrroller from './jwt.orchestrator.controller';

export const jwt_router = cutRouter;

jwt_router.post('/api/v1/jwttoken',jwt_conrroller.get_jwt_token_by_user);
jwt_router.get('/api/v1/jwttoken',jwt_conrroller.get_jwt_token_by_access_token);
