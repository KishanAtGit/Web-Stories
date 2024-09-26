import { useEffect, useState } from 'react';

export default function Stories({ stories, categoryHeading, activeCategory }) {
  const [seeMoreToggled, setSeeMoreToggled] = useState(false);

  useEffect(() => {
    setSeeMoreToggled(false);
  }, [activeCategory]);

  console.log(stories, 'story');

  return (
    <div className='stories'>
      <div className='story-heading'>{categoryHeading}</div>
      <div className={stories.length === 0 ? 'no-stories' : 'story-cards'}>
        {stories.length > 0 ? (
          stories.map(
            (story, index) =>
              (index < 4 || seeMoreToggled) && (
                <div className='card' key={index}>
                  <img src={story.slides[0].imageURL} alt='' />
                  <div className='story-info'>
                    <div className='heading'>{story.slides[0].heading}</div>
                    <div className='description'>
                      {story.slides[0].description}
                    </div>
                  </div>
                </div>
              )
          )
        ) : (
          <div style={{ color: '#8E8E8E' }}>No stories Available</div>
        )}
      </div>
      {!seeMoreToggled && stories.length > 4 && (
        <div
          className='button show-more'
          onClick={() => setSeeMoreToggled(!seeMoreToggled)}
        >
          See more
        </div>
      )}
    </div>
  );
}
