import './App.css'
import Carousel from './components/Carousel';
import {useState} from 'react';

const demoSlides = [
  <div className="slide slide-1">
    <div className="slide-content">
      <h2>Slide 1</h2>
      <p>Beautiful gradient background</p>
    </div>
  </div>,
  <div className="slide slide-2">
    <div className="slide-content">
      <h2>Slide 2</h2>
      <p>Smooth transitions</p>
    </div>
  </div>,
  <div className="slide slide-3">
    <div className="slide-content">
      <h2>Slide 3</h2>
      <p>Fully accessible</p>
    </div>
  </div>,
  <div className="slide slide-4">
    <div className="slide-content">
      <h2>Slide 4</h2>
      <p>Auto-play enabled</p>
    </div>
  </div>,
  <div className="slide slide-5">
    <div className="slide-content">
      <h2>Slide 5</h2>
      <p>Infinite looping</p>
    </div>
  </div>
];

function App() {
  const [controlSlide, setControlSlide] = useState(0);

  return (
    <div className='app'>
      <div className='container'>

        <Carousel
          slides={demoSlides}
          autoPlayInterval={3000}
          enableAutoPlay={true}
          currentSlide={controlSlide}
          onSlideChange={(idx) =>  setControlSlide(idx)}
        />

        <div className='control-panel'>
          {demoSlides?.map((_, idx) => (
            <button
              key={idx}
              className={`control-btn ${controlSlide === idx ? 'active' : ''}`}
              onClick={() => setControlSlide(idx)}
            >
              {`Jump to Slide${idx + 1}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
