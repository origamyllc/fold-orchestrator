/**
 * Created by prashun on 8/2/16.
 */
/**
 * Created by prashun on 6/11/16.
 */

import * as Users from './seeds/cut.components.db.mongo.seed.user.js'
import * as Tokens from './seeds/cut.components.db.mongo.seed.token.js'
import * as Roles from './seeds/cut.components.db.mongo.seed.roles.js'
import * as Claims from './seeds/cut.components.db.mongo.seed.claims.js'

const uuid = require('node-uuid');

const seed_user_and_tokens = new Promise((resolve,reject) => {
    Users.seedUsers().then((user_array) => {
        let token_array = [];
        let index = null;
        for (index in user_array) {
            let id = user_array[index]._id;
            let token = {
                userId: id,
                accessToken: uuid.v4()
            }
            token_array.push(token)
        }
        Tokens.seedTokens(token_array);
    });
});

const seed_claim_and_roles = Claims.seedClaims().then(( claims_array ) => {
    let index = null;
    for ( index in claims_array){
        let id =  claims_array[index]._id;
        let name = claims_array[index].name;
        if(name === 'catalog.admin.claims'){
            Roles.catalog_admin_role(id);
        }
    }
});

Promise.all([seed_user_and_tokens,seed_claim_and_roles]).then(value => {
    console.log("Finished seeding models ...");
}, reason => {
    console.log(reason)
});

