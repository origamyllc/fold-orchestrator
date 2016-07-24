import { Logger } from '../../middleware/logger/cut.middleware.logger';

export function request(req,next){
    if (!req.session) {
       // return next(new Error('oh no'));// handle error
    }
    Logger(req);
}
