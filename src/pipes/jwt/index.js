
import { MandalaRouter } from './orchestration/jwt.route';
import { app,router } from '../../cut/middleware/cut.express';

app.use( MandalaRouter  );
