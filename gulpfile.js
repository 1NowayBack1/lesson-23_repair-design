const {src, dest, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Static server
function bs() {
    serveSass();
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    watch("./*.html").on('change', browserSync.reload);
    watch("./sass/**/*/.sass", serveSass);
    watch("./sass/**/*/.scss", serveSass);
    watch("./js/*.js").on('change', browserSync.reload);
};

//Sass
function serveSass() {
  return src('src/sass/**/*.sass', 'src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('src/css'))
    .pipe(browserSync.stream());
};

exports.serve = bs;