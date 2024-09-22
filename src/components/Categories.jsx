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
        onClick={() =>
          setActiveCategory(prev => (prev.includes('all') ? prev : ['all']))
        }
        style={{
          border: activeCategory.includes('all') ? '3px solid #008E97' : 'none',
          cursor: 'pointer',
        }}
      >
        <img src={allCategoryImage} alt='all' />
        <span className='category-name'>All</span>
      </div>
      {categories.map(category => (
        <div
          key={category._id}
          className='card'
          onClick={() =>
            setActiveCategory(prev => {
              // Remove 'all' if selected and add the specific category
              if (prev.includes('all')) {
                return [category._id];
              }
              return prev.includes(category._id)
                ? prev.filter(id => id !== category._id) //Removing the selected category
                : [...prev, category._id]; // Adds the newly selected category
            })
          }
          style={{
            border: activeCategory.includes(category._id)
              ? '3px solid #008E97'
              : 'none',
            cursor: 'pointer',
          }}
        >
          <img src={category.image} alt='all' />
          <span className='category-name'>{category.name}</span>
        </div>
      ))}
    </div>
  );
}
