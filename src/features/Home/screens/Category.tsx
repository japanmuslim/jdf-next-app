import React, { memo, useState } from 'react';
import { CategoryVideoProps } from '../Home.type';
import Layout from '@/layouts/Layout';
import GridVideos from '../components/GridPerspective';

interface CategoryProps {
  data: CategoryVideoProps[];
  isLoading: boolean;
  onHandleCategory: (category: string) => void;
}

const Category = (props: CategoryProps) => {
  const { data, isLoading, onHandleCategory } = props;

  return (
    <div className="w-full">
      test
      <Layout
        id="home"
        pageTitle="Categories | Japan Dahwa Foundation"
        pageDescription="Home page description"
      >
        <section
          id="hero"
          className="flex items-center justify-center min-h-screen w-full relative"
        >
          <GridVideos
            type="category"
            data={data}
            onHandleCategory={onHandleCategory}
          />
        </section>
      </Layout>
    </div>
  );
};

export default memo(Category);
