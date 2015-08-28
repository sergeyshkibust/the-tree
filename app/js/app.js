require(
	['TreeController', 'TreeDB', 'TreeEvents'],
	function(TreeController, TreeDB, TreeEvents)
	{

			var tree = new TreeController();
			var treeData = new TreeDB();
			var treeEvents = new TreeEvents();

			treeData.set(treeData.getAll().length++, {
				title: 'Test',
				root: 1,
				order: 1
			});

			for ( var i = 1, len = treeData.getAll().length; i < len; ++i ) {
				tree.render({
					id:'treeElement',
					data: JSON.parse(treeData.get(i)),
					completed: function(template){
						console.log(template);
					}
				});
			}
	}
);
