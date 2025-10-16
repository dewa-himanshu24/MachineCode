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

// export const menuItemsData = [
//   {
//     title: 'Home',
//   },
//   {
//     title: 'Tutorials',
//     subMenu: [
//       {
//         title: 'HTML',
//         items: ['Shematic', 'Anchor', 'bold']
//       },
//       {
//         title: 'JS Framework',
//         items: ['Closure', 'Hoisting', 'Event Loop'],
//         subMenu: [
//           {
//             title: 'Angular',
//           },
//           {
//             title: 'React',
//             subMenu: [
//               {
//                 title: 'React.js',
//               },
//               {
//                 title: 'React Material UI',
//               },
//             ]
//           },
//         ]
//       },
//       {
//         title: 'CSS',
//         items: ['Flex', 'Grid'],
//       },
//     ]
//   },
//   {
//     title: 'Services',
//     subMenu: [
//       {
//         title: 'Create a Website',
//       },
//       {
//         title: 'Contact Us',
//         items: ['Call', 'Message'],
//       },
//     ]
//   },
// ];

// export const menuItemsData = [
//   {
//     title: 'Products',
//     subMenu: [
//       {
//         title: 'Category A',
//         items: [
//           { label: 'Product 1', path: '/product1' },
//           { label: 'Product 2', path: '/product2' },
//         ],
//       },
//       {
//         title: 'Category B',
//         items: [
//           { label: 'Product 3', path: '/product3' },
//           { label: 'Product 4', path: '/product4' },
//         ],
//       },
//     ],
//   },
//   {
//     title: 'About Us',
//     path: '/about',
//   },
//   {
//     title: 'Contact',
//     path: '/contact',
//   },
// ];

export const menuItemsData = [
  {
    title: 'Home',
    path: '/home',
  },
  {
    title: 'Tutorials',
    subMenu: [
      {
        title: 'HTML',
        items: [
          { label: 'Shematic', path: '/tutorials/html/shematic' },
          { label: 'Anchor', path: '/tutorials/html/anchor' },
          { label: 'Bold', path: '/tutorials/html/bold' },
        ],
      },
      {
        title: 'JS Framework',
        items: [
          { label: 'Closure', path: '/tutorials/js/closure' },
          { label: 'Hoisting', path: '/tutorials/js/hoisting' },
          { label: 'Event Loop', path: '/tutorials/js/event-loop' },
        ],
        subMenu: [
          {
            title: 'Angular',
            path: '/tutorials/js/angular',
          },
          {
            title: 'React',
            subMenu: [
              {
                title: 'React.js',
                path: '/tutorials/js/react/reactjs',
              },
              {
                title: 'React Material UI',
                path: '/tutorials/js/react/material-ui',
              },
            ],
          },
        ],
      },
      {
        title: 'CSS',
        items: [
          { label: 'Flex', path: '/tutorials/css/flex' },
          { label: 'Grid', path: '/tutorials/css/grid' },
        ],
      },
    ],
  },
  {
    title: 'Services',
    subMenu: [
      {
        title: 'Create a Website',
        path: '/services/create-website',
      },
      {
        title: 'Contact Us',
        items: [
          { label: 'Call', path: '/services/contact/call' },
          { label: 'Message', path: '/services/contact/message' },
        ],
      },
    ],
  },
  {
    title: 'Products',
    subMenu: [
      {
        title: 'Category A',
        items: [
          { label: 'Product 1', path: '/products/category-a/product1' },
          { label: 'Product 2', path: '/products/category-a/product2' },
        ],
      },
      {
        title: 'Category B',
        items: [
          { label: 'Product 3', path: '/products/category-b/product3' },
          { label: 'Product 4', path: '/products/category-b/product4' },
        ],
      },
    ],
  },
  {
    title: 'About Us',
    path: '/about',
  },
  {
    title: 'Contact',
    path: '/contact',
  },
];