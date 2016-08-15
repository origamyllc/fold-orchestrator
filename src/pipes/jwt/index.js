
import { jwt_router } from './orchestrator/jwt.route';
import { app,router } from '../../cut/middleware/cut.express';

app.use( jwt_router  );
