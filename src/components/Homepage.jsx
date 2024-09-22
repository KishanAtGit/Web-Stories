import { useState } from 'react';
import Categories from './Categories';
import Navbar from './Navbar';
import Stories from './stories/Stories';
import categories from '../mock/category';
import AuthModal from './auth/AuthModal';
import UserProfile from './UserProfile';
import './Homepage.css';
export default function Homepage() {
  const [activeCategory, setActiveCategory] = useState([]);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const [toggleHamburger, setToggleHamburger] = useState(false);

  const handleRegisterSuccess = () => {
    setOpenRegisterModal(false);
    setOpenSignInModal(true);
  };

  const handleLoginSuccess = () => {
    setOpenSignInModal(false);
  };

  console.log('Homepage');

  return (
    <div className='homepage'>
      <Navbar
        setOpenRegisterModal={setOpenRegisterModal}
        setOpenSignInModal={setOpenSignInModal}
        setToggleHamburger={setToggleHamburger}
      />
      <Categories
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <Stories categories={categories} activeCategory={activeCategory} />
      {openRegisterModal && (
        <AuthModal
          openAuthModal={openRegisterModal}
          setOpenAuthModal={setOpenRegisterModal}
          modalHeading={'Register'}
          modalButtonText={'Register'}
          onSuccess={handleRegisterSuccess}
        />
      )}
      {openSignInModal && (
        <AuthModal
          openAuthModal={openSignInModal}
          setOpenAuthModal={setOpenSignInModal}
          modalHeading={'Login'}
          modalButtonText={'Login'}
          onSuccess={handleLoginSuccess}
        />
      )}
      {toggleHamburger && (
        <UserProfile setToggleHamburger={setToggleHamburger} />
      )}
    </div>
  );
}
