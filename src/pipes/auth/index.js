/**
 * Created by prashun on 6/4/16.
 */


import { authenticationRouter } from './orchestration/auth.route';
import { app,router } from '../../cut/middleware/cut.express';

app.use(  authenticationRouter );