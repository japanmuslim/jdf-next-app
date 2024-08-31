import { useState, useEffect } from 'react';
import { ArticleProps, ArticleState } from '../Article.type';
import { useGetArticleQuery } from '@/services/api/articleService';
import { useRouter } from 'next/router';

const useArticle = ({ data, currentPages }: ArticleProps) => {
  const router = useRouter();
  const [articles, setArticles] = useState<ArticleState[]>(data || []);
  const [page, setPage] = useState<number>(currentPages || 1);
  const [currentCategory, setCurrentCategory] = useState(0);

  const { data: articlePaginate, isLoading } = useGetArticleQuery({ page });

  useEffect(() => {
    if (data) {
      setArticles(data || []);
      setPage(currentPages || 1);
    }
  }, [data, currentPages]);

  const handlePaginate = (newPage: number) => {
    if (newPage < 1) return;
    setPage(newPage);
  };

  useEffect(() => {
    if (articlePaginate?.data?.data) {
      setArticles(articlePaginate.data.data);
    }
  }, [articlePaginate]);

  const handleRedirect = (slug: string) => {
    if (!slug) return;

    router.push(`/article/${slug}`);
  };

  const handleCategory = (id: number) => {
    setCurrentCategory(id);

    if (id === 0) {
      setArticles(data || []); // Show all articles if id is 0
    } else {
      setArticles(
        data?.filter((item) => item?.news_categories_id === id) || [],
      );
    }
  };

  return {
    articles,
    isLoading,
    page,
    currentCategory,
    handleCategory,
    handlePaginate,
    handleRedirect,
  };
};

export default useArticle;
