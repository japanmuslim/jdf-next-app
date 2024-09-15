import AOS from 'aos';
import 'aos/dist/aos.css';
import { FC, memo } from 'react';

interface AosInitProps {
  duration?: number;
  easing?: string;
  once?: boolean;
}

const AosInit: FC<AosInitProps> = ({
  duration = 1000,
  // easing = 'ease-in-out',
  once = false,
}) => {
  AOS.init({
    duration,
    once,
  });
  return null;
};

export default memo(AosInit);
