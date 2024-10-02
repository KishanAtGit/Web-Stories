import { useState, useEffect } from "react";

export const useIsMobile = () => {
  // Define the breakpoint for mobile devices
  const mobileBreakpoint = 450;

  // State to hold the current value of whether the screen is mobile or not
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= mobileBreakpoint
  );

  useEffect(() => {
    // Function to update the state based on the current window width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= mobileBreakpoint);
    };

    // Add event listener for resize events
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileBreakpoint]);

  return isMobile;
};
