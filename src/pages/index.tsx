import HomeView from "@/features/Home";
import Layout from "@/layouts/Layout";

export default function Home() {
  return (
    <Layout
      id="home"
      pageTitle="Home | Japan Dahwa Foundation"
      pageDescription="Home page description"
    >
      <HomeView />
    </Layout>
  );
}


