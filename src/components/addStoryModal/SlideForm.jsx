import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SlideForm({
  storyData,
  setStoryData,
  selectedSlide,
  activeSlideIndex,
}) {
  useEffect(() => {
    console.log('Mounting', activeSlideIndex + 1);

    return handleSubmit(data => saveSlideData(data));
  }, []);

  const { register, handleSubmit, setValue, setError, clearErrors } = useForm({
    defaultValues: {
      heading: selectedSlide.heading,
      description: selectedSlide.description,
      imageURL: selectedSlide.imageURL,
      category: storyData.category,
    },
  });
  const [videoError, setVideoError] = useState('');

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
  };

  const handleCategorySelection = event => {
    const selectedCategory = event.target.value;
    setValue('category', selectedCategory);
    setStoryData(prev => ({
      ...prev,
      category: selectedCategory,
    }));
  };

  const checkVideoDuration = url => {
    const video = document.createElement('video');
    video.src = url;

    video.onloadedmetadata = function () {
      console.log(video.duration);

      if (video.duration >= 16) {
        setError('imageURL', {
          type: 'manual',
          message: 'Video duration exceeds 15 seconds',
        });
        setVideoError('Video duration exceeds 15 seconds');
      } else {
        clearErrors('imageURL');
        setVideoError('');
      }
    };

    video.onerror = function () {
      setError('imageURL', {
        type: 'manual',
        message: 'Invalid video URL',
      });
      setVideoError('Invalid video URL');
    };
  };

  return (
    <div className='slide-form'>
      <div>
        <span>Heading:</span>
        <input
          type='text'
          placeholder='Your heading'
          {...register('heading', { required: true })}
        />
      </div>
      <div>
        <span>Description:</span>
        <textarea
          name=''
          id=''
          placeholder='Story Description'
          {...register('description', { required: true })}
        ></textarea>
      </div>
      <div>
        <span>Image:</span>
        <input
          type='text'
          placeholder='Add image or video url'
          {...register('imageURL', {
            required: 'Add image & video URL',
            onChange: e => {
              const url = e.target.value;

              // Check if it's a video URL
              if (/\.(mp4|webm|ogg)$/.test(url)) {
                checkVideoDuration(url);
              } else {
                clearErrors('imageURL');
                setVideoError(''); // Clear any previous video error
              }
            },
          })}
        />
        {videoError && <p style={{ color: 'red' }}>{videoError}</p>}
      </div>
      <div>
        <span>Category:</span>
        <select
          className='dropdown'
          {...register('category', { required: true })}
          onChange={handleCategorySelection}
        >
          <option value=''>Select category</option>
          <option value='Food'>Food</option>
          <option value='Health and Fitness'>Health and Fitness</option>
          <option value='Travel'>Travel</option>
          <option value='Movies'>Movies</option>
          <option value='Education'>Education</option>
        </select>
      </div>
    </div>
  );
}
