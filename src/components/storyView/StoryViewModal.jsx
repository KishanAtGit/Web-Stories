import Modal from 'react-modal';
import { useState, useContext, useEffect } from 'react';
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

  const [currentSlide, setCurrentSlide] = useState(
    isSingleSlideViewed
      ? story?.slides.find(slide => slide._id === storyViewModal.slideId)
      : storyView === true
      ? story?.slides.find(slide => slide._id === storyViewModal.slideId)
      : story.slides[0]
  );

  console.log(storyView, 'storyView');
  console.log(storyViewModal.slideId, 'storyViewModal.slideId');

  console.log(currentSlide, 'currentSlide');

  const { customModalStyles } = useContext(SignedInContext);

  const handleNextClick = () => {
    setCurrentSlide(story.slides[story.slides.indexOf(currentSlide) + 1]);
  };
  const handlePreviousClick = () => {
    setCurrentSlide(story.slides[story.slides.indexOf(currentSlide) - 1]);
  };

  // console.log(story, 'story');
  // console.log(currentSlide, 'currentSlide-viewModel');

  useEffect(() => {
    setCurrentSlide(
      isSingleSlideViewed
        ? story?.slides.find(slide => slide._id === storyViewModal.slideId)
        : story.slides[0]
    );
  }, [storyViewModal, story, isSingleSlideViewed]);

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
