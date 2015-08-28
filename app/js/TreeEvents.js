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
