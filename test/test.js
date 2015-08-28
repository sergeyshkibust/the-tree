var should = require('should'),
    supertest = require('supertest'),
    requirejs = require('requirejs');

requirejs.config({
    baseUrl: './app/js/',
    nodeRequire: require
});

var TreeController = requirejs('TreeController');
var TreeDB = requirejs('TreeDB');
var TreeEvents = requirejs('TreeEvents');

var tree = new TreeController();
var treeDB = new TreeDB();
var treeEvents = new TreeEvents();

    describe('Tree', function () {
      it('description', function (done) {
        tree.getTemplate();
        done();
      });
    });
//});
