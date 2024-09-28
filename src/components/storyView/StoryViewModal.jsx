import Modal from 'react-modal';
import { useState, useContext } from 'react';
import { SignedInContext } from '../../App';
import Bookmark from '../bookmark/Bookmark';
import Likes from '../likes/Likes';
import storyViewLeftIcon from '../../assets/story-view-left-icon.png';
import storyViewRightIcon from '../../assets/story-view-right-icon.png';
import slideViewCrossIcon from '../../assets/slide-view-cross-icon.png';
import './StoryViewModalStyles.css';

export default function StoryViewModal({
  storyViewModal,
  story,
  handleStoryViewModal,
  isSingleSlideViewed,
  yourBookmarks,
}) {
  if (!story) return null;

  const [currentSlide, setCurrentSlide] = useState(
    isSingleSlideViewed
      ? story?.slides.find(slide => slide._id === storyViewModal.slideId)
      : story.slides[0]
  );

  const { customModalStyles } = useContext(SignedInContext);

  const handleNextClick = () => {
    setCurrentSlide(story.slides[story.slides.indexOf(currentSlide) + 1]);
  };
  const handlePreviousClick = () => {
    setCurrentSlide(story.slides[story.slides.indexOf(currentSlide) - 1]);
  };

  console.log(currentSlide, 'currentSlide');
  console.log(yourBookmarks, 'yourBookmarks');
  console.log(story, 'story');

  return (
    <Modal
      style={customModalStyles}
      className='story-view-modal'
      isOpen={storyViewModal.openModal}
      onRequestClose={() => handleStoryViewModal(false, null, null)}
      ariaHideApp={false}
    >
      {!isSingleSlideViewed && (
        <img
          className={`slide-navigators ${
            currentSlide === story.slides[0] ? 'hidden' : ''
          }`}
          src={storyViewLeftIcon}
          alt=''
          onClick={handlePreviousClick}
        />
      )}
      <div className='slide-view'>
        <img
          className='story-slide'
          src={currentSlide.imageURL}
          alt='story-slide'
        />
        <img
          className='slide-view-cross-icon'
          src={slideViewCrossIcon}
          alt='crossIcon'
          onClick={() => handleStoryViewModal(false, null)}
        />
        <div className='story-info'>
          <div className='heading'>{currentSlide.heading}</div>
          <div className='description'>{currentSlide.description}</div>
        </div>
        <Bookmark
          key={currentSlide._id}
          isPreBookmarked={yourBookmarks.some(
            slide => slide.slideId === currentSlide._id
          )}
          storyId={story._id}
          currentSlide={currentSlide}
        />
        <Likes />
      </div>
      {!isSingleSlideViewed && (
        <img
          className={`slide-navigators ${
            currentSlide === story.slides[story.slides.length - 1]
              ? 'hidden'
              : ''
          }`}
          src={storyViewRightIcon}
          alt=''
          onClick={handleNextClick}
        />
      )}
    </Modal>
  );
}
