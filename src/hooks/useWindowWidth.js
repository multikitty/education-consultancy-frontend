
import { useState, useEffect } from 'react'

const getWindowWidth = window => {
  const { innerWidth: width } = window;
  if(width >= 1920) return true;
  return false;
}

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(getWindowWidth(window));
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
}

export default useWindowWidth;