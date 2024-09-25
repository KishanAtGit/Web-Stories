import { useContext, useEffect } from 'react';
import { SignedInContext } from '../App';
import bookmarkIcon from '../assets/bookmarkIcon.svg';
import profileIcon from '../assets/profileIcon.png';

export default function UserProfile({
  setToggleHamburger,
  setOpenRegisterModal,
  setOpenSignInModal,
  setOpenAddStoryModal,
}) {
  const { isSignedIn, setIsSignedIn } = useContext(SignedInContext);
  const username = localStorage.getItem('username');

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  });

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

  console.log('UserProfile', username);

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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5vw',
            }}
          >
            <div className='profile-icon'>
              <img
                style={{ width: '7vw' }}
                src={profileIcon}
                alt='profile-icon'
              />
            </div>
            <div className='profile-name'>{username}</div>
          </div>
          <div className='your-story-button button'>Your Story</div>
          <div
            className='add-story-button button'
            onClick={() => setOpenAddStoryModal(true)}
          >
            Add Story
          </div>
          <div className='bookmarks-button button'>
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
