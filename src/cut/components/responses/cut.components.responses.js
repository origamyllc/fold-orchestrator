'use strict';

const _ = require('lodash');
import * as errors from '../../errors/cut.components.errors.customErrors';
import Promise from 'bluebird';
import * as Boom from 'boom';


// Todo:rename to send_not_found_error
function  sendError(obj){
    let error = null;
    if(obj.error === 'Resource Not Found'){
        error = Boom.notFound('Resource Not Found');
        res.status(404).json(error);
    }
}

// Todo:rename to send_bad_implementation_response
export function sendErrorResponse(res ,obj){
    var  error = Boom.badImplementation('terrible implementation by developer');
    res.status(500).json(error);
}

export function send_unauthorized_user_error(req, res) {
    const error = Boom.unauthorized('invalid username or password');
    res.status(401).json(error);
}

