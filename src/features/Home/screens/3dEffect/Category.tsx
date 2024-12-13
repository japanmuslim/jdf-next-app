import { CategoryVideoProps } from '../Home.type';
import Layout from '@/layouts/Layout';
import CanvasScene from './3dEffect/CanvasScene';
import React from 'react';

interface CategoryProps {
  data: CategoryVideoProps[];
  isLoading: boolean;
  onHandleCategory: (category: string) => void;
}

const Category = (props: CategoryProps) => {
  const { data, isLoading, onHandleCategory } = props;

  return (
    <div className="w-full">
      <Layout
        id="home"
        pageTitle="Categories | Japan Dahwa Foundation"
        pageDescription="Home page description"
      >
        <section
          id="hero"
          className="flex items-center justify-center min-h-screen w-full relative"
        >
          <CanvasScene data={data} />
        </section>
      </Layout>
    </div>
  );
};

export default Category;
