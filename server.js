var http = require('http'),
		connect = require('connect'),
		serveStatic = require('serve-static'),
		
		//Server PORT
		SERV_PORT = 8080,
		//Server instance
		app,
		
		app = connect()  
			.use(serveStatic('app'))
			.use('/js/', serveStatic('node_modules/requirejs/'))
			.use('/js/', serveStatic('node_modules/jquery/dist/'))
			.use('/js/', serveStatic('node_modules/backbone/node_modules/underscore/'))
			.use('/js/', serveStatic('node_modules/backbone/'))
			.use('/js/', serveStatic('node_modules/backbone.localstorage/'))
			.use('/css/', serveStatic('node_modules/bootstrap/dist/css'));

		http.createServer(app).listen(SERV_PORT, function() {  
			console.log('Running on http://localhost:8080');
		});
