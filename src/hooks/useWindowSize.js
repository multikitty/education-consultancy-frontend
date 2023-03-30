import { useState, useEffect } from 'react'

const getWindowSize = window => {
  const { innerWidth: width } = window;
  if(width < 640) return 'xs';
  else if(width < 768) return 'sm';
  else if(width < 1024) return 'md';
  else if(width < 1280) return 'lg';
  else if(width < 1536) return 'xl';
  return '2xl';
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setWindowSize(getWindowSize(window));
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;