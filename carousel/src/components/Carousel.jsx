import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const Carousel = ({slides, currentSlide: externalCurrentSlide ,onSlideChange, autoPlayInterval, enableAutoPlay, className}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(enableAutoPlay);
  const carouselRef = useRef(null);
  const slideRefs = useRef([]);
  const autoPlayRef = useRef(null);

  const totalSlides = slides.length;

  useEffect(() => {
    if (externalCurrentSlide !== undefined && externalCurrentSlide !== currentSlide) {
      goToSlide(externalCurrentSlide)
    }
  }, [externalCurrentSlide])

  const goToSlide = useCallback((idx) => {
    let newIdx = ((idx % totalSlides) + totalSlides) % totalSlides;
    setCurrentSlide(newIdx);

    if (slideRefs.current[newIdx]) {
      slideRefs.current[newIdx].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }

    onSlideChange(newIdx);

  }, [totalSlides, onSlideChange])

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    if (isAutoPlaying && totalSlides > 1) {
      autoPlayRef.current = setInterval(nextSlide, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef);
      }
    };
  }, [isAutoPlaying, totalSlides, nextSlide, autoPlayInterval]);

  useEffect(() => {

    const options = {
      root: carouselRef.current,
      threshold: 0.5,
      rootMargin: '0px'
    }

    let obeserver = new IntersectionObserver((entries) => {
      console.log('~ entries', entries);
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let index = slideRefs.current.indexOf(entry.target);

          if (index !== -1 && index !== currentSlide) {
            setCurrentSlide(index);
            onSlideChange(index);
          }
        }
      })
    }, options);

    slideRefs.current.forEach((slide) => {
      if (slide) obeserver.observe(slide);      
    })

    return () => obeserver.disconnect();
  }, [currentSlide, onSlideChange]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  if (!slides.length) {
    return <div className="no-slides">No slides available</div>;
  }

  return (
    <div className={`carousel-wrapper ${className}`} onKeyDown={handleKeyDown}>

      {/* Carousel container */}
      <div className='carousel-container'>
        <div
          ref={carouselRef}
          className='carousel-slides'
          role='region'
          aria-label='Carousel'
          aria-live='polite'
        >
          {slides?.map((slide, idx) => (
            <div
              key={idx}
              ref={el => {
                slideRefs.current[idx] = el}}
              className='carousel-slide'
              role='group'
              aria-roledescription='slide'
              aria-label={`${idx + 1} of ${totalSlides}`}
            >
            {slide}
            </div>
          ))}
        </div>

        {/* Previous button */}
        <button
          className="carousel-btn carousel-btn-prev"
          aria-label='Previous Slide'
          onClick={prevSlide}
          tabIndex={0}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next button */}
        <button
          className="carousel-btn carousel-btn-next"
          aria-label='Next Slide'
          onClick={nextSlide}
          tabIndex={0}
        >
          <ChevronRight size={24} />
        </button>

        {/* Pause Play Button */}
        {enableAutoPlay && 
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="carousel-autoplay-btn"
          aria-label={isAutoPlaying ? "Pause auto-play" : "Play auto-play"}
          tabIndex={0}
        >
          {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>}
      </div>

      <div className="carousel-indicators" role="tablist" aria-label="Slide navigation">
        {slides?.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`carousel-indicator ${currentSlide === idx ? 'active' : ''}`}
            role="tab"
            aria-label='Go to Tab'
            aria-selected={currentSlide === idx}
            tabIndex={0}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;