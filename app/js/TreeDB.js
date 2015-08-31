define('TreeDB', ['underscore'], function(_){
	"use strict";

	function TreeDB() {
    	console.log('TreeDB loaded');
	};

	TreeDB.prototype.get = function(id) {
		var data = JSON.parse(localStorage.getItem("elements"));
		var el = _.find(data, function(obj) { return obj.id == id })
		return el;
	};

	TreeDB.prototype.remove = function(id) {
		var el = this.get(id);

		var elements = this.getAll();
		var newElements = [];

		for(var i = 0; i < elements.length; i++) {
			if(elements[i].children.indexOf(el.id) > -1) {
				elements[i].children.splice(elements[i].children.indexOf(el.id), 1);
			}
			if(elements[i].id != id && elements[i].parent != id) {
				newElements.push(elements[i]);
			}
		}

		return localStorage.setItem("elements", JSON.stringify(newElements));
	};

	TreeDB.prototype.add = function(data) {
		var elements = this.getAll();
		for(var i = 0; i < elements.length; i++) {
			if(elements[i].id == data.parent) {
				elements[i].children.push(data.id);
			}
		}
		elements.push(data);
		return localStorage.setItem("elements", JSON.stringify(elements));
	};

	TreeDB.prototype.change = function(id, data) {
		var elements = this.getAll();
		var newElements = [];

		for(var i = 0; i < elements.length; i++) {
			if(elements[i].id == id) {
				elements[i].title = data;
			}
			newElements.push(elements[i]);
		}
		return localStorage.setItem("elements", JSON.stringify(newElements));
	};

	TreeDB.prototype.getAll = function() {
		return JSON.parse(localStorage.getItem("elements")) || [];
	};

	return TreeDB;

});
