import { useContext } from 'react';
import { SignedInContext } from '../../App';
import Story from './Story';
import stories from '../../mock/stories';
import yourStories from '../../mock/yourStories';

export default function Stories({ categories, activeCategory }) {
  const { isSignedIn } = useContext(SignedInContext);

  console.log(activeCategory, 'activeCategory');

  return (
    <div className='stories-section'>
      {isSignedIn && (
        <Story
          stories={
            activeCategory.length === 0 || activeCategory.includes('all')
              ? yourStories
              : activeCategory
                  .map(category =>
                    yourStories.filter(story => story.category === category)
                  )
                  .flat()
          }
          categoryHeading={'Your Stories'}
          activeCategory={activeCategory}
        />
      )}
      {activeCategory.length === 0 || activeCategory.includes('all')
        ? categories.map((category, index) => (
            <Story
              key={index}
              stories={stories.filter(
                story => story.category === category.name
              )}
              categoryHeading={`Top Stories About ${category.name}`}
              activeCategory={activeCategory}
            />
          ))
        : activeCategory.map((category, index) => (
            <Story
              key={index}
              stories={stories.filter(story => story.category === category)}
              categoryHeading={`Top Stories About ${category}`}
              activeCategory={activeCategory}
            />
          ))}
    </div>
  );
}
