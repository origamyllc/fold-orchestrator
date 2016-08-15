/**
 * Created by prashun on 6/4/16.
 */


import { authentication_router } from './orchestrator/auth.route';
import { app,router } from '../../cut/middleware/cut.express';

app.use(  authentication_router );