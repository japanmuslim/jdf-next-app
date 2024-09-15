import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const useLayout = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return null;
};

export default useLayout;
