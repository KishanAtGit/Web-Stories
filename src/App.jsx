import { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Homepage from './components/Homepage';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

export const SignedInContext = createContext();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [storyViewModal, setStoryViewModal] = useState({
    openModal: false,
    storyId: '',
  });

  const handleStoryViewModal = (openModal, storyId) => {
    setStoryViewModal(prev => ({ ...prev, openModal, storyId }));
  };

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
