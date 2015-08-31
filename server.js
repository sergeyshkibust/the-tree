var http = require('http'),
		connect = require('connect'),
		serveStatic = require('serve-static'),

		//Server PORT
		SERV_PORT = 8080,
		//Server instance
		app,

		app = connect()
			.use(serveStatic('app'));

		http.createServer(app).listen(SERV_PORT, function() {
			console.log('Running on http://localhost:8080');
		});
