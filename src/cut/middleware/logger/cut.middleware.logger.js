import { logger } from './cut.middleware.bunyan';
import uuid from 'uuid';
import { app } from '../cut.express';

const _ = require('lodash');


function getRequestMetadata(req) {

    let meta = {};

    req.locals = app.locals || {};

    generateRequestId(req);

    _.extend(meta, {
        requestId: req.id,
        env: req.locals.settings.env,
        host: req.headers.host.split(':')[0],
        port: req.headers.host.split(':')[1],
        browser : req.useragent.browser,
        version : req.useragent.version,
        os : req.useragent.os,
        platform: req.useragent.platform,
        url:req.url,
        method: req.method,
        user: req.user || {},
        body: req.body
    });

    return meta;
}

function setSessionId(req){
    _.extend(req.session, {
        _id: req.sessionID
    });

    return req.session;
}

function generateRequestId(req){
    req.id = uuid.v4();
}

export function Logger(req){
    req._metadata=getRequestMetadata(req);
    req.log = {};

    req.log.info = function ( message ){
        _.extend(req._metadata, { 'message':message } );
        logger.info(req._metadata);
    }

    req.log.error = function ( message ){
        _.extend(req._metadata, { 'message':message } );
        logger.error(req._metadata);
    }

    req.log.warn = function ( message ){
        _.extend(req._metadata, { 'message':message } );
        logger.warn(req._metadata);
    }

    req.log.debug = function ( message ){
        _.extend(req._metadata, { 'message':message } );
         logger.debug(req._metadata);
    }
}