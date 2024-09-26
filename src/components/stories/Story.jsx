import { useEffect, useState, useContext } from 'react';
import { SignedInContext } from '../../App';

export default function Stories({ stories, categoryHeading, activeCategory }) {
  const [seeMoreToggled, setSeeMoreToggled] = useState(false);
  const { handleStoryViewModal } = useContext(SignedInContext);

  useEffect(() => {
    setSeeMoreToggled(false);
  }, [activeCategory]);

  return (
    <div className='stories'>
      <div className='story-heading'>{categoryHeading}</div>
      <div className={stories.length === 0 ? 'no-stories' : 'story-cards'}>
        {stories.length > 0 ? (
          stories.map(
            (story, index) =>
              (index < 4 || seeMoreToggled) && (
                <div className='card' key={index}>
                  <img
                    onClick={() => handleStoryViewModal(true, story._id)}
                    src={story.slides[0].imageURL}
                    alt=''
                  />
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
