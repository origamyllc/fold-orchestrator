/**
 * Created by prashun on 5/8/16.
 */
const gulp = require('gulp');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const args = require('./server-config.js');
const mongoose = require('mongoose');
const mongodev = undefined;
const redis = require("redis");
const relational = require('orm');
const amqp = require('amqp');
const path = require('path');

//import * as mongoose from './microservices/lib/components/db/mongo/mongoose-middleware';

require('babel-register')({
    "presets": ["es2015"]
});

gulp.task('default', ['set:enviornment'],  () => {
    gulp.start('server:start');
});

// get enviornment
gulp.task('set:enviornment', () => {
    if(args.enviornment.NODE_ENV === 'development') {
        process.env.NODE_ENV = 'development';
    }
});

// start our server and listen for changes
gulp.task('server:start', (cb) => {
    gulp.start('server:development', cb);
});

const config = function getConfiguration () {
    // Application Config
    let conf = null;

    if (process.env.NODE_ENV === 'development') {
        conf = require('./config/enviornment/development');
    }

    return conf;
}

// run the server
gulp.task('server:development',  () => {
    // configure nodemon
    nodemon({
        // the script to run the app
        script: 'build/server.js',
        // this listens to changes in any of these files/routes and restarts the commons
        // watch: ["server.js", "app.js", "routes/", 'public/*', 'public/*/**'],
        ext: 'js',
        // set the enviornment for the build
        env: config.NODE_ENV
    });
});
