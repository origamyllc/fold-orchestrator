/**
 * Created by prashun on 6/11/16.
 */

import Users from './models/cut.componenets.db.mongo.models.user.model.js'
import Tokens from './models/cut.componenets.db.mongo.models.token.model'
import Roles from './models/cut.componenets.db.mongo.models.roles.model'
import Claims from './models/cut.componenets.db.mongo.models.claims.model'

let Collections = {};

Collections['Users'] = Users;
Collections['Tokens'] = Tokens;
Collections['Roles'] = Roles;
Collections['Claims'] = Claims;

export default Collections;