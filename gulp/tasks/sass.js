"use strict";

const { src, dest, series } = require( 'gulp' );
const fs = require('fs');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));

const util = require("./common");
const config = util.getConfig('gulp.config.json');

const opts = {"outputStyle" : "expanded"};

function _buildCSS(callback) {
    return src("./src/_temp/scss/main.scss")
        .pipe(sass.sync( opts ).on('error', sass.logError))
        .pipe(postcss([require('autoprefixer')], { browsers: ['last 2 versions', 'ie > 10'] }))            
        .pipe(dest( "./dist/css/" ));
}

exports.buildCSS = _buildCSS;