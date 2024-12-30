'use client';

import { CategoryVideoProps } from '../Home.type';
import Layout from '@/layouts/Layout';
// import CanvasScene from './3dEffect/CanvasScene';
import React, { memo, useState } from 'react';
import dynamic from 'next/dynamic';
import FallingSakura from '../components/fallingSakura/FallingSakura';
import Loading from '@/components/page/loading';
import { motion } from 'framer-motion';
import LoadingHome from './LoadingHome';

const Scene3D = dynamic(
  () => import('../components/3dEffects/CanvasCategories'),
  {
    ssr: false,
    loading: () => <LoadingHome />,
  },
);

interface CategoryProps {
  data: CategoryVideoProps[];
  isLoading: boolean;
  onHandleCategory: (category: string) => void;
}

const Category = (props: CategoryProps) => {
  const { data, isLoading, onHandleCategory } = props;

  return (
    <>
      {' '}
      {isLoading && <LoadingHome />}
      {!isLoading && (
        <Layout
          id="home"
          pageTitle="Categories | Japan Dahwa Foundation"
          pageDescription="Home page description"
          className="overflow-x-hidden"
        >
          <div style={{ position: 'relative', zIndex: 1 }}>
            <section
              id="hero"
              className="flex items-center justify-center min-h-screen w-full relative bg-transparent"
            >
              <Scene3D data={data} onHandleCategory={onHandleCategory} />
            </section>
          </div>
        </Layout>
      )}
    </>
  );
};

export default memo(Category);
