
import { jwt_router } from './orchestrator/jwt.route';
import { $app } from 'hulk-cut';

$app.use( jwt_router  );
