import React, { useEffect, useState } from 'react';

const CarouselPage =()=> {
  const [currentSlide, setCurrentSlide] = useState(1);

  // Set an interval for auto sliding
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === 4 ? 1 : prevSlide + 1));
    }, 3000); // Change slide every 3 seconds (3000ms)

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="carousel w-full">
      <div
        id="slide1"
        className={`carousel-item relative w-full ${currentSlide === 1 ? 'block' : 'hidden'}`}
      >
        <img
          src="https://in.bmscdn.com/promotions/cms/creatives/1640756827751_1633590513692_moviemunchies_webshowcase_1240x300_7oct.jpg"
          className="w-full"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide3" className="btn btn-circle">❮</a>
          <a href="#slide2" className="btn btn-circle">❯</a>
        </div>
      </div>

      <div
        id="slide2"
        className={`carousel-item relative w-full ${currentSlide === 2 ? 'block' : 'hidden'}`}
      >
        <img
          src="https://assets-in.bmscdn.com/promotions/cms/creatives/1726036566435_playcardnewweb.jpg"
          className="w-full"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle">❮</a>
          <a href="#slide3" className="btn btn-circle">❯</a>
        </div>
      </div>

      <div
        id="slide3"
        className={`carousel-item relative w-full ${currentSlide === 3 ? 'block' : 'hidden'}`}
      >
        <img
          src="https://assets-in.bmscdn.com/promotions/cms/creatives/1738396310426_chennaiwebshowcase1240x300.jpg"
          className="w-full"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle">❮</a>
          <a href="#slide1" className="btn btn-circle">❯</a>
        </div>
      </div>
      <div
        id="slide4"
        className={`carousel-item relative w-full ${currentSlide === 4 ? 'block' : 'hidden'}`}
      >
        <img
          src="https://assets-in.bmscdn.com/promotions/cms/creatives/1738317111272_cinepolisdesktopcarousel.jpg"
          className="w-full"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle">❮</a>
          <a href="#slide1" className="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
  );
  }

export default CarouselPage