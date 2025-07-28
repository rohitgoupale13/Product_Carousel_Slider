import { useRef, useState, forwardRef } from 'react';
import productData from './data';

const ProductCarousel = forwardRef((props, ref) => {
  const sliderRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const itemsPerPage = 5;
  const totalItems = productData.length;
  const totalSlides = Math.ceil(totalItems / itemsPerPage);

  const calculateScrollPosition = (index) => {
    if (!sliderRef.current) return 0;
    const cardElement = sliderRef.current.querySelector('.product-card-tailwind');
    if (!cardElement) return 0;

    const cardWidth = cardElement.offsetWidth;
    const gapStyle = window.getComputedStyle(sliderRef.current).gap;
    const gap = gapStyle ? parseFloat(gapStyle) : 0;

    const scrollAmountPerSlide = (cardWidth + gap) * itemsPerPage;

    const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    let newScrollLeft = index * scrollAmountPerSlide;

    return Math.min(newScrollLeft, maxScrollLeft);
  };

  const goToSlide = (index) => {
    if (sliderRef.current) {
      const actualIndex = Math.max(0, Math.min(index, totalSlides - 1));
      const newScrollLeft = calculateScrollPosition(actualIndex);
      sliderRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
      setCurrentSlideIndex(actualIndex);
    }
  };

  const nextSlide = () => {
    goToSlide((currentSlideIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    goToSlide((currentSlideIndex - 1 + totalSlides) % totalSlides);
  };

  if (ref && typeof ref === 'object' && 'current' in ref) {
    ref.current = {
      ...sliderRef.current,
      next: nextSlide,
      prev: prevSlide,
      goTo: goToSlide,
      getCurrentSlide: () => currentSlideIndex,
    };
  }

  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const cardElement = sliderRef.current.querySelector('.product-card-tailwind');
      if (!cardElement) return;

      const cardWidth = cardElement.offsetWidth;
      const gapStyle = window.getComputedStyle(sliderRef.current).gap;
      const gap = gapStyle ? parseFloat(gapStyle) : 0;

      const scrollAmountPerItem = cardWidth + gap;
      const newSlide = Math.round(scrollLeft / (scrollAmountPerItem * itemsPerPage));

      if (newSlide !== currentSlideIndex) {
        setCurrentSlideIndex(newSlide);
      }
    }
  };

  return (
    <div className="w-full max-w-5xl bg-gray-800 p-6 rounded-lg shadow-xl overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Offer Live</h2>
      <div className="relative overflow-hidden">
        <div
          className="flex overflow-x-scroll snap-x snap-mandatory scroll-smooth scrollbar-hide gap-4"
          ref={sliderRef}
          onScroll={handleScroll}
        >
          {productData.map(product => (
            <div
              key={product.id}
              className="product-card-tailwind flex-none p-4 text-center border border-gray-700 rounded-md bg-gray-900 shadow-md flex flex-col justify-between"
              style={{ flexBasis: `calc(100% / ${itemsPerPage} - (1rem * ${itemsPerPage - 1}) / ${itemsPerPage})` }}
            >
              <img src={product.image} alt={product.name} className="w-full h-36 object-cover rounded-md mb-4 border border-gray-600" />
              <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
              <p className="text-md font-bold text-gray-300 border rounded-md">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8 space-x-2">
        {[...Array(totalSlides)].map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
              currentSlideIndex === index ? 'bg-gray-400' : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
});

export default ProductCarousel;