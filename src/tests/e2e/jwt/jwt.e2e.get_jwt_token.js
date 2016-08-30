import * as stubs from '../../stubs/test.bootstrap.stubs.js';
import { cutRouter  } from '../../../cut/index.js';
const request = require('supertest');
const expect = require('chai').expect;
const  jwt = require('jsonwebtoken');

var m_server = request.agent("http://localhost:9100");
var b_server = request.agent("http://localhost:9000");


