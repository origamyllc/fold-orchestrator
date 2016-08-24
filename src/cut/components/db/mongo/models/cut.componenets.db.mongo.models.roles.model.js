/**
 * Created by prashun on 6/11/16.
 */
'use strict'

import { Schema } from 'mongoose';
const mongoose = require('bluebird').promisifyAll(require('mongoose'));
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');


const RolesSchema = new Schema({
       name: {
            type: String,
            required: true,
            unique: true
        },
       description:{
            type: String,
            required: true
       },
       claims: {
           type:Schema.Types.ObjectId,
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

const schema = RolesSchema;

/**
 * Plugins
 */
schema.plugin(uniqueValidator, { message: 'Value is not unique.'});

export default mongoose.model('Roles', RolesSchema ) ;