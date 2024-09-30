import Modal from 'react-modal';
import { useState, useContext } from 'react';
import { SignedInContext } from '../../App';
import { createStoryAPI, editStoryAPI } from '../../services/api.stories';
import SlideForm from './SlideForm';

import crossIcon from '../../assets/crossIcon.jpg';
import './AddStoryModalStyles.css';

export default function AddStoryModal({
  openAddStoryModal,
  setOpenAddStoryModal,
  story,
  isEditMode,
  setIsEditMode,
  setEditStory,
}) {
  const [storyData, setStoryData] = useState(
    isEditMode
      ? story
      : {
          category: '',
          slides: [
            {
              heading: '',
              description: '',
              imageURL: '',
              likes: 0,
            },
            {
              heading: '',
              description: '',
              imageURL: '',
              likes: 0,
            },
            {
              heading: '',
              description: '',
              imageURL: '',
              likes: 0,
            },
            {
              heading: '',
              description: '',
              imageURL: '',
              likes: 0,
            },
          ],
        }
  );

  const [selectedSlide, setSelectedSlide] = useState(0);
  const { setStoryUpdatedToggle } = useContext(SignedInContext);
  const { customModalStyles } = useContext(SignedInContext);

  const handleModalClose = () => {
    setOpenAddStoryModal(false);
    setSelectedSlide(null);
    isEditMode && (setIsEditMode(false), setEditStory(null));
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
          likes: 0,
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
      setStoryUpdatedToggle(prev => !prev);
      handleModalClose();
    }
  };

  const handleUpdateStory = async () => {
    const res = await editStoryAPI(story._id, storyData);
    if (res.status === 200) {
      setStoryUpdatedToggle(prev => !prev);
      handleModalClose();
    }
  };

  return (
    <Modal
      style={customModalStyles}
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
      <div className='modal-heading'>
        <span className='slide-limit-text'>Add Story to Feed</span>
        <span className='add-slides-text'>Add upto 6 slides</span>
      </div>
      <div className='slides'>
        <div className='slide-buttons'>
          {storyData.slides.map((_, index) => (
            <>
              <div
                style={{ position: 'relative' }}
                className={selectedSlide === index ? 'selected' : ''}
                key={'fdsf' + index}
              >
                <div
                  className='buttons'
                  onClick={() => handleSlideClick(index)}
                >
                  <span>Slide&nbsp;</span> <span>{index + 1}</span>
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
                <div key={'addNewSlide'}>
                  <div className='buttons' onClick={handleAddSlide}>
                    <span>Add&nbsp;</span>
                    <span>+</span>
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
          handleNextClick={handleNextClick}
          handlePreviousClick={handlePreviousClick}
        />
      </div>
      {/* <div className='add-story-buttons'> */}

      <div
        className='post-button button'
        onClick={isEditMode ? handleUpdateStory : handleCreateStory}
      >
        Post
      </div>
      {/* </div> */}
    </Modal>
  );
}
