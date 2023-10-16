import gulp from "gulp";
import babel from "gulp-babel";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import cssUglify from "gulp-uglifycss";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import webP from "gulp-webp";
import autoprefixer from "gulp-autoprefixer";
import browserSync from "browser-sync";
import dotnet from "dotenv";
dotnet.config();

const SRC = "./src/assets/";
const JS = SRC + "**/*.js";
const SCSS = SRC + "scss/styles.scss";
const IMAGES = SRC + "images/**/*";
const BUILD = "./build";

gulp.task("js", jsCompiler);
gulp.task("css", cssCompiler);
gulp.task("webP", imagesToWebP);

gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    port: process.env.SERVER_PORT
  });
  gulp
    .watch(["./**/*.html", "./build/**/*"])
    .on("change", () => browserSync.reload());
});

gulp.task("watch-js", () => gulp.watch(JS, jsCompiler));
gulp.task("watch-css", () => gulp.watch(SCSS, cssCompiler));

gulp.task("watch", gulp.parallel("watch-css", "watch-js", "browser-sync"));
gulp.task("default", gulp.parallel("css", "js", "webP"));

async function imagesToWebP() {
  gulp
    .src(IMAGES)
    .pipe(webP())
    .pipe(gulp.dest(BUILD + "/images"));
}

async function jsCompiler() {
  gulp
    .src(JS)
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(gulp.dest(BUILD + "/js"));
}

async function cssCompiler() {
  gulp
    .src(SCSS)
    .pipe(sass())
    .pipe(autoprefixer("last 2 versions"))
    .pipe(cssUglify())
    .pipe(gulp.dest(BUILD + "/css"));
}
