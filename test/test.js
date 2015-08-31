var should = require('should'),
    supertest = require('supertest'),
    requirejs = require('requirejs');

requirejs.config({
    baseUrl: './app/js/',
    nodeRequire: require
});

var TreeController = requirejs('TreeController');
var TreeDB = requirejs('TreeDB');
//var TreeEvents = requirejs('TreeEvents');

var tree = new TreeController();
var treeDB = new TreeDB();
//var treeEvents = new TreeEvents();

    describe('Tree', function () {
      it('add new element', function (done) {
        treeDB.add({
            title: 'Test',
            root: 0,
            order: 1
        });
        done();
      });
    });
//});
