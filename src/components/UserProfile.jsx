import { useContext, useEffect } from 'react';
import { SignedInContext } from '../App';
import bookmarkIcon from '../assets/bookmarkIcon.png';
import profileIcon from '../assets/profileIcon.jpeg';

export default function UserProfile({
  setToggleHamburger,
  setOpenRegisterModal,
  setOpenSignInModal,
  setOpenAddStoryModal,
  setToggleBookmark,
}) {
  const { isSignedIn, setIsSignedIn, setYourStoriesInMobileView } =
    useContext(SignedInContext);
  const username = localStorage.getItem('username');

  useEffect(() => {
    window.addEventListener('click', handleHanburgerClose);

    window.addEventListener('click', handleClickOutside);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const handleHanburgerClose = () => {
    if (event.target.closest('.button')) {
      setToggleHamburger(false);
    }
  };

  const handleClickOutside = event => {
    if (!event.target.closest('.hamburger, .profile')) {
      setToggleHamburger(false);
    }
  };

  const handleScroll = () => {
    setToggleHamburger(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsSignedIn(false);
    setToggleHamburger(false);
  };

  return (
    <div className='profile'>
      {!isSignedIn ? (
        <>
          <div
            className='sign-in button'
            onClick={() => setOpenSignInModal(true)}
          >
            Login
          </div>
          <div
            className='register button'
            onClick={() => setOpenRegisterModal(true)}
          >
            Register
          </div>
        </>
      ) : (
        <>
          <div className='profile-container'>
            <div className='profile-icon'>
              <img
                style={{ width: '15vw' }}
                src={profileIcon}
                alt='profile-icon'
              />
            </div>
            <div className='profile-name'>{username}</div>
          </div>
          <div
            onClick={() => {
              setYourStoriesInMobileView(prev => !prev);
              setToggleBookmark(false);
            }}
            className='your-story-button button'
          >
            Your Story
          </div>
          <div
            className='add-story-button button'
            onClick={() => setOpenAddStoryModal(true)}
          >
            Add Story
          </div>
          <div
            onClick={() => {
              setToggleBookmark(prev => !prev);
              setYourStoriesInMobileView(false);
            }}
            className='bookmarks-button button'
          >
            <img src={bookmarkIcon} alt='icon' />
            <span>Bookmarks</span>
          </div>

          <div className='logout-button button' onClick={handleLogout}>
            Logout
          </div>
        </>
      )}
    </div>
  );
}
