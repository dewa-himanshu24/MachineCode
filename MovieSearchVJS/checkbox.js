const checkboxData = [
  {
    id:1,
    name: 'checkbox1',
    isChecked: false,
    nesting: [
      {
        id: 2,
        name: 'checkbox2',
        isChecked: false,
      },
      {
        id: 3,
        name: 'checkbox3',
        isChecked: true,
      },
    ]
  },
    {
    id:4,
    name: 'checkbox4',
    isChecked: true,
    nesting: [
      {
        id: 5,
        name: 'checkbox5',
        isChecked: false,
        nesting: [
          {
            id: 6,
            name: 'checkbox6',
            isChecked: false,
          },
          {
            id: 7,
            name: 'checkbox7',
            isChecked: true,
          }
        ],
      },
      {
        id: 8,
        name: 'checkbox8',
        isChecked: true,
      },
    ]
  }
]

const checkboxContianer = document.getElementById('checkbox-container');

checkboxContianer.addEventListener('change', (event) => {
  console.log('~event', event);

  if (event.target.type === 'checkbox') {
    const targetId = parseInt(event.target.id.split('_')?.[1]);    
    console.log('~targetId', targetId);
    const isChecked = event.target.checked;

    updateDataById(checkboxData, targetId, isChecked);
    console.log('~Updated checkboxData:', checkboxData);
  }
})

function updateDataById(data, id, value) {
  for (let item of data) {
    if (item.id === id) {
      item.isChecked = value;

      // Optional: If you check a parent, should all children be checked?
      if (item.nesting) {
         updateAllChildren(item.nesting, value);
      }

      return true;
    }

    if (item.nesting && item.nesting.length > 0) {
      let found = updateDataById(item.nesting, id, value);

      if (found) return true;
    }
  }

  return false;
}

function updateAllChildren(nesting, value) {
  nesting.forEach(child => {
    child.isChecked = value;
    // Update the DOM to match the data
    const element = document.getElementById(`cb_${child.id}`);
    console.log('~element', element);
    if (element) element.checked = value;

    if (child.nesting) {
      updateAllChildren(child.nesting, value);
    }
  });
}

function renderCheckBox(data, parentElement) {

  const ul = document.createElement('ul');
  ul.style.listStyle = 'none';

  data.forEach((item) => {
    const li = document.createElement('li');

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = `cb_${item.id}`;
    input.checked = item.isChecked;

    const label = document.createElement('label');
    label.textContent = item.name;

    li.appendChild(input);
    li.appendChild(label);
    ul.append(li);

    if (item.nesting && item.nesting.length > 0) {
      renderCheckBox(item.nesting, li);
    } 
  })

  parentElement.appendChild(ul);
}

renderCheckBox(checkboxData, checkboxContianer);