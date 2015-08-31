requirejs.config({
    baseUrl: '/js/',
    nodeRequire: require
});
describe('Tree DB', function() {
    it('add new element', function(done) {
        requirejs(['TreeDB'], function(TreeDB) {
            var treeDB = new TreeDB();

            localStorage.clear();

            treeDB.add({
                'id': 1,
                'title': 'Test title',
                'parent': 0,
                'children': []
            });

            var data = JSON.parse(localStorage.getItem('elements'));

            if (data.length == 1) {
                done();
            } else {
                throw "Not added"
            }
        });
    });

    it('change element title', function(done) {
        requirejs(['TreeDB'], function(TreeDB) {
            var treeDB = new TreeDB();

            treeDB.change(1, 'New title');

            var data = JSON.parse(localStorage.getItem('elements'));

            if (data[0].title == 'New title') {
                done();
            } else {
                throw "Not changed"
            }
        });
    });

    it('get element by id', function(done) {
        requirejs(['TreeDB'], function(TreeDB) {
            var treeDB = new TreeDB();

            var testData = treeDB.get(1);

            var data = JSON.parse(localStorage.getItem('elements'));

            if (data[0].title == testData.title && data[0].id == testData.id) {
                done();
            } else {
                throw "Error while getting element by id"
            }
        });
    });

    it('get all elements', function(done) {
        requirejs(['TreeDB'], function(TreeDB) {
            var treeDB = new TreeDB();

            var testData = treeDB.getAll();

            var data = JSON.parse(localStorage.getItem('elements'));

            if (data.length == testData.length) {
                done();
            } else {
                throw "Error while getting all elements"
            }
        });
    });

    it('delete element by id', function(done) {
        requirejs(['TreeDB'], function(TreeDB) {
            var treeDB = new TreeDB();

            treeDB.remove(1);
            var data = JSON.parse(localStorage.getItem('elements'));

            if (data.length == 0) {
                done();
            } else {
                throw "Error while deleteing element"
            }
        });
    });
});

describe('Tree Controller', function() {
    it('Get template by id', function(done) {
        requirejs(['TreeController'], function(TreeController) {
            var treeController = new TreeController();

            treeController.getTemplate('tree-root', function(tpl) {
                if (tpl.indexOf('Cannot GET') == -1) {
                    done();
                } else {
                    throw "Not added"
                }
            });
        });
    });

    it('Render template by id', function(done) {
        requirejs(['TreeController'], function(TreeController) {
            var treeController = new TreeController();

            treeController.render({
                id: 'tree-root',
                data: [{
                    "id": 1,
                    "title": "First Root Element",
                    "parent": 0,
                    "children": []
                }],
                complete: function(template) {
                    if (template.indexOf('Cannot GET') == -1 && template.indexOf('First Root Element')) {
                        done();
                    } else {
                        throw "Not added"
                    }
                }
            });
        });
    });
});
