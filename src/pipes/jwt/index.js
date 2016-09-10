
import { jwt_router } from './orchestrator/jwt.route';
import { server } from 'hulk-cut';

server.use( jwt_router  );
