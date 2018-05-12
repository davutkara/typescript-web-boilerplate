const   gulp = require('gulp'),
        minify = require('gulp-minify'),
        minifyCSS = require('gulp-minify-css'),
        rename = require('gulp-rename'),
        concat = require('gulp-concat'),
        browserSync = require('browser-sync'),
        nodemon = require('gulp-nodemon');;

gulp.task('styles', () => {
	gulp.src('app/public/css/**/*.css')
		.pipe(minifyCSS())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('build/public/dist/css'))
});

gulp.task('scripts', () => {
	gulp.src(['app/public/js/**/*.js'])
		.pipe(concat('all.js'))
		.pipe(minify({
			ext: {
				min: '.min.js'
			},
			noSource: true
		}))
		.pipe(gulp.dest('build/public/dist/js'))
});

gulp.task('hbs', () => {
    gulp.src(["app/views/**/*.hbs"])
        .pipe(gulp.dest('build/views'))
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["build/**/*.*"],
        browser: "google chrome",
        port: 7000,
	});
});

gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: './build/start.js'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true; 
		} 
	});
});


gulp.task('watch', () => {
	gulp.watch('app/public/css/**/*.css', ['styles']);
    gulp.watch('app/public/js/**/*.js', ['scripts']);
    gulp.watch('app/views/**/*.hbs', ['hbs']);    
});

gulp.task('default', ['hbs','styles', 'scripts', 'watch','nodemon','browser-sync']);