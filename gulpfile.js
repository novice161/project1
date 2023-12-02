const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

function scripts() {
	return src([
		'node_modules/swiper/swiper-bundle.js',
		'src/**/*.js',
		'!src/js/main.min.js'
	])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('src/js'))
		.pipe(browserSync.stream())
}


function styles() {
	return src('src/sass/*.+(scss|sass)')
		.pipe(concat('style.min.css'))
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'] }))
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(dest('src/css'))
		.pipe(browserSync.stream())
}
function watching() {
	watch(['src/sass/*.+(scss|sass)'], styles)
	watch(['src/js/main.js'], scripts)
	watch(['src/**/*.html'],).on('change', browserSync.reload)

}


function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'src/'
		}
	});
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.default = parallel(styles, scripts, browsersync, watching);