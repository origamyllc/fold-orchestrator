'use strict';

import express from 'express';
//import * as Primus from 'socketio';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import * as favicon from 'serve-favicon';
import * as cookieSession from 'cookie-session';
import * as useragent from 'express-useragent';
import * as Promise from 'bluebird';
import * as http from 'http';
import  cookieParser  from 'cookie-parser';
import  cors  from 'cors';
import session from 'express-session';
import { settings } from '../../constants/constants.js';
import { Secure } from './security/cut.security.passport.js';

const morgan = require('morgan');
const methodOverride = require('method-override');
export const app = express();
const port = settings.orchestrator.port;
export const router = express.Router();
const grunth  = require('grunth');

const ExpressRequest = function (req, res, next) {
    grunth.hook(req,app);
    next();
};

//app.use(morgan('dev')); // log every request to the console
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(useragent.express());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());

//set the method overwrite
app.use(methodOverride((req) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));


app.use(ExpressRequest);

Secure(app);

let server = http.createServer(app);
     server.listen( port );

export const cut = {
    run:function (port) {
        http.createServer(app);
        server.listen( port );
    }
};

