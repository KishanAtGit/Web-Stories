import { useState } from 'react';
import Categories from './Categories';
import './Homepage.css';
import Navbar from './Navbar';
import Stories from './stories/Stories';
import categories from '../constant/category';

export default function Homepage() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className='homepage'>
      <Navbar />
      <Categories
        categories={categories}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <Stories categories={categories} activeIndex={activeIndex} />
    </div>
  );
}
