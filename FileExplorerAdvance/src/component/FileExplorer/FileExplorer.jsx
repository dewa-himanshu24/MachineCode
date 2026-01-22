import React, { useState } from 'react';

const FileExplorer = ({ data, handleInsertNode, handleDeleteNode, handleRenameNode }) => {

  const [expand, setExpand] = useState(false);
  const [inputOption, setInputOption] = useState({
    isVisible: false,
    isFolder: null,
  })

  const handleAddItem = (e) => {
    if (e.keyCode === 13 && data.isFolder) {
      handleInsertNode(data.id, e.target.value, inputOption.isFolder);
      setInputOption((prev) => ({ ...prev, isVisible: false }));
    }
  }

  const onDelete = (e) => {
    e.stopPropagation();
    handleDeleteNode(data.id);
  };

  const onRename = (e) => {
    e.stopPropagation();
    const newName = prompt("Enter new name:", data.name);
    if (newName) handleRenameNode(data.id, newName);
  };

  return (
    <div>
      <div onClick={() => setExpand(!expand)}>
        {data.isFolder ? <span>📁</span> : <span>📄</span>} {data.name}
        {data.isFolder &&
          (
            <span>
              <button onClick={onRename}>✏️</button>
              <button onClick={onDelete}>🗑️</button>
              <button
                onClick={() => setInputOption({
                  isVisible: true,
                  isFolder: true,
                })}
              >+📁</button>
              <button
                onClick={() => setInputOption({
                  isVisible: true,
                  isFolder: false,
                })}
              >+📄</button>
            </span>
          )}
      </div>

      <div style={{ marginLeft: '25px' }}>
        {inputOption.isVisible && (
          <div>
            {inputOption?.isFolder ? <span>📁</span> : <span>📄</span>}
            <input
              autoFocus
              onKeyDown={handleAddItem}
              onBlur={() => setInputOption((prev) => ({
                ...prev,
                isVisible: false,
              }))}
            />
          </div>
        )}
        {expand && data.isFolder && data.children?.map((child) => (
          <FileExplorer key={child?.id} data={child} handleInsertNode={handleInsertNode} />
        ))}
      </div>
    </div>
  )
}

export default FileExplorer;