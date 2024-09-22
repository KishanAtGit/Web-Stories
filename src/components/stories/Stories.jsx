import { useContext } from 'react';
import { SignedInContext } from '../../App';
import Story from './Story';
import stories from '../../mock/stories';

export default function Stories({ categories, activeCategory }) {
  const { isSignedIn } = useContext(SignedInContext);

  return (
    <div className='stories-section'>
      {isSignedIn && (
        <Story
          stories={stories}
          categoryHeading={'Your Stories'}
          activeCategory={activeCategory}
        />
      )}
      {activeCategory.length === 0 || activeCategory.includes('all')
        ? categories.map((category, index) => (
            <Story
              key={index}
              stories={category.stories}
              categoryHeading={`Top Stories About ${category.name}`}
              activeCategory={activeCategory}
            />
          ))
        : categories
            .filter(category => activeCategory.includes(category._id))
            .map((category, index) => (
              <Story
                key={index}
                stories={category.stories}
                categoryHeading={`Top Stories About ${category.name}`}
                activeCategory={activeCategory}
              />
            ))}
    </div>
  );
}
