var fs = require('fs');

fs.createReadStream('node_modules/requirejs/require.js').pipe(fs.createWriteStream('app/js/require.js'));
fs.createReadStream('node_modules/underscore/underscore.js').pipe(fs.createWriteStream('app/js/underscore.js'));
fs.createReadStream('node_modules/bootstrap/dist/css/bootstrap.min.css').pipe(fs.createWriteStream('app/css/bootstrap.min.css'));
fs.createReadStream('node_modules/font-awesome/css/font-awesome.min.css').pipe(fs.createWriteStream('app/css/font-awesome.min.css'));
fs.createReadStream('node_modules/font-awesome/fonts/fontawesome-webfont.eot').pipe(fs.createWriteStream('app/fonts/fontawesome-webfont.eot'));
fs.createReadStream('node_modules/font-awesome/fonts/fontawesome-webfont.svg').pipe(fs.createWriteStream('app/fonts/fontawesome-webfont.svg'));
fs.createReadStream('node_modules/font-awesome/fonts/fontawesome-webfont.ttf').pipe(fs.createWriteStream('app/fonts/fontawesome-webfont.ttf'));
fs.createReadStream('node_modules/font-awesome/fonts/fontawesome-webfont.woff').pipe(fs.createWriteStream('app/fonts/fontawesome-webfont.woff'));
fs.createReadStream('node_modules/font-awesome/fonts/fontawesome-webfont.woff2').pipe(fs.createWriteStream('app/fonts/fontawesome-webfont.woff2'));
fs.createReadStream('node_modules/font-awesome/fonts/FontAwesome.otf').pipe(fs.createWriteStream('app/fonts/FontAwesome.otf'));
