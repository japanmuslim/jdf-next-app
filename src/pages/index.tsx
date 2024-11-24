import HomeView from '@/features/Home';
import Layout from '@/layouts/Layout';

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
