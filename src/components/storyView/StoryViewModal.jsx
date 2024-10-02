import Modal from 'react-modal';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedInContext } from '../../App';
import SlideTiles from './SlideTiles';
import BookmarkIcon from './BookmarkIcon';
import LikesIcon from './LikesIcon';
import ShareIcon from './ShareIcon';
import storyViewLeftIcon from '../../assets/story-view-left-icon.png';
import storyViewRightIcon from '../../assets/story-view-right-icon.png';
import slideViewCrossIcon from '../../assets/slide-view-cross-icon.png';
import './StoryViewModalStyles.css';
import DownloadIcon from './DownloadIcon';

export default function StoryViewModal({
  storyViewModal,
  story,
  handleStoryViewModal,
  isSingleSlideViewed,
  yourBookmarks,
  setOpenSignInModal,
  setIsSingleSlideViewed,
  toggleBookmark,
  storyView,
}) {
  if (!story) return null;

  const navigate = useNavigate();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(() => {
    if (isSingleSlideViewed || storyView) {
      return (
        story?.slides.findIndex(
          slide => slide._id === storyViewModal.slideId
        ) || 0
      );
    }
    return 0;
  });

  const currentSlide = story.slides[currentSlideIndex];

  const { customModalStyles } = useContext(SignedInContext);

  const handleNextClick = () => {
    if (currentSlideIndex < story.slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  return (
    <Modal
      style={customModalStyles}
      className='story-view-modal'
      isOpen={storyViewModal.openModal}
      onRequestClose={() => {
        !toggleBookmark && setIsSingleSlideViewed(false);
        handleStoryViewModal(false, null, null);
        navigate('/');
      }}
      ariaHideApp={false}
    >
      <div className='slide-view'>
        {currentSlide.imageURL &&
        /\.(mp4|webm|ogg)$/.test(currentSlide.imageURL) ? (
          <video
            className='story-slide'
            src={currentSlide.imageURL}
            controls
            autoPlay
            loop
            muted
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            className='story-slide'
            src={currentSlide.imageURL}
            alt='story-slide'
          />
        )}
        <img
          className={`slide-view-cross-icon ${
            isSingleSlideViewed ? 'view-in-single-slideMode' : ''
          }`}
          style={{ top: isSingleSlideViewed ? '5%' : '' }}
          src={slideViewCrossIcon}
          alt='crossIcon'
          onClick={() => {
            !toggleBookmark && setIsSingleSlideViewed(false);
            handleStoryViewModal(false, null, null);
            navigate('/');
          }}
        />
        <ShareIcon
          storyId={story._id}
          slideId={currentSlide._id}
          isSingleSlideViewed={isSingleSlideViewed}
        />
        <div className='story-info'>
          <div className='heading'>{currentSlide.heading}</div>
          <div className='description'>{currentSlide.description}</div>
        </div>
        <BookmarkIcon
          key={currentSlide._id + 'bookmark'}
          isPreBookmarked={yourBookmarks.some(
            slide => slide.slideId === currentSlide._id
          )}
          storyId={story._id}
          currentSlide={currentSlide}
          setOpenSignInModal={setOpenSignInModal}
        />
        <DownloadIcon
          key={currentSlide._id + 'download'}
          imageUrl={currentSlide.imageURL}
        />
        <LikesIcon
          key={currentSlide._id + 'likes'}
          storyId={story._id}
          currentSlide={currentSlide}
          setOpenSignInModal={setOpenSignInModal}
        />
      </div>
      {!isSingleSlideViewed && (
        <img
          className={`slide-navigators left-navigator ${
            currentSlide._id === story.slides[0]._id ? 'hidden' : ''
          }`}
          src={storyViewLeftIcon}
          alt=''
          onClick={handlePreviousClick}
        />
      )}
      {!isSingleSlideViewed && (
        <img
          className={`slide-navigators right-navigator ${
            currentSlide._id === story.slides[story.slides.length - 1]._id
              ? 'hidden'
              : ''
          }`}
          src={storyViewRightIcon}
          alt=''
          onClick={handleNextClick}
        />
      )}
      {!isSingleSlideViewed && (
        <div className='slide-tiles'>
          {story.slides.map((slide, index) => (
            <SlideTiles
              key={index}
              isActiveSlideTile={currentSlide._id === slide._id}
            />
          ))}
        </div>
      )}
    </Modal>
  );
}
