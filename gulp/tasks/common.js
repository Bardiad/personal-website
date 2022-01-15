"use strict";
const fs = require('fs');

const _getLang = function(callback) {
    return process.argv.indexOf('--FR') > -1 ? "fr" : "en";    
}

const _addSuffixToFilename = function(suffix, name){
    const filename = name.split(".");
    const extension = filename.pop();

    return filename.join(".") + "." + suffix + "." + extension;    
}

const _getLocalizedFilename = function(filename) {
    const _suffix = _getLang();
    return _addSuffixToFilename(_suffix, filename);
}

const _addDateToFilename = function(filename) {
    const _date = (date.getMonth()+1).toString() + date.getFullYear().toString();
    return _addSuffixToFilename(_date, filename);
}

const _getDataFilePath= function(filename, Localize) {
    let file = "";

    if (Localize) {
        file = _getLocalizedFilename(filename);
    } else {
        file = filename;
    }

    return "./src/data/" + file;
}

const _getData = function(filename, Localize) {
    const data = JSON.parse(fs.readFileSync(_getDataFilePath(filename, Localize)))
    return data;    
}

const _getConfig = function(configFile) {
    return JSON.parse(fs.readFileSync('./gulp/' + configFile)) 
}

const _getNodeEnvironment = function() {
    return process.env.NODE_ENV || 'development';
}

const _isProduction = function() {
    const _env = _getNodeEnvironment();
    return _env === "production"
}

exports.getData = _getData;
exports.getLang = _getLang;
exports.getNodeEnvironment = _getNodeEnvironment;
exports.isProd = _isProduction;
exports.addDateToFilename = _addDateToFilename;
exports.getLocalizedFilename = _getLocalizedFilename;
exports.getConfig = _getConfig;
