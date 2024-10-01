import { useContext } from 'react';
import { SignedInContext } from '../App';
import bookmarkIcon from '../assets/bookmarkIcon.png';
import profileIcon from '../assets/profileIcon.jpeg';
import hamburger from '../assets/hamburger.png';

export default function Navbar({
  setOpenRegisterModal,
  setOpenSignInModal,
  setToggleHamburger,
  setOpenAddStoryModal,
  setToggleBookmark,
}) {
  const { isSignedIn } = useContext(SignedInContext);

  return (
    <div className='navbar'>
      {isSignedIn ? (
        <>
          <div
            onClick={() => setToggleBookmark(prev => !prev)}
            className='bookmarks-button button'
          >
            <img src={bookmarkIcon} alt='icon' />
            <span>Bookmarks</span>
          </div>
          <div
            className='add-story-button button'
            onClick={() => setOpenAddStoryModal(true)}
          >
            Add Story
          </div>
          <div className='profile-icon'>
            <img src={profileIcon} alt='profile-icon' />
          </div>
        </>
      ) : (
        <>
          <div
            className='register button'
            onClick={() => setOpenRegisterModal(true)}
          >
            Register Now
          </div>
          <div
            className='sign-in button'
            onClick={() => setOpenSignInModal(true)}
          >
            Sign In
          </div>
        </>
      )}
      <div style={isSignedIn ? { display: 'flex' } : {}} className='hamburger'>
        <img
          src={hamburger}
          alt='hamburger'
          onClick={() => setToggleHamburger(prev => !prev)}
        />
      </div>
    </div>
  );
}
