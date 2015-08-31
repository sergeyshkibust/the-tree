define('TreeController', ['underscore', 'ApiCtrlr'], function(_, ApiCtrlr) {
	"use strict";

	function TreeController() {
    console.log('TemplateCtrlr loaded');
		this.api = new ApiCtrlr();
		this.templates = {};
	};

	TreeController.prototype.getTemplate = function(id, returnTemplate) {
		this.api.get({
			url: '/templates/' + id + '.ejs',
			complete: function(template) {
				returnTemplate.call(this, template);
			}
		});
	};

	//Options: {
	//	id: template-name,
	//	data: {template-data: ''},
	//	completed: function(tpl){ template-with-data }
	//}
	TreeController.prototype.render = function(options) {
		var that = this;
		if(this.templates[options.id]) {
			var template = this.templates[options.id]((typeof options.data != typeof undefined) ? {data: options.data} : {data: []});
			options.complete.call(this, template);
		} else {
			this.getTemplate(options.id, function(tpl) {
				that.templates[options.id] = _.template(tpl);
				var template = that.templates[options.id]((typeof options.data != typeof undefined) ? {data: options.data} : {data: []});
				options.complete.call(this, template);
			});
		}
	};

	return TreeController;

});
