import { useContext } from 'react';
import { SignedInContext } from '../App';
import bookmarkIcon from '../assets/bookmarkIcon.svg';
import profileIcon from '../assets/profileIcon.png';
import hamburger from '../assets/hamburger.png';

export default function Navbar({
  setOpenRegisterModal,
  setOpenSignInModal,
  setToggleHamburger,
}) {
  const { isSignedIn } = useContext(SignedInContext);

  return (
    <div className='navbar'>
      {isSignedIn ? (
        <>
          <div className='bookmarks-button button'>
            <img src={bookmarkIcon} alt='icon' />
            <span>Bookmarks</span>
          </div>
          <div className='add-story-button button'>Add Story</div>
          <div className='profile-icon'>
            <img src={profileIcon} alt='profile-icon' />
          </div>
          <div className='hamburger'>
            <img
              src={hamburger}
              alt='hamburger'
              onClick={() => setToggleHamburger(prev => !prev)}
            />
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
    </div>
  );
}
