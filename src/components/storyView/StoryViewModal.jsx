import Modal from 'react-modal';
import { useState, useContext } from 'react';
import { SignedInContext } from '../../App';
import storyViewLeftIcon from '../../assets/story-view-left-icon.png';
import storyViewRightIcon from '../../assets/story-view-right-icon.png';
import slideViewCrossIcon from '../../assets/slide-view-cross-icon.png';
import './StoryViewModalStyles.css';

export default function StoryViewModal({
  storyViewModal,
  story,
  handleStoryViewModal,
}) {
  if (!story) return null;

  console.log(story, 'story');
  const [currentSlide, setCurrentSlide] = useState(story.slides[0]);

  const { customModalStyles } = useContext(SignedInContext);

  const handleNextClick = () => {
    setCurrentSlide(story.slides[story.slides.indexOf(currentSlide) + 1]);
  };
  const handlePreviousClick = () => {
    setCurrentSlide(story.slides[story.slides.indexOf(currentSlide) - 1]);
  };

  return (
    <Modal
      style={customModalStyles}
      className='story-view-modal'
      isOpen={storyViewModal.openModal}
      onRequestClose={() => handleStoryViewModal(false, null)}
      ariaHideApp={false}
    >
      <img
        className={`slide-navigators ${
          currentSlide === story.slides[0] ? 'hidden' : ''
        }`}
        src={storyViewLeftIcon}
        alt=''
        onClick={handlePreviousClick}
      />
      <div className='slide-view'>
        <img src={currentSlide.imageURL} alt='story-slide' />
        <img
          className='slide-view-cross-icon'
          src={slideViewCrossIcon}
          alt='crossIcon'
          onClick={() => handleStoryViewModal(false, null)}
        />
      </div>
      <img
        className={`slide-navigators ${
          currentSlide === story.slides[story.slides.length - 1] ? 'hidden' : ''
        }`}
        src={storyViewRightIcon}
        alt=''
        onClick={handleNextClick}
      />
    </Modal>
  );
}
