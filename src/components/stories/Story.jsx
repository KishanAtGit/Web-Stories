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
  const { storyViewModal, handleStoryViewModal, yourStoriesInMobileView } =
    useContext(SignedInContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editStory, setEditStory] = useState({});

  useEffect(() => {
    setSeeMoreToggled(false);
  }, [activeCategory]);

  const isVideo = url => {
    const videoExtensions = ['mp4', 'webm', 'ogg']; // Add more if needed
    const extension = url.split('.').pop();
    return videoExtensions.includes(extension);
  };

  return (
    <>
      {isSingleSlideViewed ? (
        <div
          style={{ marginTop: '4vh', marginBottom: '4vh' }}
          className={`stories`}
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
                        src={
                          isVideo(slide.imageURL)
                            ? 'https://plus.unsplash.com/premium_photo-1683936164203-b8b814f2e3a6?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            : slide.imageURL
                        }
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
        <div
          className={`stories ${
            categoryHeading === 'Your Stories'
              ? yourStoriesInMobileView === false
                ? 'stories-hide-mobile'
                : ''
              : yourStoriesInMobileView === true
              ? 'stories-hide-mobile'
              : ''
          } `}
        >
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
                        src={
                          story.slides && isVideo(story.slides[0].imageURL)
                            ? 'https://plus.unsplash.com/premium_photo-1683936164203-b8b814f2e3a6?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            : story.slides && story.slides[0].imageURL
                        }
                        alt='Story Media'
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
