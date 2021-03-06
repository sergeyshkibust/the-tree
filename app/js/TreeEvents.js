define('TreeEvents', ['TreeDB', 'ModalCtrlr'], function(TreeDB, ModalCtrlr) {
    "use strict";

    function TreeEvents() {
        console.log('TreeEvents loaded');
        this.treeDB = new TreeDB();
        this.modal = new ModalCtrlr();
    };

    TreeEvents.prototype.create = function(parent, rebuild) {
        var elements = parent.querySelectorAll('li.list-group-item');
        var that = this;
        for (var i = 0; i < elements.length; i++) {
            elements[i].removeEventListener('click');
            elements[i].addEventListener('click', function(e) {
                e.stopPropagation();
                if (e.target.nodeName == 'I') {
                    if (e.target.getAttribute('class').indexOf('fa-caret-square') > -1) {
                        that.toggle(e.target);
                        rebuild.call(this);
                    }
                    if (e.target.getAttribute('class').indexOf('trash') > -1) {
                        that.modal.confirm(function() {
                            that.treeDB.remove(e.target.parentNode.getAttribute('data-id'));
                            rebuild.call(this);
                        });
                    }
                    if (e.target.getAttribute('class').indexOf('plus') > -1) {
                        that.modal.prompt(function(title) {
                            if (title) {
                                that.add(e.target, title);
                                rebuild.call(this);
                            }
                        });
                    }
                }
            });

            elements[i].querySelector('.text').addEventListener('dblclick', function(e) {
                e.stopPropagation();
                if (e.target.getAttribute('class') != null && e.target.getAttribute('class').indexOf('text') > -1) {
                    that.editor(this);
                }
            });
        }
    }

    TreeEvents.prototype.add = function(element, title) {
        var allData = this.treeDB.getAll(),
            last = allData[allData.length - 1];

        this.treeDB.add({
            "id": ++last.id,
            "title": title,
            "parent": parseInt(element.parentNode.querySelector('ul').getAttribute('data-parent')),
            "state": 0,
            "children": []
        });
    }

    TreeEvents.prototype.editor = function(element) {
        var that = this;
        if (element.parentNode.getAttribute('data-id') > 0) {
            var oldTitle = element.innerText;
            element.innerHTML = '<input type="text" id="changed" value="' + element.innerText + '""/><input type="button" value="save" id="save"/><input type="button" value="cancel" id="cancel"/>';

            element.querySelector('#save').addEventListener('click', function(e) {
                var newTitle = element.querySelector('#changed').value;
                if (newTitle.length > 0) {
                    that.treeDB.change('title', element.parentNode.getAttribute('data-id'), newTitle);
                    element.innerText = newTitle;
                } else {
                    alert('Please enter title!');
                }
            });
            element.querySelector('#cancel').addEventListener('click', function(e) {
                element.innerText = oldTitle;
            });
        } else {
            alert('This element can\'t be edited!');
        }
    }

    TreeEvents.prototype.toggle = function(element) {
        var that = this,
            parentEl = element.parentNode;
        if (parentEl.querySelector('i').getAttribute('class').indexOf('fa-caret-square-o-right') > -1) {
            that.treeDB.change('state', parentEl.getAttribute('data-id'), 1);
            parentEl.querySelector('i.fa-caret-square-o-right').setAttribute('class', 'fa fa-caret-square-o-down');
        } else {
            that.treeDB.change('state', parentEl.getAttribute('data-id'), 0);
            parentEl.querySelector('i.fa-caret-square-o-down').setAttribute('class', 'fa fa-caret-square-o-right');
        }
    }

    return TreeEvents;

});