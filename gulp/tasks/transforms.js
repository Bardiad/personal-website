"use strict";

const { src, dest, series } = require( 'gulp' );
const svg_sprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');

const util = require("./common");
const config = util.getConfig('gulp.config.json');

function _buildSVGSprite(callback) {
	return src([global.SOURCES_BASE_PATH + "/assets/icons/*.svg"])
	.pipe(svgmin({
		js2svg: {
			pretty: true
		}
	}))
	.pipe(cheerio({
		run: function($) {
			$('[fill]').removeAttr('fill');
			$('[stroke]').removeAttr('stroke');
			$('[style]').removeAttr('style');
		},
		parserOptions: {xmlMode: true}
	}))
	.pipe(replace('&gt;', '>'))
	.pipe(svg_sprite({
		mode: {
			symbol: {
				sprite: global.BUILD_PATH + "img/icon-sprite.svg",
				render: {
					scss: {
						dest:'../../../sass/_sprite.scss',
						template: assetsDir + "sass/templates/_sprite_template.scss"
					}
				}
			}
		}		
	}))
};

exports.buildSVGSprite = _buildSVGSprite;