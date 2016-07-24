
import { JWTRouter } from './orchestration/jwt.route';
import { app,router } from '../../cut/middleware/cut.express';

app.use( JWTRouter  );
