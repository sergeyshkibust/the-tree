define('TreeController', ['underscore'], function(_) {
	"use strict";

	function TreeController() {
    console.log('TemplateCtrlr loaded');
	};

	TreeController.prototype.getTemplate = function(id) {
		var template = (document.getElementById(id)) ?
		document.getElementById(id).innerHTML :
		'Temaplte not found. ID: ' + id;

		return template;
	};

	TreeController.prototype.render = function(options) {
		var compile = _.template(this.getTemplate(options.id));
		var template = compile((typeof options.data != typeof undefined) ? options.data : {});
		(typeof options.completed === 'function') ? options.completed.call(this, template) : false;
	};

	return TreeController;

});
