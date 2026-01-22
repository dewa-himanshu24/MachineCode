import { useState } from 'react'

import FileExplorer from './component/FileExplorer/FileExplorer';
import fileExplorerData from './data/fileExplorer';
import useTraverseTree from './hooks/useTraverseTree';


function App() {

  const [data, setData] = useState(fileExplorerData);

  const { insertNode, deleteNode, renameNode } = useTraverseTree();

  const handleInsertNode = (id, name, isFolder) => {
    const finalTree = insertNode(data, id, name, isFolder);
    setData(finalTree);
  }

  const handleDeleteNode = (itemId) => {
    // Edge case: Don't delete the root
    if (itemId === data.id) {
      alert("Cannot delete the root folder!");
      return;
    }
    const finalTree = deleteNode(data, itemId);
    setData({ ...finalTree });
  };

  // Handler for renaming
  const handleRenameNode = (itemId, newName) => {
    const finalTree = renameNode(data, itemId, newName);
    setData({ ...finalTree });
  };

  return (
    <>
      <FileExplorer 
        data={data} 
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleRenameNode={handleRenameNode}
      />
    </>
  )
}

export default App
