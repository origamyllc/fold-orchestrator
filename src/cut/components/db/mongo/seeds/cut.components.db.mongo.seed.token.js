/**
 * Created by prashun on 8/2/16.
 */
import  Token from '../models/cut.componenets.db.mongo.models.token.model.js';


export function seedTokens(tokenArray) {
    return new Promise((resolve) => {
        Token.createAsync(tokenArray)
            .then((tokenArray) => {
                resolve(tokenArray)
            })
            .catch((err) => {
                console.log("Failed to seed Users::Error::" + err);
                resolve(err);
            });
    });
}


