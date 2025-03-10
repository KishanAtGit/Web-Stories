import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import Loader from './loader/Loader';
import { notifyOnFail } from '../axios.config';
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
  const [isSingleSlideViewed, setIsSingleSlideViewed] = useState(false);
  const [loading, setLoading] = useState(true);
  const {
    isSignedIn,
    storyViewModal,
    handleStoryViewModal,
    storyUpdatedToggle,
    setYourStoriesInMobileView,
  } = useContext(SignedInContext);

  const [allStories, setAllStories] = useState([]);
  const [yourStories, setYourStories] = useState([]);
  const [yourBookmarks, setYourBookmarks] = useState([]);

  const location = useLocation();
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };
  const query = useQuery();
  const storyId = query.get('storyId');
  const slideId = query.get('slideId');
  const slideView = query.get('slideView');
  const storyView = query.get('storyView');

  const handleRegisterSuccess = () => {
    setOpenRegisterModal(false);
    setOpenSignInModal(true);
  };

  const handleLoginSuccess = () => {
    setOpenSignInModal(false);
  };

  useEffect(() => {
    setLoading(true);
    const getAllStories = async () => {
      try {
        const response = await getStoriesAPI();
        if (response.status === 200) {
          setAllStories(response.data);
        }
      } catch (error) {
        notifyOnFail('Unable to reach the server');
        console.log(error);
      }
      setLoading(false);
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
    !isSignedIn &&
      (() => {
        setYourBookmarks([]);
        setToggleBookmark(false);
        setYourStoriesInMobileView(false);
      })();

    const getBookmarks = async () => {
      try {
        const res = await getYourBookmarksAPI();
        if (res.status === 404) {
          setYourBookmarks([]);
        } else if (res.status === 200) {
          setYourBookmarks(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    isSignedIn && getBookmarks();
  }, [isSignedIn, storyUpdatedToggle]);

  useEffect(() => {
    setIsSingleSlideViewed(toggleBookmark);
    if (slideView) {
      setIsSingleSlideViewed(true),
        handleStoryViewModal(true, storyId, slideId);
    } else if (storyView) {
      handleStoryViewModal(true, storyId, slideId);
    }
  }, [toggleBookmark, slideView, storyView]);

  useEffect(() => {
    setActiveCategory([]);
  }, [isSignedIn]);

  // console.log(allStories, 'allStories');

  // if (loading) {
  //   return <Loader />; // Show loader while data is being loaded
  // }

  return (
    <div className='homepage'>
      <Navbar
        setOpenRegisterModal={setOpenRegisterModal}
        setOpenSignInModal={setOpenSignInModal}
        setToggleHamburger={setToggleHamburger}
        setOpenAddStoryModal={setOpenAddStoryModal}
        setToggleBookmark={setToggleBookmark}
        toggleBookmark={toggleBookmark}
      />
      {!toggleBookmark ? (
        <Categories
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      ) : (
        <Story
          isSingleSlideViewed={isSingleSlideViewed}
          stories={yourBookmarks}
          categoryHeading={'Your Bookmarks'}
        />
      )}
      {!toggleBookmark &&
        (loading && !storyViewModal.openModal ? (
          <Loader />
        ) : (
          <Stories
            categories={categories}
            activeCategory={activeCategory}
            stories={allStories}
            yourStories={yourStories}
            setOpenAddStoryModal={setOpenAddStoryModal}
          />
        ))}
      {openRegisterModal && (
        <AuthModal
          openAuthModal={openRegisterModal}
          setOpenAuthModal={setOpenRegisterModal}
          modalHeading={'Register'}
          modalButtonText={'Register'}
          onSuccess={handleRegisterSuccess}
        />
      )}
      {(openSignInModal || (openSignInModal && storyViewModal)) && (
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
      {storyViewModal.openModal && (
        <StoryViewModal
          storyViewModal={storyViewModal}
          story={allStories.find(story => story._id === storyViewModal.storyId)}
          handleStoryViewModal={handleStoryViewModal}
          isSingleSlideViewed={isSingleSlideViewed}
          yourBookmarks={yourBookmarks}
          setOpenSignInModal={setOpenSignInModal}
          setIsSingleSlideViewed={setIsSingleSlideViewed}
          toggleBookmark={toggleBookmark}
          storyView={storyView}
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
