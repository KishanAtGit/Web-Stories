import { useState, useContext } from 'react';
import { SignedInContext } from '../App';
import Categories from './Categories';
import Navbar from './Navbar';
import Stories from './stories/Stories';
import AuthModal from './auth/AuthModal';
import UserProfile from './UserProfile';
import AddStoryModal from './addStoryModal/AddStoryModal';
import StoryViewModal from './storyView/StoryViewModal';
import categories from '../constant/categories';
import stories from '../mock/stories';
import yourStories from '../mock/yourStories';
import './Homepage.css';
export default function Homepage() {
  const [activeCategory, setActiveCategory] = useState([]);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const [toggleHamburger, setToggleHamburger] = useState(false);
  const [openAddStoryModal, setOpenAddStoryModal] = useState(false);
  const { storyViewModal, handleStoryViewModal } = useContext(SignedInContext);

  const handleRegisterSuccess = () => {
    setOpenRegisterModal(false);
    setOpenSignInModal(true);
  };

  const handleLoginSuccess = () => {
    setOpenSignInModal(false);
  };

  console.log(storyViewModal, 'storyViewModal');

  return (
    <div className='homepage'>
      <Navbar
        setOpenRegisterModal={setOpenRegisterModal}
        setOpenSignInModal={setOpenSignInModal}
        setToggleHamburger={setToggleHamburger}
        setOpenAddStoryModal={setOpenAddStoryModal}
      />
      <Categories
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <Stories
        categories={categories}
        activeCategory={activeCategory}
        stories={stories}
        yourStories={yourStories}
      />
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
        <UserProfile
          setToggleHamburger={setToggleHamburger}
          setOpenRegisterModal={setOpenRegisterModal}
          setOpenSignInModal={setOpenSignInModal}
          setOpenAddStoryModal={setOpenAddStoryModal}
        />
      )}
      {openAddStoryModal && (
        <AddStoryModal
          openAddStoryModal={openAddStoryModal}
          setOpenAddStoryModal={setOpenAddStoryModal}
        />
      )}
      {storyViewModal && (
        <StoryViewModal
          storyViewModal={storyViewModal}
          story={
            stories.filter(story => story._id === storyViewModal.storyId)[0]
          }
          handleStoryViewModal={handleStoryViewModal}
        />
      )}
    </div>
  );
}
