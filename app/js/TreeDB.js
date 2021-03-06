define('TreeDB', function() {
    "use strict";

    function TreeDB() {
        console.log('TreeDB loaded');
    };

    TreeDB.prototype.get = function(id) {
        var elements = JSON.parse(localStorage.getItem("elements"));
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].id == id) {
                return elements[i];
            }
        }
    };

    TreeDB.prototype.getByParent = function(id) {
        var elements = JSON.parse(localStorage.getItem("elements"));
        var newElements = [];
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].parent == id) {
                newElements.push(elements[i]);
            }
        }
        return newElements;
    };

    TreeDB.prototype.remove = function(id) {
        var el = this.get(id);
        var elements = this.getAll();
        var newElements = [];

        for (var i = 0; i < elements.length; i++) {
            if (typeof el != 'undefined' && elements[i].children.indexOf(el.id) > -1) {
                elements[i].children.splice(elements[i].children.indexOf(el.id), 1);
            }
            if (elements[i].id != id && elements[i].parent != id) {
                newElements.push(elements[i]);
            }
        }

        return localStorage.setItem("elements", JSON.stringify(newElements));
    };

    TreeDB.prototype.add = function(data) {
        var elements = this.getAll();
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].id == data.parent) {
                elements[i].children.push(data.id);
            }
        }
        elements.push(data);
        return localStorage.setItem("elements", JSON.stringify(elements));
    };

    TreeDB.prototype.change = function(key, id, data) {
        var elements = this.getAll();
        var newElements = [];

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].id == id) {
                elements[i][key] = data;
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