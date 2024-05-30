const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

const paths = {
  styles: {
    src: "styles/**/*.scss",
    dest: "dist/css",
  },
  scripts: {
    src: "src/**/*.js",
    dest: "dist/js",
  },
};

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(concat("style.min.css"))
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(concat("script.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
}

function watchFiles() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
}

const build = gulp.series(gulp.parallel(styles, scripts));

exports.styles = styles;
exports.scripts = scripts;
exports.watch = watchFiles;
exports.build = build;
exports.default = build;
