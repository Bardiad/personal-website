"use strict";

/* ******* */
/* Modules */
/* ******* */
const { watch, series, src, dest, parallel, task } = require('gulp');
const fs        = require('fs');
const connect   = require('gulp-connect');


const util     = require("./gulp/tasks/common");
const config   = util.loadConfig('gulp.config.json');


global.BASE_PATH = __dirname;
global.SOURCES_BASE_PATH = __dirname + config.project.source;
global.CONNECT = connect;


/* *************************** */
/* Task Partials & Definitions */
/* *************************** */
const html_tasks = require("./gulp/tasks/html");


/* Common Tasks */


/* HTML Tasks */
const _buildHTML = html_tasks.build;

/* Utility & Custom Tasks */
function _startConnect(callback) {
    global.CONNECT.server({
        port: 8000,
        root: global.BASE_PATH + "/dist/",
        livereload:true
    });
    callback();
}

function _watchFiles(callback) {
    watch(config.project.watch, _buildHTML);
    callback();
}



const _buildTasks = parallel(_buildHTML, _watchFiles);
const _serve = series(_startConnect, _buildTasks);




/* ***************** */
/* Task Registration */
/* ***************** */
exports.default        = _serve;
exports.serve          = _serve;
exports["build:html"]  = _buildTasks;
