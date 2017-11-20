var gulp = require('gulp')
var uglify = require('gulp-uglify')
var minifyCSS = require('gulp-minify-css')
var htmlMin = require('gulp-htmlmin')
var fileConcat = require('gulp-concat')
var dirClean = require('gulp-clean')
var rename = require('gulp-rename')


gulp.task('jsOp', function(){
    gulp.src('./src/*.js')    // gulp.src('./src/**//*.js') 
        .pipe(uglify())
        .pipe(gulp.dest('./dst'))
})


gulp.task('cssOp',function(){
    gulp.src('./src/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dst'))
})


gulp.task('htmlOp', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('./src/*.html')
        .pipe(htmlMin(options))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dst'));
});


gulp.task('jsAll',function(){
    gulp.src('./src/*.js')       //gulp.src(['a.js', 'b.js', 'c.js'])
        .pipe(fileConcat('all.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./dst'))
})

gulp.task('cssAll',function(){
    gulp.src('./src/*.css')
        .pipe(fileConcat('all.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dst'))
})

gulp.task('clean', function() {
     gulp.src('./dst/*')    
    .pipe(dirClean({force: true}));
});

//gulp.task('auto',function(){
   // gulp.watch('G:/webDep/assets/stylesheets/**/*.css',['css'])
//});


gulp.task('default',['clean','jsAll','cssAll','htmlOp'])