var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var cache = require("gulp-cache");

gulp.task("imagemin", function(){
  return gulp.src("public/images/*.+(png|svg|jpg|gif)")
    .pipe(cache(imagemin()))
    .pipe(gulp.dest("dist/images"));
});
