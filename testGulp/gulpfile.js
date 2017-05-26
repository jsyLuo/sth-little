var gulp = require('gulp')

var uglify = require('gulp-uglify')
var minifyCSS = require('gulp-minify-css')



gulp.task('script', function(){
    gulp.src('./src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dst'))
})


gulp.task('css',function(){
    gulp.src('./src/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dst'))
})

//gulp.task('auto',function(){
   // gulp.watch('G:/webDep/assets/stylesheets/**/*.css',['css'])
//});


gulp.task('default',['script','css'])