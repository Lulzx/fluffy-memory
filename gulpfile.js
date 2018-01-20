const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const newer = require('gulp-newer');

const src = 'src/**/*.js';
const dest = 'dist';

gulp.task('babel', () => {
  return gulp.src([src])
    .pipe(newer(dest))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  gulp.watch(src, ['babel']);
});

gulp.task('default', ['babel']);