import { useContext } from 'react';
import { createBookmarkAPI } from '../../services/api.bookmarks';
import { SignedInContext } from '../../App';
import unbookmark from '../../assets/unbookmark.png';
import bookmark from '../../assets/bookmark.png';

export default function BookmarkIcon({
  isPreBookmarked,
  storyId,
  currentSlide,
  setOpenSignInModal,
}) {
  const { isSignedIn, setStoryUpdatedToggle } = useContext(SignedInContext);

  const handleBookmarkToggle = async () => {
    !isSignedIn && setOpenSignInModal(true);
    isSignedIn && (await updateBookmark());
  };

  const updateBookmark = async () => {
    try {
      const res = await createBookmarkAPI({
        storyId,
        slideId: currentSlide._id,
        ...currentSlide,
      });
      if (res.status === 201 || res.status === 200) {
        setStoryUpdatedToggle(prev => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <img
      className='bookmark'
      src={isPreBookmarked ? bookmark : unbookmark}
      alt='bookmark'
      onClick={handleBookmarkToggle}
    />
  );
}
