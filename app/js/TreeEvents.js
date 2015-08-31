define('TreeEvents', function() {
	"use strict";

	function TreeEvents() {
		console.log('TreeEvents loaded');

		this.add();
	};

	TreeEvents.prototype.add = function() {
		var elements = document.getElementById('tree-root').querySelectorAll('li');
		var treeEvents = this;
		for(var i = 0; i < elements.length; i++) {
			elements[i].querySelector('i').addEventListener('click', function(){
				treeEvents.toggle(this, elements[i]);
			});

			elements[i].querySelector('span').addEventListener('dblclick', function(){
				treeEvents.editor(this);
			});
		}
	}

	TreeEvents.prototype.editor = function(element) {
		if(element.getAttribute('data-id') > 0) {

		} else {
			alert('This element can\'t be edited!');
		}
	}	

	TreeEvents.prototype.toggle = function(element, parent) {
		var el = 'fa fa-folder',
			elOpen = '-open';

		if(parent.querySelector('ul').getAttribute('data-root')) {
			alert(parent.querySelector('ul').getAttribute('data-root'));
		}

		if(element.getAttribute('class').indexOf(elOpen) > -1) {
			element.setAttribute('class', el);
		} else {
			element.setAttribute('class', el+elOpen);
		}
		
	}

	return TreeEvents;

});
