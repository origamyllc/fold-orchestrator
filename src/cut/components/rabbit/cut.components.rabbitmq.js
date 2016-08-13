
'use strict';

const  amqp = require('amqp');
let exchange = null;
let queue = null;
let queues = {};
import Promise from 'bluebird';
import * as CONSTANTS from '../../../constants/constants';

const connection =  amqp.createConnection(CONSTANTS.RABBIT_SERVER_CONF);

export function createExchange(name,options){
    return new Promise ( (resolve) => {
          connection.on('ready', function() {
              exchange = connection.exchange(name,options, (exchange) => {
                  resolve(exchange.name);
              });
          });
      });
}

export function publishToExchange(routingKey, message){
    return new Promise ( (resolve) => {
            exchange.publish(routingKey, message) ;
            resolve({ routingKey: routingKey, message:message })
     });
}

export function  createQueue(name){
    return new Promise ( (resolve) => {
            connection.on('ready', function() {
                queue = connection.queue(name, (q) =>  {});
                queues[name]=queue;
                resolve(true);
            });
        });
}

export function bindToExchange(exchange, routingKey){
    return new Promise ( (resolve) => {
            connection.on('ready', function() {
                queue.bind(exchange, routingKey);
                resolve(true);
            });
        });
}

export function subscribeToQueue(name){
    return new Promise ( (resolve) => {
            queues[name].subscribe((message) => {
                resolve(message)
            });
        });
}