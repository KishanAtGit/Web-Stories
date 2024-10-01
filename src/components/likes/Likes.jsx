import { useContext, useEffect, useState } from 'react';
import { checkLikesAPI, updateLikesAPI } from '../../services/api.likes';
import { SignedInContext } from '../../App';
import unlike from '../../assets/unlike.png';
import like from '../../assets/like.png';

export default function Likes({ storyId, currentSlide, setOpenSignInModal }) {
  const [isLiked, setIsLiked] = useState(false);
  const { isSignedIn, setStoryUpdatedToggle } = useContext(SignedInContext);

  const handleLikeClick = async () => {
    if (!isSignedIn) {
      setOpenSignInModal(true);
    } else {
      try {
        const res = await updateLikesAPI(storyId, currentSlide._id);
        if (res.status === 201 || res.status === 200) {
          setStoryUpdatedToggle(prev => !prev);
          setIsLiked(prev => !prev);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const checkLiked = async () => {
      try {
        const res = await checkLikesAPI(currentSlide._id);
        if (res.status === 200) {
          setIsLiked(res.data.liked);
        }
      } catch (error) {
        console.log(error);
      }
    };

    isSignedIn && checkLiked();
  }, [isLiked, isSignedIn]);

  return (
    <div onClick={handleLikeClick} className='likes'>
      <img src={isLiked ? like : unlike} alt='bookmark' />
      <span className='likes-count'>{currentSlide.likes}</span>
    </div>
  );
}
