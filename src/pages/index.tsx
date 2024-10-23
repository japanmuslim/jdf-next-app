import Loading from '@/components/page/loading';
import Layout from '@/layouts/Layout';
import dynamic from 'next/dynamic';

const HomeView = dynamic(() => import('@/features/Home/Home.view'), {
  ssr: false,
  loading: () => <Loading />,
});

export default function Home() {
  return (
    <Layout
      id="home"
      pageTitle="Home | Japan Dahwa Foundation"
      pageDescription="Home page description"
      navbar={false}
      footer={false}
    >
      <HomeView />
    </Layout>
  );
}
