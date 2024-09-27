import { useState, useContext, useEffect } from 'react';
import { getStoriesAPI, getYourStoriesAPI } from '../services/api.stories';
import { getYourBookmarksAPI } from '../services/api.bookmarks';
import { SignedInContext } from '../App';
import Categories from './Categories';
import Navbar from './Navbar';
import Stories from './stories/Stories';
import AuthModal from './auth/AuthModal';
import UserProfile from './UserProfile';
import AddStoryModal from './addStoryModal/AddStoryModal';
import StoryViewModal from './storyView/StoryViewModal';
import categories from '../constant/categories';
import Story from './stories/Story';
// import stories from '../mock/stories';
// import yourStories from '../mock/yourStories';
// import yourBookmarks from '../mock/bookmarks';
import './Homepage.css';
export default function Homepage() {
  const [activeCategory, setActiveCategory] = useState([]);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const [toggleHamburger, setToggleHamburger] = useState(false);
  const [openAddStoryModal, setOpenAddStoryModal] = useState(false);
  const [toggleBookmark, setToggleBookmark] = useState(false);
  const {
    isSignedIn,
    storyViewModal,
    handleStoryViewModal,
    storyUpdatedToggle,
  } = useContext(SignedInContext);

  const [allStories, setAllStories] = useState([]);
  const [yourStories, setYourStories] = useState([]);
  const [yourBookmarks, setYourBookmarks] = useState([]);

  const handleRegisterSuccess = () => {
    setOpenRegisterModal(false);
    setOpenSignInModal(true);
  };

  const handleLoginSuccess = () => {
    setOpenSignInModal(false);
  };

  useEffect(() => {
    const getAllStories = async () => {
      try {
        const response = await getStoriesAPI();
        if (response.status === 200) {
          setAllStories(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllStories();

    const getYourStories = async () => {
      try {
        const yourStories = await getYourStoriesAPI();
        if (yourStories.status === 200) {
          setYourStories(yourStories.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    isSignedIn && getYourStories();
  }, [isSignedIn, storyUpdatedToggle]);

  useEffect(() => {
    setActiveCategory([]);
    !isSignedIn && setToggleBookmark(false);

    const getBookmarks = async () => {
      try {
        const bookmarks = await getYourBookmarksAPI();
        setYourBookmarks(bookmarks);
      } catch (error) {
        console.log(error);
      }
    };
    isSignedIn && getBookmarks();
  }, [isSignedIn]);

  console.log(yourBookmarks, 'yourBookmarks');

  return (
    <div className='homepage'>
      <Navbar
        setOpenRegisterModal={setOpenRegisterModal}
        setOpenSignInModal={setOpenSignInModal}
        setToggleHamburger={setToggleHamburger}
        setOpenAddStoryModal={setOpenAddStoryModal}
        setToggleBookmark={setToggleBookmark}
      />
      {!toggleBookmark ? (
        <Categories
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      ) : (
        <Story
          toggleBookmark={toggleBookmark}
          stories={yourBookmarks}
          categoryHeading={'Your Bookmarks'}
        />
      )}
      {!toggleBookmark && (
        <Stories
          categories={categories}
          activeCategory={activeCategory}
          stories={allStories}
          yourStories={yourStories}
        />
      )}
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
            toggleBookmark
              ? allStories.filter(story =>
                  story.slides.find(
                    slide => slide._id === storyViewModal.storyId
                  )
                )[0]
              : allStories.filter(
                  story => story._id === storyViewModal.storyId
                )[0]
          }
          handleStoryViewModal={handleStoryViewModal}
          toggleBookmark={toggleBookmark}
        />
      )}
      {toggleHamburger && (
        <UserProfile
          setToggleHamburger={setToggleHamburger}
          setOpenRegisterModal={setOpenRegisterModal}
          setOpenSignInModal={setOpenSignInModal}
          setOpenAddStoryModal={setOpenAddStoryModal}
          setToggleBookmark={setToggleBookmark}
        />
      )}
    </div>
  );
}
