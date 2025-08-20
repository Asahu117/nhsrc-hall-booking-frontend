

import React from 'react';

const ImageScroller = () => {
  // IMPORTANT: These images must be placed in your `public/assets/images/` folder.
  const images = [
    "/assets/images/homepage/hall1.jpeg",
    "/assets/images/homepage/hall2.jpeg",
    "/assets/images/homepage/hall3.jpeg",
    "/assets/images/homepage/hall4.jpeg",
  ];

  // We duplicate the images to create a seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <div className="w-full h-64 overflow-hidden relative my-8">
      {/* Gradient overlays for a fading effect on the edges */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-gray-100 to-transparent z-10"></div>
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-gray-100 to-transparent z-10"></div>
      
      <div className="flex animate-infinite-scroll">
        {duplicatedImages.map((src, index) => (
          <div key={index} className="w-1/3 flex-shrink-0 px-2">
            <img
              src={src}
              alt={`Scrolling hall image ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x600/cccccc/FFFFFF?text=Hall+Image'; }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageScroller;