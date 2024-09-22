import { useContext, useEffect } from 'react';
import { SignedInContext } from '../App';

export default function UserProfile({ setToggleHamburger }) {
  const { setIsSignedIn } = useContext(SignedInContext);
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
      <div className='profile-name'>{username}</div>
      <div className='logout-button button' onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
}
