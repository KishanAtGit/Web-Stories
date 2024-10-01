import { useEffect, useState, useContext } from 'react';
import { SignedInContext } from '../../App';
import AddStoryModal from '../addStoryModal/AddStoryModal';

import editIcon from '../../assets/editIcon.png';

export default function Story({
  stories,
  categoryHeading,
  activeCategory,
  isSingleSlideViewed,
  setOpenAddStoryModal,
}) {
  const [seeMoreToggled, setSeeMoreToggled] = useState(false);
  const { storyViewModal, handleStoryViewModal } = useContext(SignedInContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editStory, setEditStory] = useState({});

  useEffect(() => {
    setSeeMoreToggled(false);
  }, [activeCategory]);

  return (
    <>
      {isSingleSlideViewed ? (
        <div
          style={{ marginTop: '4vh', marginBottom: '4vh' }}
          className={`stories ${storyViewModal.openModal ? 'hide' : ''}`}
        >
          <div className='story-heading'>{categoryHeading}</div>
          <div className={stories.length === 0 ? 'no-stories' : 'story-cards'}>
            {stories.length > 0 ? (
              stories.map(
                (slide, index) =>
                  (index < 4 || seeMoreToggled) && (
                    <div className='card' key={index}>
                      <img
                        className='story-image'
                        onClick={() =>
                          handleStoryViewModal(
                            true,
                            slide.storyId,
                            slide.slideId
                          )
                        }
                        src={slide.imageURL}
                        alt=''
                      />
                      <div className='story-info'>
                        <div className='heading'>{slide.heading}</div>
                        <div className='description'>{slide.description}</div>
                      </div>
                    </div>
                  )
              )
            ) : (
              <div style={{ color: '#8E8E8E' }}>No Bookmarks Available</div>
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
      ) : (
        <div className={`stories ${storyViewModal.openModal ? 'hide' : ''}`}>
          <div className='story-heading'>{categoryHeading}</div>
          <div className={stories.length === 0 ? 'no-stories' : 'story-cards'}>
            {stories.length > 0 ? (
              stories.map(
                (story, index) =>
                  (index < 4 || seeMoreToggled) && (
                    <div className='card' key={index}>
                      <img
                        className='story-image'
                        onClick={() => handleStoryViewModal(true, story._id)}
                        src={story.slides && story.slides[0].imageURL}
                        alt=''
                      />
                      <div className='story-info'>
                        <div className='heading'>
                          {story.slides && story.slides[0].heading}
                        </div>
                        <div className='description'>
                          {story.slides && story.slides[0].description}
                        </div>
                      </div>
                      <img
                        className={`edit-icon  ${
                          categoryHeading === 'Your Stories' ? '' : 'hide'
                        }`}
                        src={editIcon}
                        alt=''
                        onClick={() => {
                          setIsEditMode(true);
                          setEditStory(story);
                        }}
                      />
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
      )}
      {isEditMode && (
        <AddStoryModal
          openAddStoryModal={isEditMode}
          setOpenAddStoryModal={setOpenAddStoryModal}
          story={editStory}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          setEditStory={setEditStory}
        />
      )}
    </>
  );
}
