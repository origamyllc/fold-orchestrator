/**
 * Created by prashun on 6/4/16.
 */


import { authentication_router } from './orchestrator/auth.route';
import { $app } from 'hulk-cut';

$app.use(  authentication_router );