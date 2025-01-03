import Layout from '@/layouts/Layout';
import store from '@/init/store/store';
import { ArticleApi } from '@/services/api/articleService';
import { ArticleProps } from '@/features/Article/Article.type';
import useArticle from '@/features/Article/hooks/useArticle';
import ArticleView from '@/features/Article';

export async function getStaticProps() {
  const data = await store.dispatch(
    ArticleApi.endpoints.getArticle.initiate({}),
  );

  const categories = await store.dispatch(
    ArticleApi.endpoints.getArticleCategory.initiate({}),
  );

  return {
    props: {
      data: data?.data?.data || {},
      currentPages: data?.data?.current_page || 1,
      categories: categories?.data?.data || [],
      carousel: data?.data?.data?.data?.slice(0, 5) || [],
    },
    revalidate: 10,
  };
}

export default function Article({
  data,
  currentPages,
  categories,
  carousel,
}: ArticleProps) {
  const {
    articles,
    isLoading,
    page,
    lastPage,
    categoryRef,
    sectionRef,
    currentCategory,
    handlePaginate,
    handleRedirect,
    handleCategory,
    handleSlideCategory,
  } = useArticle({ data, currentPages });

  return (
    <Layout
      id="article"
      pageTitle="Article | Japan Dahwa Foundation"
      pageDescription="Article page"
    >
      <ArticleView
        articles={articles}
        categories={categories}
        currentCategory={currentCategory}
        carousel={carousel}
        isLoading={isLoading}
        page={page}
        lastPage={lastPage}
        sectionRef={sectionRef}
        categoryRef={categoryRef}
        onPaginate={handlePaginate}
        onRedirect={handleRedirect}
        onCategory={handleCategory}
        onSlideCategory={handleSlideCategory}
      />
    </Layout>
  );
}
