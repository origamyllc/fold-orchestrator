/**
 * Created by prashun on 8/2/16.
 */
import Users from '../models/cut.componenets.db.mongo.models.user.model.js';

let usersArray =[];

const homer = {
    username:'homer',
    password:'homerisTheDaddy',
    email:'homer@cut.com',
    roles:['catalog.admin']
}

usersArray.push(homer);

const marge = {
    username:'marge',
    password:'margeisTheMommy',
    email:'marge@cut.com',
    roles:['catalog.admin']
}

usersArray.push(marge);

const bart = {
    username:'bart',
    password:'bartmargeisTheSon',
    email:'bart@cut.com',
    roles:['catalog.admin']
}

usersArray.push(bart);

const lisa = {
    username:'lisa',
    password:'lisaisTheDaughter',
    email:'lisa@cut.com',
    roles:['catalog.admin']
}

usersArray.push(lisa);

const maggie = {
    username:'maggie',
    password:'maggieisTheBaby',
    email:'maggie@cut.com',
    roles:['catalog.admin']
}

usersArray.push(maggie);

export function seedUsers() {
    return new Promise((resolve) => {
        Users.createAsync(usersArray)
            .then((usersArray) => {
                resolve(usersArray)
            })
            .catch((err) => {
                 console.log("Failed to seed Users::Error::" + err);
                resolve(err);
            });
    });
}

