var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var uglify=require('gulp-uglify');
var less=require('gulp-less');
var css=require('gulp-clean-css');
var rename=require('gulp-rename');
gulp.task('default', function () {
  // 将你的默认的任务代码放在这
  console.log('打包成功');


  gulp.watch("src/js/*.js",["uglify"]);
	gulp.watch("src/less/*.less",["less"]);
  browserSync.init({
    //开启一个静态服务器，以当前目录为网站根目录
    server: {
      baseDir: "./"
    }
  });

});
//压缩js
gulp.task('uglify',function(){
	//压缩js
	gulp.src('src/js/*.js').pipe( uglify() ).pipe( rename(function(path){
		path.basename+='.min';
	}) ).pipe( gulp.dest('dist/js') );
});

//压缩css
gulp.task('less',function(){
	//压缩less
	gulp.src('src/less/*.less').pipe( less() ).pipe( css() ).pipe( rename(function(path){
		path.basename+='.min';
	}) ).pipe( gulp.dest('dist/css') );
});

