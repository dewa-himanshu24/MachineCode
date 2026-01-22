const fileExplorerData = {
  id: 1,
  name: 'root',
  isFolder: true,
  children: [
    {
      id:2,
      name: 'Folder2',
      isFolder: true,
      children: [
        {
        id:3,
        name: 'File2',
        isFolder: false,
        },
        {
          id:3,
          name: 'File3',
          isFolder: false,
        }
      ]
    },
    {
      id:3,
      name: 'File1',
      isFolder: false,
    }
  ]
};

export default fileExplorerData