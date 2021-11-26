"use strict";

const { src, dest, series } = require( 'gulp' );
const fs = require('fs');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));

const util = require("./common");
const config = util.loadConfig('gulp.config.json');

const _env = process.env.NODE_ENV || 'development';

const inputs = config.project.inputs.scss;
const outputs = config.project.outputs.css;

const opts = {"outputStyle" : "expanded"};

console.log(inputs);
console.log(outputs);
console.log(opts);

function _build(callback) {
    return src(inputs)
        .pipe(sass.sync( opts ).on('error', sass.logError))
        .pipe(postcss([require('autoprefixer')], { browsers: ['last 2 versions', 'ie > 10'] }))            
        .pipe(dest(outputs));
}

exports.build = _build;