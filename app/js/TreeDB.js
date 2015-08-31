define('TreeDB', function(){
	"use strict";

	function TreeDB() {
    	console.log('TreeDB loaded');
	};

	TreeDB.prototype.get = function(id) {
		return localStorage.getItem("element-" + id);
	};

	TreeDB.prototype.remove = function(id) {
		return localStorage.removeItem("element-" + id);
	};

	TreeDB.prototype.add = function(data) {

		//Verify data
		var id = this.getAll().length + 1;
		return localStorage.setItem("element-" + id, JSON.stringify(data));
	};

	TreeDB.prototype.change = function(id, data) {

		//Verify data

		return localStorage.setItem("element-" + id, JSON.stringify(data));
	};

	TreeDB.prototype.move = function(id, root, order) {
		console.log(localStorage);
	};

	TreeDB.prototype.getAll = function() {
		return localStorage;
	};

	return TreeDB;

});
