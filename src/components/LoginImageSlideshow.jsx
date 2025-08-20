


import React, { useState, useEffect } from 'react';

const LoginImageSlideshow = () => {
  // Using high-quality, professional images from a stock photo service.
  const images = [
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop',
    '/public/assets/images/login/meet1.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Set up a timer to change the image every 5 seconds (5000 milliseconds)
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    // Clean up the timer when the component is unmounted
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="relative w-full h-full">
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Login slideshow image ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1000x1500/cccccc/FFFFFF?text=Meeting+Space'; }}
        />
      ))}
       {/* Adding a dark overlay to make text more readable if you ever add any */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
    </div>
  );
};

export default LoginImageSlideshow;
