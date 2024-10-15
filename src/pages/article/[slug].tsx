import { ArticleState } from '@/features/Article/Article.type';
import { DetailArticleProps } from '@/features/Article/DetailArticle/DetailArticle.type';
import store from '@/init/store/store';
import Layout from '@/layouts/Layout';
import { ArticleApi } from '@/services/api/articleService';
import { redirect } from 'next/navigation';
import React from 'react';
import useDetailArticle from '@/features/Article/DetailArticle/hooks/useDetailArticle';
import dynamic from 'next/dynamic';
import Loading from '@/components/page/loading';
import DetailArticleView from '@/features/Article/DetailArticle';

export async function getStaticPaths() {
  try {
    const data = await store.dispatch(
      ArticleApi.endpoints.getArticle.initiate({}),
    );

    // Pastikan data diambil dengan benar
    const articles = data?.data?.data?.data;
    if (!articles || !Array.isArray(articles)) {
      return {
        paths: [],
        fallback: 'blocking', // Pilihan yang aman untuk fallback
      };
    }

    // Filter articles dengan slug yang valid
    const validArticles = articles.filter(
      (article: ArticleState) => article.slug && article.slug.trim() !== '',
    );

    const paths = validArticles.map((article: ArticleState) => ({
      params: { slug: article.slug },
    }));

    // Jika tidak ada paths yang valid, kembalikan notFound
    if (paths.length === 0) {
      return {
        paths: [],
        fallback: 'blocking', // Atau Anda bisa mengembalikan notFound: true
      };
    }

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export async function getStaticProps({ params }: { params: { slug: number } }) {
  const data = await store.dispatch(
    ArticleApi.endpoints.getArticleBySlug.initiate({
      slug: params?.slug || '',
    }),
  );

  const relatedPost = await store.dispatch(
    ArticleApi.endpoints.getArticle.initiate({}),
  );

  return {
    props: {
      data: data?.data?.data || {},
      relatedPost: relatedPost?.data?.data?.data || [],
    },
    revalidate: 10,
  };
}

const DetailArticle = ({ data, relatedPost }: DetailArticleProps) => {
  const {
    handleShareFacebook,
    handleShareInstagram,
    handleShareWhatsapp,
    handleShareX,
    handleCopyLink,
    isCopied,
    handleScrollSmooth,
    handleRedirect,
  } = useDetailArticle();

  return (
    <Layout
      id="detail-article"
      pageTitle={`${data?.title || 'Detail Article'} | Japan Dahwa Foundation`}
      pageDescription={data?.desc || 'Detail Article Description'}
      keywords={data?.keywords || ''}
      metaDesc={data?.meta_desc || ''}
    >
      <DetailArticleView
        data={data}
        relatedPost={relatedPost}
        isCopied={isCopied}
        onShareFacebook={handleShareFacebook}
        onShareWhatsapp={handleShareWhatsapp}
        onCopyLink={handleCopyLink}
        onShareX={handleShareX}
        onShareInstagram={handleShareInstagram}
        onScrollSmooth={handleScrollSmooth}
        onRedirect={handleRedirect}
      />
    </Layout>
  );
};

export default DetailArticle;
