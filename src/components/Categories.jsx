import allCategoryImage from '../assets/all_category.png';

export default function Categories({
  categories,
  activeIndex,
  setActiveIndex,
}) {
  return (
    <div className='categories'>
      <div
        key={'all'}
        className='card'
        onClick={() => setActiveIndex('all')}
        style={{
          border: activeIndex === 'all' ? '2px solid blue' : 'none',
          cursor: 'pointer',
        }}
      >
        <img src={allCategoryImage} alt='all' />
      </div>
      {categories.map((category, index) => (
        <div
          key={index}
          className='card'
          onClick={() => setActiveIndex(index)}
          style={{
            border: activeIndex === index ? '2px solid blue' : 'none',
            cursor: 'pointer',
          }}
        >
          <img src={category.image} alt='all' />
        </div>
      ))}
    </div>
  );
}
