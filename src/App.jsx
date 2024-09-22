import { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Homepage from './components/Homepage';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

export const SignedInContext = createContext();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  console.log('App');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <SignedInContext.Provider value={{ isSignedIn, setIsSignedIn }}>
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
