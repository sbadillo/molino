var gulp = require('gulp'),
browserSync = require('browser-sync').create(),
exec = require('child_process').exec,
sass = require('gulp-sass'),
uglify = require('gulp-uglify'),
concat = require('gulp-concat'),
debug = require('gulp-debug'),
merge = require('merge-stream'),
mainBowerFiles = require('main-bower-files'),
jshint = require('gulp-jshint'),
ignore = require('gulp-ignore'),
gutil = require('gulp-util');


// ==============================
//  vendor files to static folder
// ==============================

gulp.task('copy-vendor-files', function(cb) {

  // copy vendor js files
  var js_vendor = gulp.src(mainBowerFiles('**/*.js'))
  .pipe(debug({title:'detected vendor js:', showFiles:false}))
  .pipe(concat('vendor.js'))
  .pipe(debug({title:'concat/uglify to:'}))
  .pipe(gulp.dest('static/js/'));


  // copy own custom js files
  var js_own = gulp.src('source/js/**/*.js')
  .pipe(debug({title:'detected own js:', showFiles:false}))
  .pipe(concat('own.js'))
  .pipe(debug({title:'concat/uglify to:'}))
  .pipe(gulp.dest('static/js/'));

  // copy vendor CSS files 
  var css_vendor = gulp.src(mainBowerFiles('**/*.css'))
  .pipe(gulp.dest('static/css/'));

  return merge(js_vendor, js_own, css_vendor);
});

// ==============================
//  compile custom bootstrap to static folder
// ==============================

gulp.task('sass', function () {
	gulp.src('source/scss/main.scss')
	// .pipe(debug({title: 'compile:'}))
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('static/css/'));
});


// ==============================
//  run Pelican 
// ==============================

gulp.task('runPelican', ['copy-vendor-files', 'sass'], function (cb) {
	exec( 'pelican -d', { cwd: '../..'
}, function (err, stdout, stderr) {
	console.log(stdout);
	console.log(stderr);
	cb(err);
});
});	

gulp.task('default', ['copy-vendor-files','sass', 'runPelican'], function(){});



// ==============================
//  Serve watch and browsersync 
// ==============================


// auxiliary task to ensure browserSync runs after default is done.
gulp.task('reload-browser', ['default'], function(){
	// when changes arrive to output folder, refresh browser
	browserSync.reload()
});

// main 
gulp.task('serve', ['default'], function() {

	// initialize server at localhost:3000
	
	browserSync.init({
		server: "../../output"
	});
	
	// run all default tasks if sources change,
	// then reload browser
	
	gulp.watch([
		"../../pelicanconf.py",
		"./source/**/*.*",
		"./templates/*.html",
		"../../content/**/*.*"
		], ['reload-browser']);
	
});

