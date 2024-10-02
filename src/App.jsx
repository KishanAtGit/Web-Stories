import { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useIsMobile } from './hook/useMobile';

import Homepage from './components/Homepage';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

export const SignedInContext = createContext();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(
    !localStorage.getItem('userId') ? false : true
  );
  const [storyViewModal, setStoryViewModal] = useState({
    openModal: false,
    storyId: '',
    slideId: '',
  });
  const [storyUpdatedToggle, setStoryUpdatedToggle] = useState(false);

  const handleStoryViewModal = (openModal, storyId, slideId = '') => {
    setStoryViewModal(prev => ({ ...prev, openModal, storyId, slideId }));
  };

  const [yourStoriesInMobileView, setYourStoriesInMobileView] = useState(false);

  const customModalStyles = {
    overlay: {
      backgroundColor: '#000000E5',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  const mobileView = useIsMobile();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <SignedInContext.Provider
                value={{
                  isSignedIn,
                  setIsSignedIn,
                  storyViewModal,
                  setStoryViewModal,
                  handleStoryViewModal,
                  storyUpdatedToggle,
                  setStoryUpdatedToggle,
                  customModalStyles,
                  yourStoriesInMobileView,
                  setYourStoriesInMobileView,
                  mobileView,
                }}
              >
                <Homepage />
              </SignedInContext.Provider>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
