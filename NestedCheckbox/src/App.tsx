import { useState } from 'react';
import './App.css';

function App() {

  const data = [
    {
      id: 1,
      label: 'checkbox1',
      children: [
        {
          id: 11,
          label: 'checkbox11',
        },
        {
          id: 12,
          label: 'checkbox12',
        },
      ]
    },
    {
      id: 2,
      label: 'checkbox2',
      children: [
        {
          id: 21,
          label: 'checkbox21',
        },
        {
          id: 22,
          label: 'checkbox22',
          children: [
            {
              id: 221,
              label: 'checkbox221',
              children: [
                {
                  id: 2211,
                  label: 'checkbox2211',
                },
              ]
            },
            {
              id: 222,
              label: 'checkbox222',
            },
          ]
        },
        {
          id: 23,
          label: 'checkbox23',
        },
      ]
    },
  ];


  const RenderCheckBox = ({ data }) => {
    return (
      <>
        {data?.map((item) => (
          <div key={item?.id} className="checkbox">
            <input type="checkbox" />
            <label>{item?.label}</label>
            {item?.children && item?.children.length > 0 && <RenderCheckBox data={item?.children} />}
          </div>
        ))}
      </>
    )
  }

  return (
    <>
    <div className="App">
      <h1>Nested Checkbox</h1>
      <RenderCheckBox data={data}/>
    </div>
    </>
  )
}

export default App
