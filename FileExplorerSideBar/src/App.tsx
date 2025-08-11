import React, { useState } from 'react';
import data from './data.json';
import './App.css';

interface FileNode {
  id: number;
  name: string;
  isFolder: boolean;
  children?: FileNode[];
}

interface ListProps {
  list: FileNode[];
}


const List = ({ list }: ListProps) => {
  const [isExpanded, setIsExpanded] = useState<Record<string, boolean>>({});

  return (
    <div className="container">
      {list?.map((item) => (
        <div key={item.id}>
          {item.isFolder && <span onClick={() => setIsExpanded((prev) => ({...prev, [item.name]: !prev[item.name]}))}>{isExpanded[item.name] ? '-' : '+'} </span>}
          <span>{item.isFolder ? '📁' : '📄'} </span>
          <span>{item.name}</span>
          <span></span>
          {isExpanded[item.name] && item.isFolder && item.children && <List list={item.children} />}
        </div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>File Explorer</h1>
      <List list={data} />
    </div>
  );
};

export default App;
