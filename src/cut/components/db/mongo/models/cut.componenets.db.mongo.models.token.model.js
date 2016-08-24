/**
 * Created by prashun on 6/11/16.
 */
'use strict'

import { Schema } from 'mongoose';
const mongoose = require('bluebird').promisifyAll(require('mongoose'));
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');


const TokenSchema = new Schema({
        userId: {
            type: String,
            required: true
        },
        accessToken: {
            type: String,
            required: true
        }

    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

const schema = TokenSchema;

// add mixin for get by user Id?

/**
 * Plugins
 */
schema.plugin(uniqueValidator, { message: 'Value is not unique.'});

export default mongoose.model('Tokens', TokenSchema ) ;