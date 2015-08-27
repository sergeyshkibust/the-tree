define('TreeDB', function(){
	"use strict";

	function TreeDB() {
    console.log('TemplateCtrlr loaded');
	};

	TreeDB.prototype.get = function(id) {
		return localStorage.getItem("element-" + id);
	};
	
	TreeDB.prototype.remove = function(id) {
		return localStorage.removeItem("element-" + id);
	};
	
	TreeDB.prototype.set = function(id, data) {
	
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

define('TreeEvents', function() {
	"use strict";

	function TreeEvents() {
    console.log('TemplateCtrlr loaded');
    
    this.add();
	};

	TreeEvents.prototype.add = function() {
		var elements = document.getElementById('tree-root').querySelectorAll('li');
		for(var i = 0; i < elements.length; i++) {
			elements[i].querySelector('i').addEventListener('click', function(){
				alert(this.getAttribute('class'));
			});
		}
	}

	return TreeEvents;
	
});

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

require(
	['TreeController', 'TreeDB', 'TreeEvents'], 
	function(TreeController, TreeDB, TreeEvents)
	{
		
			var tree = new TreeController();
			var treeData = new TreeDB();
			var treeEvents = new TreeEvents();
			
			treeData.set(treeData.getAll().length++, {
				title: 'Test',
				root: 1,
				order: 1
			});
			
			for ( var i = 1, len = treeData.getAll().length; i < len; ++i ) {
				tree.render({
					id:'treeElement',
					data: JSON.parse(treeData.get(i)),
					completed: function(template){
						console.log(template);
					}
				});
			}
	}
);
