"use strict";
const fs = require('fs');
const config   = JSON.parse(fs.readFileSync('./gulp/gulp.config.json'));

const _getData = function(slug) {
    const data = JSON.parse(fs.readFileSync(slug))
    return data;    
}

const _loadConfig = function(config) {
    const data = JSON.parse(fs.readFileSync('./gulp/' + config ));
    return data;
}

exports.getData = _getData;
exports.loadConfig = _loadConfig;