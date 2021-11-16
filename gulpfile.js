const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
//const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "../dist"
        }
    });

    gulp.watch("../project_BEM/*.html").on("change", browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("../project_BEM/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("../dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("../project_BEM/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
    gulp.watch("../project_BEM/*.html").on('change', gulp.parallel('html'));
});

gulp.task('html', function() {
    return gulp.src("../project_BEM/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("../dist/"));
});

gulp.task('scripts', function() {
    return gulp.src("../project_BEM/js/**/*.js")
        .pipe(gulp.dest("../dist/js"));
});

gulp.task('fonts', function() {
    return gulp.src("../project_BEM/fonts/**/*")
        .pipe(gulp.dest("../dist/fonts"));
});

gulp.task('icons', function() {
    return gulp.src("../project_BEM/icons/**/*")
        .pipe(gulp.dest("../dist/icons"));
});

gulp.task('mailer', function() {
    return gulp.src("../project_BEM/mailer/**/*")
        .pipe(gulp.dest("../dist/mailer"));
});

gulp.task('images', function() {
    return gulp.src("../project_BEM/img/**/*")
        .pipe(gulp.dest("../dist/img"));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'mailer', 'html', 'images'));