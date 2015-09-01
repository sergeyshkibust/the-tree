require(
    ['TreeCtrlr', 'TreeDB'],
    function(TreeCtrlr, TreeDB) {

        var tree = new TreeCtrlr();
        var treeDB = new TreeDB();
        //Demo data
        if (treeDB.getAll().length == 0) {
            treeDB.add({
                "id": 1,
                "title": "First Root Element",
                "parent": 0,
                "state": 0,
                "children": []
            });
        }
        //Demo data

        tree.setup();
    }
);
