import { useState } from 'react';

export default function Stories({ category }) {
  const [seeMoreToggled, setSeeMoreToggled] = useState(false);

  return (
    <div className='stories'>
      <div className='story-heading'>Top Stories About {category.name}</div>
      <div className='story-cards'>
        {category.stories.map(
          (story, index) =>
            (index <= 3 || seeMoreToggled) && (
              <div className='card' key={index}>
                <img src={story.imageURL} alt='' />
              </div>
            )
        )}
      </div>
      {!seeMoreToggled && (
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
