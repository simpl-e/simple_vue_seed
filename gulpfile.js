var gulp = require('gulp');
var rjs = require('requirejs');

//http://requirejs.org/docs/optimization.html
var config = {
    mainConfigFile: 'main.js',
    preserveLicenseComments: false,
    dir: 'www-built',
    modules: [
        {
            name: 'main',
            create: true,
            exclude: ['require-css/normalize']
        }
    ]
};

//https://stackoverflow.com/questions/28999621/using-requirejs-optimizer-node-module-with-gulp
gulp.task('bundle', function () {
    rjs.optimize(config);
});
