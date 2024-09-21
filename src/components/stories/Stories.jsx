import Story from './Story';

export default function Stories({ categories, activeCategory }) {
  return (
    <div className='stories-section'>
      {activeCategory === null || activeCategory === 'all' ? (
        categories.map((category, index) => (
          <Story key={index} category={category} />
        ))
      ) : (
        <Story
          category={
            categories.filter(category => category._id === activeCategory)[0]
          }
        />
      )}
    </div>
  );
}
