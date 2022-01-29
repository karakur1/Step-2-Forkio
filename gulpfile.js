const { series, parallel, watch, src, dest } = require("gulp");
const gulp = require("gulp");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify-es").default; //   ЗАМЕНИТЬ НА  Terser    Uglify - не поддерживается больше
const del = require("del"); //    покурить Асинхронное применение чтобы не ругалось

function script() {
  return gulp
    .src("./src/js/**/*.js")
    .pipe(concat("script.js"))
    .pipe(
      uglify({
        toplevel: true,
      })
    )
    .pipe(dest("./dist/js/"));
}

//                              уточнить как выставить последовательность в SAAS    + include path
function styles() {
  return gulp
    .src("./src/styles/**/*.*")
    .pipe(concat("style.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: [">0.1%"], //   прочекать на ФайлБраузеров
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(dest("./dist/styles/"));
}

function html() {
  return gulp.src("./src/**/*.html").pipe(dest("./dist/"));
}

function watcher() {
  watch("./src/styles/**/*.*", styles);
  watch("./src/js/**/*.js", script);
  watch("./src/**/*.html", html);
}

// function clearDist() {
//   del("./dist/*");
// }

async function clearDist() {
  return await del("./dist/*");
}

exports.styles = styles;
exports.script = script;
exports.html = html;
exports.watcher = watcher;
exports.clearDist = clearDist;

exports.build = series(clearDist, watcher, parallel(script, styles, html));
