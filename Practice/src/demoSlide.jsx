export const demoSlides = [
  <div className="slide slide1" key="slide1">
    <div className="slide-content">
      <h2>Slide 1</h2>
    </div>
  </div>,
  <div className="slide slide2" key="slide2">
    <div className="slide-content">
      <h2>Slide 2</h2>
    </div>
  </div>,
  <div className="slide slide3" key="slide3">
    <div className="slide-content">
      <h2>Slide 3</h2>
    </div>
  </div>,
  <div className="slide slide4" key="slide4">
    <div className="slide-content">
      <h2>Slide 4</h2>
    </div>
  </div>,
  <div className="slide slide5" key="slide5">
    <div className="slide-content">
      <h2>Slide 5</h2>
    </div>
  </div>,
];

export const menuItemsData = [
  {
    title: 'Home',
  },
  {
    title: 'Tutorials',
    subMenu: [
      {
        title: 'HTML',
        items: ['Shematic', 'Anchor', 'bold']
      },
      {
        title: 'JS Framework',
        items: ['Closure', 'Hoisting', 'Event Loop'],
        subMenu: [
          {
            title: 'Angular',
          },
          {
            title: 'React',
            subMenu: [
              {
                title: 'React.js',
              },
              {
                title: 'React Material UI',
              },
            ]
          },
        ]
      },
      {
        title: 'CSS',
        items: ['Flex', 'Grid'],
      },
    ]
  },
  {
    title: 'Services',
    subMenu: [
      {
        title: 'Create a Website',
      },
      {
        title: 'Contact Us',
        items: ['Call', 'Message'],
      },
    ]
  },
]