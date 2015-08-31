require(
    ['TreeController', 'TreeDB', 'TreeEvents'],
    function(TreeController, TreeDB, TreeEvents) {

        var tree = new TreeController();
        var treeData = new TreeDB();
        var treeEvents = new TreeEvents();

        //Demo data
        if (treeData.getAll().length == 0) {
            treeData.add({
                "id": 1,
                "title": "First Root Element",
                "parent": 0,
                "children": []
            });
        }
        //Demo data

        tree.render({
            id: 'tree-root',
            data: treeData.getAll(),
            complete: function(template) {
                document.getElementById('wrapper').insertAdjacentHTML('afterbegin', template);
                treeEvents.create(document.getElementById('wrapper'));
            }
        });
    }
);
