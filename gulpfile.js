"use strict";

/* ******* */
/* Modules */
/* ******* */
const { watch, series, src, dest, parallel, task } = require('gulp');
const fs        = require('fs');
const clean     = require('gulp-clean');


const util     = require("./gulp/tasks/common");
const config   = util.getConfig('gulp.config.json');

global.CONNECT = require('gulp-connect');
global.BASE_PATH = __dirname;
global.SOURCES_BASE_PATH = __dirname + config.project.source;
global.BUILD_PATH = __dirname + config.project.destination;

/* *************************** */
/* Task Partials & Definitions */
/* *************************** */
const html_tasks = require("./gulp/tasks/html");
const sass_tasks = require("./gulp/tasks/sass");

/* Common Tasks */

/* HTML Tasks */
const _buildHTML = html_tasks.buildHTML;
const _buildSCSS = html_tasks.buildSCSS;
const _buildCSS  = sass_tasks.buildCSS;

/* Utility & Custom Tasks */
function _startConnect(callback) {
    global.CONNECT.server({
        port: 8000,
        root: global.BUILD_PATH,
        livereload:true
    });
    callback();
}

function _clean(callback) {
    return src([global.SOURCES_BASE_PATH + "/_temp/", global.BUILD_PATH], {read:false})
    .pipe(clean())
}
function _watchFiles(callback) {
    watch(config.project.watch, _buildTasks);
    callback();
}

/* Composite tasks */
const _buildTasks = series(_buildHTML, _buildSCSS, _buildCSS);
const _serve = parallel(_buildTasks, _startConnect, _watchFiles);

/* ***************** */
/* Task Registration */
/* ***************** */
exports.default = _serve;
exports.serve = _serve;
exports.watch = watch;
exports.clean = _clean;
exports["build:html"] = _buildHTML;
exports["build:css"] = _buildCSS;
exports["build:all"] = _buildTasks;
