define('TreeCtrlr', ['underscore', 'ApiCtrlr', 'TreeDB', 'TreeEvents'], function(_, ApiCtrlr, TreeDB, TreeEvents) {
    "use strict";

    function TreeCtrlr() {
        console.log('TreeCtrlr loaded');
        this.api = new ApiCtrlr();
        this.treeDB = new TreeDB();
        this.treeEvents = new TreeEvents();
        this.templates = {};
    };

    TreeCtrlr.prototype.setup = function() {
        var that = this;

        this.render({
            id: 'tree-root',
            data: that.treeDB.getAll(),
            complete: function(template) {
                document.getElementById('wrapper').innerHTML = '';
                document.getElementById('wrapper').insertAdjacentHTML('afterbegin', template);
                that.setupChilds(document.getElementById('wrapper'));
                that.treeEvents.create(document.getElementById('wrapper'), function() {
                    that.setup();
                });
            }
        });
    }

    TreeCtrlr.prototype.setupChilds = function(parentEls) {
        var that = this;

        var childElements = parentEls.querySelectorAll('ul.list-group');

        for (var i = 0; i < childElements.length; i++) {
            var parent = parseInt(childElements[i].getAttribute('data-parent')),
                parentEl = childElements[i];
            if (parent > 0) {
                var childData = that.treeDB.getByParent(parent);
                that.render({
                    id: 'tree-element',
                    data: childData,
                    complete: function(childEl) {
                        parentEl.insertAdjacentHTML('beforeend', childEl);
                        that.setupChilds(parentEl);
                    }
                });
            }
        };
    }


    TreeCtrlr.prototype.getTemplate = function(id, returnTemplate) {
        this.api.get({
            url: './templates/' + id + '.ejs',
            complete: function(template) {
                returnTemplate.call(this, template);
            }
        });
    };

    //Options: {
    //  id: template-name,
    //  data: {template-data: ''},
    //  completed: function(tpl){ template-with-data }
    //}
    TreeCtrlr.prototype.render = function(options) {
        var that = this;
        if (this.templates[options.id]) {
            var template = this.templates[options.id]((typeof options.data != typeof undefined) ? {
                data: options.data
            } : {
                data: []
            });
            options.complete.call(this, template);
        } else {
            this.getTemplate(options.id, function(tpl) {
                that.templates[options.id] = _.template(tpl);
                var template = that.templates[options.id]((typeof options.data != typeof undefined) ? {
                    data: options.data
                } : {
                    data: []
                });
                options.complete.call(this, template);
            });
        }
    };

    return TreeCtrlr;

});