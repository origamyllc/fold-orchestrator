/**
 * Created by prashun on 6/11/16.
 */
'use strict'

import { Schema } from 'mongoose';
const mongoose = require('bluebird').promisifyAll(require('mongoose'));
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');

const ClaimsSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        description:{
            type: String,
            required: true
        },
        devices:[{
            type: String
        }],
        applications:[{
            type: String
        }],
        api_white_list:{
            type: Schema.Types.Mixed,
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

const schema = ClaimsSchema;

/**
 * Plugins
 */
schema.plugin(uniqueValidator, { message: 'Value is not unique.'});

export default mongoose.model('Claims', ClaimsSchema ) ;