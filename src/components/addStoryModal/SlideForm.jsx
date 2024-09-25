import { useEffect } from 'react';
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

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      heading: selectedSlide.heading,
      description: selectedSlide.description,
      imageURL: selectedSlide.imageURL,
      category: storyData.category,
    },
  });

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
          {...register('imageURL', { required: true })}
        />
      </div>
      <div>
        <span>Category:</span>
        <select
          className='dropdown'
          {...register('category', { required: true })}
          onChange={handleCategorySelection}
        >
          <option value=''>Select category</option>
          <option value='food'>Food</option>
          <option value='health-fitness'>Health and Fitness</option>
          <option value='travel'>Travel</option>
          <option value='movies'>Movies</option>
          <option value='Education'>Education</option>
        </select>
      </div>
    </div>
  );
}
