import allCategoryImage from '../assets/all_category.png';

export default function Categories({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className='categories'>
      {/* default all category */}
      <div
        key={'all'}
        className='card'
        onClick={() => setActiveCategory('all')}
        style={{
          border: activeCategory === 'all' ? '2px solid blue' : 'none',
          cursor: 'pointer',
        }}
      >
        <img src={allCategoryImage} alt='all' />
      </div>
      {categories.map(category => (
        <div
          key={category._id}
          className='card'
          onClick={() => setActiveCategory(category._id)}
          style={{
            border: activeCategory === category._id ? '2px solid blue' : 'none',
            cursor: 'pointer',
          }}
        >
          <img src={category.image} alt='all' />
        </div>
      ))}
    </div>
  );
}
