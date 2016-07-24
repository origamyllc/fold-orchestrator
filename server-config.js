var util = require('gulp-util');

var CONFIGS={};
    CONFIGS.enviornment= { 'NODE_ENV': util.env.enviornment || 'development' }

module.exports = CONFIGS;
