import autoprefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel';
import csso from 'gulp-csso';
import dartSass from 'sass';
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
const sass = gulpSass(dartSass);

function css(cb) {
  gulp
      .src('styles/**/*.scss')
      .pipe(sass())
      .pipe(sourcemaps.init())
      .pipe(autoprefixer())
      .pipe(csso())
      .pipe(
          rename({
            extname: '.min.css'
          })
      )
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/'));
  cb();
}

function js(cb) {
  gulp
      .src('scripts/**/*.js')
      .pipe(
          babel({
            presets: ['@babel/env']
          })
      )
      .pipe(uglify())
      .pipe(
          rename({
            extname: '.min.js'
          })
      )
      .pipe(gulp.dest('dist/'));
  cb();
}
function watchFiles() {
  gulp.watch('styles/**/*.scss', css);
  gulp.watch('scripts/**/*.js', js);
}
export default gulp.parallel(css, js);
export const watch = gulp.parallel(watchFiles);