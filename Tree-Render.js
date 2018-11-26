function updateTree() {
    window.treeDrawer = new ECOTree('treeDrawer', 'treeContainer');

    treeDrawer.config.defaultNodeWidth = 70;
    treeDrawer.config.defaultNodeHeight = 20;
    treeDrawer.config.iSubtreeSeparation = 20;
    treeDrawer.config.iSiblingSeparation = 5;
    treeDrawer.config.iLevelSeparation = 40;
    treeDrawer.config.linkType = 'M';
    treeDrawer.config.useTarget = false;
    treeDrawer.config.nodeFill = ECOTree.NF_FLAT;
    treeDrawer.config.colorStyle = ECOTree.CS_NODE;
    treeDrawer.config.nodeColor = 'black';
    treeDrawer.config.nodeBorderColor = 'black';
    treeDrawer.config.linkColor = '#222';
    treeDrawer.config.selectMode = ECOTree.SL_NONE;

    let nodeId = 0;
    draw(tree.root, -1);

    treeDrawer.UpdateTree();

    function draw(node, parentId) {
		if (node == null) {
			return;
		}
		
        if (node == NULL) {
            treeDrawer.add(nodeId, parentId, node.data, null, null,
                node.isRed ? 'red' : 'black');
            return;
        }
        let currentNodeId = ++nodeId;

        treeDrawer.add(nodeId, parentId, node.data, null, null,
            node.isRed ? 'red' : 'black');

        draw(node.left, currentNodeId);
        draw(node.right, currentNodeId);
    }
}
