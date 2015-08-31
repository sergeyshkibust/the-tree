define('TreeEvents', ['TreeDB', 'TreeController'], function(TreeDB, TreeController) {
    "use strict";

    function TreeEvents() {
        console.log('TreeEvents loaded');
        this.treeDB = new TreeDB();
        this.tree = new TreeController();
    };

    TreeEvents.prototype.create = function(parent) {
        var elements = parent.querySelectorAll('li');
        var treeEvents = this;
        for (var i = 0; i < elements.length; i++) {
            elements[i].removeEventListener();
            elements[i].addEventListener('click', function(e) {
                e.stopPropagation();
                if (e.target.nodeName == 'I') {
                    if (e.target.getAttribute('class').indexOf('folder') > -1) {
                        treeEvents.toggle(this);
                    }
                    if (e.target.getAttribute('class').indexOf('trash') > -1) {
                        if (confirm('Are you shure?')) {
                            treeEvents.delete(this);
                        }
                    }
                    if (e.target.getAttribute('class').indexOf('plus') > -1) {
                        var title = prompt("Please enter title", "Element title");

                        if (title != null) {
                            treeEvents.add(this, title);
                        }
                    }
                }
            });

            elements[i].querySelector('span').addEventListener('dblclick', function() {
                treeEvents.editor(this);
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
            "children": []
        });
    }

    TreeEvents.prototype.editor = function(element) {
        var that = this;
        if (element.parentNode.getAttribute('data-id') > 0) {
            element.innerHTML = '<input type="text" id="changed" value="' + element.innerText + '""/><input type="button" value="save" id="save"/>';

            element.querySelector('#save').addEventListener('click', function(e) {
                var newTitle = element.querySelector('#changed').value;
                if (newTitle.length > 0) {
                    that.treeDB.change(element.parentNode.getAttribute('data-id'), newTitle);
                    element.innerText = newTitle;
                } else {
                    alert('Please enter title!');
                }
            });
        } else {
            alert('This element can\'t be edited!');
        }
    }

    TreeEvents.prototype.delete = function(element) {
        this.treeDB.remove(element.getAttribute('data-id'));
        element.remove();
    }

    TreeEvents.prototype.toggle = function(element) {
        var that = this,
            el = 'fa fa-folder',
            elOpen = '-open',
            parentEl = element.parentNode,
            childData = [];

        if (element.querySelector('ul').getAttribute('data-parent') == element.getAttribute('data-id')) {
            if (element.querySelector('ul').innerHTML.length > 0) {
                element.querySelector('ul').innerHTML = '';
            } else {
                var children = this.treeDB.get(element.querySelector('ul').getAttribute('data-parent')).children;
                for (var i = 0; i < children.length; i++) {
                    childData.push(this.treeDB.get(children[i]));
                }
                this.tree.render({
                    id: 'tree-element',
                    data: childData,
                    complete: function(childEl) {
                        element.querySelector('ul').insertAdjacentHTML('beforeend', childEl);
                        that.create(element.querySelector('ul'));
                    }
                });
            }
        }
        if (element.querySelector('i').getAttribute('class').indexOf(elOpen) > -1) {
            element.classList.remove('open');
            element.querySelector('i').setAttribute('class', el);
        } else {
            element.classList.add('open');
            element.querySelector('i').setAttribute('class', el + elOpen);
        }
    }

    return TreeEvents;

});
