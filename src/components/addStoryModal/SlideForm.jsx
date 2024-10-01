import { useForm } from 'react-hook-form';
import categories from '../../constant/categories';

export default function SlideForm({
  storyData,
  setStoryData,
  selectedSlide,
  activeSlideIndex,
  handleNextClick,
  handlePreviousClick,
  isEditMode,
  handleUpdateStory,
  handleCreateStory,
}) {
  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      heading: selectedSlide.heading,
      description: selectedSlide.description,
      imageURL: selectedSlide.imageURL,
      category: storyData.category,
    },
  });

  console.log(storyData, 'storyData');

  const saveSlideData = data => {
    setStoryData(prev => ({
      ...prev,
      slides: prev.slides.map((slide, index) => {
        if (index === activeSlideIndex) {
          return {
            ...slide,
            heading: data.heading,
            description: data.description,
            imageURL: data.imageURL,
          };
        }
        return slide;
      }),
    }));
    activeSlideIndex < storyData.slides.length - 1 && handleNextClick();
  };

  const handleFinaleData = () => {
    const lastSlideData = getValues();
    saveSlideData(lastSlideData);
    const postData = {
      ...storyData,
      slides: [...storyData.slides.slice(0, -1), lastSlideData],
    };

    handleCreateStory(postData);
  };

  const handleHeadingChange = event => {
    setValue('heading', event.target.value);
    setStoryData(prev => ({
      ...prev,
      slides: prev.slides.map((slide, index) => {
        if (index === activeSlideIndex) {
          return {
            ...slide,
            heading: event.target.value,
          };
        }
        return slide;
      }),
    }));
  };

  const handleCategorySelection = event => {
    const selectedCategory = event.target.value;
    setValue('category', selectedCategory);
    setStoryData(prev => ({
      ...prev,
      category: selectedCategory,
    }));
  };

  const checkVideoDuration = async url => {
    const videoExtensions = ['mp4', 'mov', 'webm', 'avi', 'mkv'];
    const extension = url.split('.').pop().split('?')[0]; // Get the file extension (ignoring query params)

    // If the URL is for a video
    if (videoExtensions.includes(extension.toLowerCase())) {
      const video = document.createElement('video');
      video.src = url;

      video.onloadedmetadata = function () {
        if (video.duration >= 16) {
          setError('imageURL', {
            type: 'manual',
            message: 'Video duration exceeds 15 seconds',
          });
        } else {
          clearErrors('imageURL');
        }
      };

      video.onerror = function () {
        setError('imageURL', {
          type: 'manual',
          message: 'Invalid video URL',
        });
      };
    } else {
      clearErrors('imageURL');
    }
  };

  return (
    <form className='slide-form' onSubmit={handleSubmit(saveSlideData)}>
      <div>
        <span>Heading:</span>
        <div className='inputs'>
          <input
            className={errors.heading ? 'error' : ''}
            type='text'
            placeholder='Your heading'
            {...register('heading', {
              required: '*Heading is required',
              maxLength: {
                value: 30,
                message: 'Heading must be less than 30 characters',
              },
            })}
            onChange={handleHeadingChange}
          />
          {errors.heading && (
            <div className='error-message'>{errors.heading.message}</div>
          )}
        </div>
      </div>
      <div>
        <span>Description:</span>
        <div className='inputs'>
          <textarea
            className={errors.description ? 'error' : ''}
            placeholder='Story Description'
            {...register('description', {
              required: '*Description is required',
              maxLength: {
                value: 100,
                message: 'Description must be less than 100 characters',
              },
            })}
          ></textarea>
          {errors.description && (
            <div className='error-message'>{errors.description.message}</div>
          )}
        </div>
      </div>
      <div>
        <span className='image-label'>Image:</span>
        <span className='image-video-label'>Image & Video:</span>
        <div>
          <div className='inputs'>
            <input
              className={errors.imageURL ? 'error' : ''}
              type='text'
              placeholder='Add image or video URL'
              {...register('imageURL', {
                required: '*Image or video URL is required',
                onChange: e => {
                  const url = e.target.value.trim(); // Trim any leading or trailing spaces
                  if (/\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(url)) {
                    // Check video duration for video URLs
                    checkVideoDuration(url);
                  } else {
                    // If it's an image or an invalid URL, we skip validation and clear errors
                    clearErrors('imageURL');
                    // setVideoError('');
                  }
                },
              })}
            />
            {errors.imageURL && (
              <div className='error-message'>{errors.imageURL.message}</div>
            )}
          </div>
        </div>
      </div>
      <div>
        <span>Category:</span>
        <div className='inputs'>
          <select
            className='dropdown'
            {...register('category', { required: '*Select a Category' })}
            onChange={handleCategorySelection}
          >
            <option value=''>Select category</option>
            <option value='Food'>Food</option>
            <option value='Health and Fitness'>Health and Fitness</option>
            <option value='Travel'>Travel</option>
            <option value='Movies'>Movies</option>
            <option value='Education'>Education</option>
          </select>
          {errors.category && (
            <div className='error-message'>{errors.category.message}</div>
          )}
        </div>
        <span className='category-hint'>
          This field will be common for all slides
        </span>
      </div>
      <div className='slide-navigator-buttons'>
        <div
          className={`previous-button button ${selectedSlide === 0 && 'hide'}`}
          onClick={handlePreviousClick}
        >
          Previous
        </div>
        <button
          type='submit'
          className={`next-button button ${
            selectedSlide === storyData.slides.length - 1 && 'hide'
          } `}
          // onClick={handleNextClick()}
        >
          Next
        </button>
      </div>
      <div
        className='post-button button'
        onClick={isEditMode ? handleUpdateStory : handleFinaleData}
      >
        Post
      </div>
    </form>
  );
}
