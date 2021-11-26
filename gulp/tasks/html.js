"use strict";

const { src, dest, series } = require( 'gulp' );
const fs = require('fs');
const nunjucks = require('gulp-nunjucks-render');
const rename = require('gulp-rename');
const graymatter = require('gulp-gray-matter');

const util = require("./common");
const config = util.loadConfig('gulp.config.json');

const _env = process.env.NODE_ENV || 'development';

console.log("###current environment: " + _env);

const _isProd = _env === 'production';

function _getEnvironment() {
    return function(environment) {
        //Manage custom filters
        let metadata = util.getData(global.SOURCES_BASE_PATH + "/data/data.meta.json");
        const contentdata = util.getData(global.SOURCES_BASE_PATH + "/data/data.content.json");
        const postdata = util.getData(global.SOURCES_BASE_PATH + "/data/data.posts.json");

        //Add prod flag to metadata object
        metadata = { ...metadata, isProd: _isProd};

        //Add Global Data to nunjucks
        environment.addGlobal('META', metadata);
        environment.addGlobal('CONTENT', metadata);
        environment.addGlobal('POSTS', postdata);    
    }    
}

function _build(callback){
    const env = _getEnvironment();

    return src([
      global.SOURCES_BASE_PATH + '/*.njk',
      global.SOURCES_BASE_PATH + '/pages/**/*.njk',
    ])
    .pipe(graymatter())
    .pipe(nunjucks({ path: [ global.SOURCES_BASE_PATH + "/templates/" ], manageEnv:env }))
    .pipe(rename(function (path){
      path.extname = ".html";
    }))
    .pipe(dest( global.BASE_PATH + "/dist/" ))
    .pipe(global.CONNECT.reload());
    callback();
};

exports.build   = _build;
exports.getEnv  = _getEnvironment;
