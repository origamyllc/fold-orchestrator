
import { router  } from  'hulk-cut';
import  * as  jwt_conrroller from './jwt.orchestrator.controller';

export const jwt_router = router;

jwt_router.post('/api/v1/jwttoken',jwt_conrroller.create_jwt_token);
jwt_router.get('/api/v1/jwttoken',jwt_conrroller.get_jwt_token);
jwt_router.get('/api/v1/jwttoken/verify',jwt_conrroller.verify_jwt_token);
