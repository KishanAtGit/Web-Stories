import Story from './Story';

export default function Stories({ categories, activeIndex }) {
  return (
    <div className='stories-section'>
      {activeIndex === null || activeIndex === 'all' ? (
        categories.map((category, index) => (
          <Story key={index} category={category} />
        ))
      ) : (
        <Story category={categories[activeIndex]} />
      )}
    </div>
  );
}
