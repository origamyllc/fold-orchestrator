/**
 * Created by prashun on 6/4/16.
 */


import { authentication_router } from './orchestrator/auth.route';
import { server } from 'hulk-cut';

server.use(  authentication_router );