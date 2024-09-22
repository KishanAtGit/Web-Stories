import { useEffect, useState } from 'react';

export default function Stories({ stories, categoryHeading, activeCategory }) {
  const [seeMoreToggled, setSeeMoreToggled] = useState(false);

  useEffect(() => {
    setSeeMoreToggled(false);
  }, [activeCategory]);

  return (
    <div className='stories'>
      <div className='story-heading'>{categoryHeading}</div>
      <div className='story-cards'>
        {stories.map(
          (story, index) =>
            (index < 4 || seeMoreToggled) && (
              <div className='card' key={index}>
                <img src={story.imageURL} alt='' />
                <div className='story-info'>
                  <div className='heading'>{story.heading}</div>
                  <div className='description'>{story.description}</div>
                </div>
              </div>
            )
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
