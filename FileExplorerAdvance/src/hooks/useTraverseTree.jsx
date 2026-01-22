function useTraverseTree() {

  const insertNode = (tree, id, value, isFolder) => {
    if (tree.id === id && tree.isFolder) {
      tree.children.unshift({
        id: new Date().getTime(),
        name: value,
        isFolder,
        children: [],
      });
      return tree;
    }

    let latestNode = tree.children?.map((child) => (
      insertNode(child, id, value, isFolder)
    ))

    return {...tree, children: latestNode};
  }

  // 2. DELETE logic
  const deleteNode = (tree, id) => {
    // Check if any of the children is the one we want to delete
    // We use .filter() to remove the item from the items array
    const filteredItems = tree.items.filter((item) => item.id !== id);

    // If the lengths are different, it means we found and removed the item in this level
    if (filteredItems.length !== tree.items.length) {
      return { ...tree, items: filteredItems };
    }

    // Otherwise, keep searching deeper
    const latestNode = tree.items.map((ob) => deleteNode(ob, id));
    return { ...tree, items: latestNode };
  };

  // 3. RENAME logic
  const renameNode = (tree, id, newName) => {
    if (tree.id === id) {
      tree.name = newName;
      return tree;
    }

    const latestNode = tree.items.map((ob) => renameNode(ob, id, newName));
    return { ...tree, items: latestNode };
  };

  return {
    insertNode,
    deleteNode,
    renameNode

  }
}

export default useTraverseTree;