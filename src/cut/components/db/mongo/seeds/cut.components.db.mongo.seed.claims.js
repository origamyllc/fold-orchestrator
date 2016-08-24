/**
 * Created by prashun on 8/2/16.
 */

import Claims from '../models/cut.componenets.db.mongo.models.claims.model.js';

let claims_array =[];

const  catalog_admin_claim  = {
    name:'catalog.admin.claims',
    description:'Has full admin rights for the catalog',
    applications:[],
    devices:[],
    api_white_list:[
        {"/catalog/devices":"Y"},
        {"/catalog/application":"Y"},
        {"/catalog/api":"Y"}
    ]
}


claims_array.push(catalog_admin_claim);


export function seedClaims() {
    return new Promise((resolve) => {
        Claims.createAsync(claims_array)
            .then((claims_array) => {
                resolve(claims_array)
            })
            .catch((err) => {
                 console.log("Failed to seed Claims::Error::" + err);
                resolve(err);
            });
    });
}
