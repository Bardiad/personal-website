"use strict";

const { src, dest, series } = require( 'gulp' );
const fs = require('fs');
const nunjucks = require('gulp-nunjucks-render');
const rename = require('gulp-rename');
const graymatter = require('gulp-gray-matter');

const util = require("./common");
const config = util.getConfig('gulp.config.json');

function _getEnvironment() {
    return function(environment) {
        //Hold various data objects
        const data = {
            "META"    : util.getData("data.meta.json"),
            "CONTENT" : util.getData("data.content.json"),
            "POSTS"   : util.getData("data.posts.json"),
            "STYLES"  : util.getData("styles.json")
        }

        //Add data to nunjucks environment
        environment.addGlobal('data', data); 
    }    
}

function _buildHTML(callback){
    const _env = _getEnvironment();

    return src([
      global.SOURCES_BASE_PATH + '/index.njk',
      global.SOURCES_BASE_PATH + '/pages/**/*.njk',
    ])
    .pipe(graymatter())
    .pipe(nunjucks({ path: [ global.SOURCES_BASE_PATH + "/templates/" ], manageEnv:_env }))
    .pipe(dest( global.BASE_PATH + "/dist/" ))
    .pipe(global.CONNECT.reload());
};

function _buildSCSS(callback) {
    const _env = _getEnvironment();

    return src([global.SOURCES_BASE_PATH + '/styles/**/*.scss'])
    .pipe(nunjucks({ path: [ global.SOURCES_BASE_PATH + "/styles/" ], manageEnv:_env }))
    .pipe(rename(function(path){
        path.extname = ".scss";
    }))        
    .pipe(dest( global.SOURCES_BASE_PATH + "/_temp/scss/" ))
}

exports.buildHTML     = _buildHTML;
exports.buildSCSS     = _buildSCSS;
exports.getEnv        = _getEnvironment;
