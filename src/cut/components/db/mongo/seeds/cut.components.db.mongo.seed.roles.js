/**
 * Created by prashun on 8/2/16.
 */
import  Roles from '../models/cut.componenets.db.mongo.models.roles.model.js';

export function catalog_admin_role(id) {
    let role = {
        name: 'catalog.admin',
        description: 'can administer the catalog',
        claims: id
    }
     save_role(role);
}

function save_role(role){
    new Promise ((resolve) => {
        Roles.create(role, function (err, role) {
            if (err) return handleError(err);
            console.log(role);
        });
    });
}