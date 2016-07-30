'use strict';

import * as bunyan from 'bunyan';

const  PrettyStream = require('bunyan-prettystream');
const prettyStdOut = new PrettyStream();

prettyStdOut.pipe(process.stdout);

export const  logger = bunyan.createLogger({
    name: 'jibreel',
    streams: [
        {
            level: 'info',
            type: 'raw',
            stream: prettyStdOut
        },
        {
            level: 'debug',
            type: 'raw',
            stream: prettyStdOut
        },
        {
            level: 'error',
            type: 'raw',
            stream: prettyStdOut
        },
    ]
});
