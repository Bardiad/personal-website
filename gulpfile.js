"use strict";

/* ******* */
/* Modules */
/* ******* */
const { watch, series, src, dest, parallel, task } = require('gulp');
const fs        = require('fs');

const util     = require("./gulp/tasks/common");
const config   = util.loadConfig('gulp.config.json');

global.CONNECT = require('gulp-connect');
global.BASE_PATH = __dirname;
global.SOURCES_BASE_PATH = __dirname + config.project.source;

/* *************************** */
/* Task Partials & Definitions */
/* *************************** */
const html_tasks = require("./gulp/tasks/html");
const sass_tasks = require("./gulp/tasks/sass");

/* Common Tasks */

/* HTML Tasks */
const _buildHTML = html_tasks.build;
const _buildCSS = sass_tasks.build;

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
    watch(config.project.watch, _buildTasks);
    callback();
}

/* Composite tasks */
const _buildTasks = series(_buildHTML, _buildCSS);
const _serve = parallel(series(_buildTasks, _startConnect), _watchFiles);

/* ***************** */
/* Task Registration */
/* ***************** */
exports.default = _serve;
exports.serve = _serve;
exports.watch = series(_watchFiles, _buildTasks)
exports["build:html"] = _buildHTML;
exports["build:css"] = _buildCSS;
exports["build:all"] = _buildTasks;
