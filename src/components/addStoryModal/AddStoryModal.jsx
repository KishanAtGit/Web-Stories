import Modal from 'react-modal';
import { useState } from 'react';
import SlideForm from './SlideForm';
import { createStoryAPI } from '../../services/api.stories';

import crossIcon from '../../assets/crossIcon.jpg';
import './AddStoryModalStyles.css';

export default function AddStoryModal({
  openAddStoryModal,
  setOpenAddStoryModal,
}) {
  const [storyData, setStoryData] = useState({
    category: '',
    slides: [
      {
        heading: '',
        description: '',
        imageURL: '',
      },
      {
        heading: '',
        description: '',
        imageURL: '',
      },
      {
        heading: '',
        description: '',
        imageURL: '',
      },
      {
        heading: '',
        description: '',
        imageURL: '',
      },
    ],
  });

  const [selectedSlide, setSelectedSlide] = useState(0);

  console.log('storyData', storyData);

  const handleModalClose = () => {
    setOpenAddStoryModal(false);
    setSelectedSlide(null);
  };

  const handleSlideClick = index => {
    setSelectedSlide(index);
  };

  const handleNextClick = () => {
    setSelectedSlide(selectedSlide + 1);
  };

  const handlePreviousClick = () => {
    setSelectedSlide(selectedSlide - 1);
  };

  const handleAddSlide = () => {
    setStoryData(prev => ({
      ...prev,
      slides: [
        ...prev.slides,
        {
          heading: '',
          description: '',
          imageURL: '',
        },
      ],
    }));

    setSelectedSlide(storyData.slides.length);
  };

  const handleDropSlide = index => {
    setStoryData(prev => ({
      ...prev,
      slides: prev.slides.filter((_, i) => i !== index),
    }));
    if (selectedSlide >= index) {
      setSelectedSlide(selectedSlide - 1);
    }
  };

  const handleCreateStory = async () => {
    const res = await createStoryAPI(storyData);
    if (res.status === 201) {
      handleModalClose();
    }
  };

  return (
    <Modal
      className={'add-Story-modal'}
      isOpen={openAddStoryModal}
      onRequestClose={handleModalClose}
      ariaHideApp={false}
    >
      <img
        className='cross-icon'
        src={crossIcon}
        alt='crossIcon'
        onClick={handleModalClose}
      />
      <div className='slides'>
        <div className='slide-buttons'>
          {storyData.slides.map((_, index) => (
            <>
              <div
                style={{ position: 'relative' }}
                className={selectedSlide === index ? 'selected' : ''}
                key={index}
              >
                <div
                  className='buttons'
                  onClick={() => handleSlideClick(index)}
                >
                  {`Slide ${index + 1}`}
                </div>
                {index > 2 && (
                  <img
                    className='slide-delete-icon'
                    src={crossIcon}
                    alt='crossIcon'
                    onClick={() => handleDropSlide(index)}
                  />
                )}
              </div>
              {index + 1 === storyData.slides.length && index < 5 && (
                <div>
                  <div
                    key={'addNewSlide'}
                    className='buttons'
                    onClick={handleAddSlide}
                  >
                    Add +
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
        <SlideForm
          key={selectedSlide}
          storyData={storyData}
          setStoryData={setStoryData}
          selectedSlide={storyData.slides[selectedSlide]}
          activeSlideIndex={selectedSlide}
        />
      </div>
      <div className='add-story-buttons'>
        <div className='slide-navigator-buttons'>
          <div
            className={`previous-button button ${
              selectedSlide === 0 && 'hide'
            }`}
            onClick={handlePreviousClick}
          >
            Previous
          </div>
          <div
            className={`next-button button ${
              selectedSlide === storyData.slides.length - 1 && 'hide'
            } `}
            onClick={handleNextClick}
          >
            Next
          </div>
        </div>
        <div className='post-button button' onClick={handleCreateStory}>
          Post
        </div>
      </div>
    </Modal>
  );
}
