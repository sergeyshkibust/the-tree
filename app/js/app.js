require(
	['TreeController', 'TreeDB', 'TreeEvents'],
	function(TreeController, TreeDB, TreeEvents)
	{

			var tree = new TreeController();
			var treeData = new TreeDB();
			var treeEvents = new TreeEvents();

			//Demo data
			if(treeData.getAll().length == 0){
				treeData.add({
						"id": 1,
				    "title": "First Root Element",
				    "parent": 0,
				    "children": []
			  });
			}
			// treeData.add({
		  //   "id": 2,
		  //   "title": "Second Element",
		  //   "parent": 1,
		  //   "children": []
		  // });
			// treeData.add({
		  //   "id": 3,
		  //   "title": "Third Element",
		  //   "parent": 1,
		  //   "children": [4]
		  // });
			// treeData.add({
		  //   "id": 4,
		  //   "title": "Last Element",
		  //   "parent": 3,
		  //   "children": []
		  // });
			//Demo data

			tree.render({
				id:'tree-root',
				data: treeData.getAll(),
				complete: function(template){
					document.getElementById('wrapper').insertAdjacentHTML('afterbegin', template);
					treeEvents.create(document.getElementById('wrapper'));
				}
			});
	}
);
