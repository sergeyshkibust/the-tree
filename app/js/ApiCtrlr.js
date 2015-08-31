define('ApiCtrlr', function() {
	"use strict";

	function ApiCtrlr(config) {
		console.log('ApiCtrlr: loaded.');
	}

	//Get, send data using XmlHttp;
	ApiCtrlr.prototype.json = function(settings){
		var that = this;
		//IE 11 Support (tested on Windows 8.1)
		//IE 10 Support (tested on Windows 8)
		//IE 9.0 No Support (tested on Windows 7)
		var request = new XMLHttpRequest();

		request.open(settings.type, settings.url, true);

		request.timeout = 10000;
		request.withCredentials = true;

		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				request.complete = settings.complete;
				request.name = (settings.name) ? settings.name : null;
				that.done(request);
			}
		};

		if(typeof settings.data != 'object') {
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}
		if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
		{
			request.setRequestHeader('Accept', 'application/json');
		}
		request.send(settings.data);
	};

	ApiCtrlr.prototype.handleData = function(options) {
		if (typeof(options.complete) == typeof(undefined)) {
			return options.data;
		}
		else {
			return options.complete.call(this, options.data, options.name);
		}
	};

	ApiCtrlr.prototype.isJson = function(value) {
		if (/^[\],:{}\s]*_/.test(value.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
			return JSON.parse(value);
		} else {
			return value;
		}
	};

	ApiCtrlr.prototype.done = function(request) {
		if (request.status == 200 || request.status == 201 || request.status == 400 || request.status == 404 || request.status == 409) {
			if (request.responseText !== '' && typeof(request.responseText) !== typeof(undefined)) {
				this.response = this.handleData({
					data: this.isJson(request.responseText),
					name: (request.name) ? request.name : null,
					complete: request.complete
				});
			} else {
				this.response = this.handleData({
					data: {
						"status": request.status,
						"response": request.responseText
					},
					name: (request.name) ? request.name : null,
					complete: request.complete
				});
			}
		} else {
			console.log('New status, check system!', request);
		}
	};

	//GET
	ApiCtrlr.prototype.get = function(options)
	{
		this.json({
			url: options.url,
			type: 'GET',
			complete: options.complete
		});
	}

	return ApiCtrlr;
});
