"use strict";

const { src, dest, series } = require( 'gulp' );
const fs                    = require('fs');
const nunjucksRender        = require('gulp-nunjucks-render');
const rename 				= require('gulp-rename');

const util     = require("./common");
const config   = util.loadConfig('gulp.config.json');


function _getEnvironment() {

    const env = process.env.NODE_ENV || 'development';

    console.log("env is: " + env);

    return function(environment) {
        //Manage custom filters
        const metadata = util.getData(global.SOURCES_BASE_PATH + "/data/data.meta.json");
        const contentdata = util.getData(global.SOURCES_BASE_PATH + "/data/data.content.json");
        const postdata = util.getData(global.SOURCES_BASE_PATH + "/data/data.posts.json");                

        const isProd = env === 'production';
        console.log("isProd is: " + isProd);

        //Add Global Data to nunjucks
        environment.addGlobal('meta', metadata);
        environment.addGlobal('content', metadata);
        environment.addGlobal('posts', postdata);     

    }    
}

function _build(callback){
    const env = _getEnvironment();

    return src([
    	global.SOURCES_BASE_PATH + '/*.njk',
    	global.SOURCES_BASE_PATH + '/pages/**/*.njk',
  	])
    .pipe(nunjucksRender({ path: [ global.SOURCES_BASE_PATH + "/templates/" ], manageEnv:env, envOptions: { autoescape:false } }))
    .pipe(rename(function (path){
    	path.extname = ".html";
    }))
    .pipe(dest( global.BASE_PATH + "/dist/" ))
    .pipe(global.CONNECT.reload());
    callback();
};

exports.build 	= _build;
exports.getEnv  = _getEnvironment;