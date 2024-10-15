import { useState, useEffect, useRef } from 'react';
import { ArticleProps, ArticleState } from '../Article.type';
import { useGetArticleQuery } from '@/services/api/articleService';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const useArticle = ({ data, currentPages }: any) => {
  const router = useRouter();
  const [articles, setArticles] = useState<ArticleState[]>(data?.data || []);
  const [page, setPage] = useState<number>(currentPages || 1);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  const { data: articlePaginate, isLoading } = useGetArticleQuery({ page });

  useEffect(() => {
    if (data) {
      setArticles(data?.data || []);
      setPage(currentPages || 1);
      setLastPage(data?.last_page || 1);
    }
  }, [data, currentPages]);

  const handlePaginate = (newPage: number) => {
    if (newPage < 1) return;
    setPage(newPage);

    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (articlePaginate?.data?.data) {
      setArticles(articlePaginate.data.data);
    }
  }, [articlePaginate]);

  const handleRedirect = (slug: string) => {
    if (!slug) {
      toast('Article not found!', {
        type: 'error',
        theme: 'colored',
      });
    } else {
      router.push(`/article/${slug}`);
    }
  };

  const handleCategory = (id: number) => {
    setCurrentCategory(id);

    if (id === 0) {
      setArticles(data?.data || []); // Show all articles if id is 0
    } else {
      setArticles(
        data?.data?.filter(
          (item: ArticleState) => item?.news_categories_id === id,
        ) || [],
      );
    }
  };

  const handleSlideCategory = (index: number) => {
    if (categoryRef.current) {
      const categoryItems = categoryRef.current.querySelectorAll('button');
      const selectedCategory = categoryItems[index];

      if (selectedCategory) {
        const scrollAmount =
          selectedCategory.offsetLeft -
          window.innerWidth / 2 +
          selectedCategory.offsetWidth / 2;

        categoryRef.current.scrollTo({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }

      handleCategory(index);
    }
  };

  return {
    articles,
    isLoading,
    page,
    lastPage,
    categoryRef,
    sectionRef,
    currentCategory,
    handleCategory,
    handlePaginate,
    handleRedirect,
    handleSlideCategory,
  };
};

export default useArticle;
