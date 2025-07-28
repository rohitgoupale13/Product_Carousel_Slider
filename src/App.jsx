import { useRef } from 'react';
import ProductCarousel from './carosel';
import './index.css';

function App() {
  const carouselRef = useRef(null);

  const handleNext = () => {
    if (carouselRef.current && typeof carouselRef.current.next === 'function') {
      carouselRef.current.next();
    }
  };

  const handlePrev = () => {
    if (carouselRef.current && typeof carouselRef.current.prev === 'function') {
      carouselRef.current.prev();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 p-4">
      <ProductCarousel ref={carouselRef} />
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handlePrev}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out shadow-lg"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out shadow-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;