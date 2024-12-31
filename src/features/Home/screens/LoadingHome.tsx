import { motion } from 'framer-motion';

export default function LoadingHome() {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col bg-black">
      <motion.h1
        animate={{
          opacity: [1, 0, 1], 
        }}
        transition={{
          duration: 4, 
          repeat: Infinity, 
          repeatType: 'loop', 
        }}
        className="text-3xl font-bold mb-6"
      >
        Japan Dahwa Foundation{' '}
      </motion.h1>
      <div className="loader3">
        <div className="circle1"></div>
        <div className="circle1"></div>
        <div className="circle1"></div>
        <div className="circle1"></div>
        <div className="circle1"></div>
      </div>
    </div>
  );
}
