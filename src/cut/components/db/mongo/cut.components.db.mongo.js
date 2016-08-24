'use strict';


const objectID = require('mongodb').ObjectID;
const mongoose = require('bluebird').promisifyAll(require('mongoose'));
const db = mongoose.connection;
import * as CONSTANTS from '../../../../constants/constants';
import Promise from 'bluebird';
import Collections from './cut.components.db.mongo.model';

const url = CONSTANTS.MONGO_DB_URL;
connect(url);

export function connect(url) {
    mongoose.connect(url);
    db.on('error', console.error);
    db.once('open',  () => {
        console.log('connected to :' + url);
    });

}

export function bulkInsert(model, docArray) {
    return new Promise((resolve) => {
        Collections[model].createAsync(docArray)
            .then( (docArray) =>  {
                resolve(docArray)
            })
            .catch((err) => {
                resolve(err)
            });
    });
}

export function find(model, query) {
    return new Promise((resolve) => {
        Collections[model].findAsync(JSON.parse(query))
            .then((docArray) =>  {
                resolve(docArray)
            })
            .catch((err) => {
                console.log(err);
                resolve(err)
            });;
    });
}

export function show(model) {
    return new Promise((resolve) => {
        Collections[model].findAsync({})
            .then((docArray) =>  {
                resolve(docArray)
            })
            .catch((err) => {
                console.log(err);
                resolve(err)
            });;
    });
}

export function getById(model,id){
    return new Promise((resolve) => {
        Collections[model].find({ _id : id },  (err, document) => {
            resolve(document);
        });
    })
}

export function updateById(model ,id ,data ) {
    return new Promise((resolve) => {
            Collections[model].findByIdAndUpdate( id, { $set: data }, (error, doc) => {
                resolve( doc );
            });
    });
}

export function updateByField(model,key,value,data ) {
    return new Promise((resolve) => {
        // TODO: refactor this to use  string templates
        const query = JSON.parse('{"'+key+'":"'+value+'"}');
         Collections[model].update(query, data , null, (error ,docs) => {
            resolve(docs);
         });
    });
}

export function delById(model, id) {
    return new Promise((resolve) => {
        Collections[model].findByIdAndRemove(id, (error, docs) => {
            resolve(docs);
        });
    });
}

export function delByField (model,key,value) {
    return new Promise((resolve) => {
        // TODO: refactor this to use  string templates
        const query = JSON.parse('{"'+key+'":"'+value+'"}');
        Collections[model].remove(query, (error) => {
            resolve(error);
        });
    });
}

export function count(model){
    return new Promise((resolve) => {
        Collections[model].count({}, (err, count) => {
            resolve(count);
        });
    });
}

export function countFiltered(model,key,value){
    return new Promise((resolve) => {
        // TODO: refactor this to use  string templates
        const query = JSON.parse('{"'+key+'":"'+value+'"}');
        Collections[model].count(query,  (err, count) => {
            resolve(count);
        });
    });
}

export function filteredPagination(model,key,value,numberOfItemsPerPage,currentPage){
    // TODO: refactor this to use  string templates
    const condition = JSON.parse('{"'+key+'":"'+value+'"}');
    const  itemsPerPage = parseInt(numberOfItemsPerPage.toString());
    const itemsToSkip =  parseInt(itemsPerPage) * parseInt(currentPage.toString());
    return new Promise((resolve) => {
        let query = Collections[model].find(condition);
         query
            .skip(itemsToSkip)
            .limit(parseInt("'"+itemsPerPage+"'")) // TODO: refactor this to use  string templates
            .exec((err, results) => {
                resolve(results);
            });

    });
}

export function sortedPagination(model,itemsPerPage,currentPage,sortByField,Criteria){
    return new Promise((resolve) => {
        const itemsToSkip =  parseInt(itemsPerPage) * parseInt(currentPage.toString());
        // TODO: refactor this to use  string templates

        const sortCriteria = JSON.parse('{"'+sortByField+'":"'+Criteria+'"}');
        Collections[model].
            find({})
            .limit(parseInt("'"+itemsPerPage+"'"))
            .skip( itemsToSkip )
            .sort(sortCriteria)
            .exec((err, docs) => {
                resolve(docs);
            });
    });
}

/**
export function sortAndFilterAndPaginate(model,key,value,itemsPerPage,currentPage,sortByField,sortCriteria){
    return new Promise((resolve) => {
        // TODO: refactor this to use  string templates
        const query = JSON.parse('{"'+key+'":"'+value+'"}');
        return new Promise((resolve) => {
            const itemsPerPage = itemsPerPage;
            const currentPage = currentPage;
            const sortCriteria = JSON.parse('{"'+sortByField+'":"'+sortCriteria+'"}');
            Collections[model].find(query).limit(itemsPerPage)
                .skip( itemsPerPage * currentPage )
                .sort(sortCriteria)
                .exec(function(err, docs) {
                    resolve(docs);
                });
        });
    });
}
 */
