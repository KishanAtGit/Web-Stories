import { useEffect, useState, useContext } from 'react';
import { createBookmarkAPI } from '../../services/api.bookmarks';
import { SignedInContext } from '../../App';
import unbookmark from '../../assets/unbookmark.png';
import bookmark from '../../assets/bookmark.png';

export default function Bookmark({ isPreBookmarked, storyId, currentSlide }) {
  const [toggleBookmark, setToggleBookmark] = useState(isPreBookmarked);
  const { setStoryUpdatedToggle } = useContext(SignedInContext);

  useEffect(() => {
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

    if (toggleBookmark !== isPreBookmarked) {
      updateBookmark();
    }
  }, [toggleBookmark]);

  return (
    <img
      className='bookmark'
      src={toggleBookmark ? bookmark : unbookmark}
      alt='bookmark'
      onClick={() => setToggleBookmark(prev => !prev)}
    />
  );
}
