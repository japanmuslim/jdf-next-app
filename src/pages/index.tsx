import HomeView from '@/features/Home';
import useHome from '@/features/Home/hooks/useHome';
import { TafseerState } from '@/features/Tafseer/Tafseer.type';
import store from '@/init/store/store';
import Layout from '@/layouts/Layout';
import { TafseerApi } from '@/services/api/tafseerService';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const getLatest = await store.dispatch(
    TafseerApi.endpoints.getTafseerLatest.initiate({}),
  );

  const videos = getLatest?.data?.data ?? [];

  return {
    props: {
      data: videos,
    },
  };
};

interface HomeProps {
  data: TafseerState[];
}

export default function Home(props: HomeProps) {
  const { data } = props;

  const { step, videoUrl, playVideo, handleTogglePlay } = useHome();

  return (
    <Layout
      id="home"
      pageTitle="Home | Japan Dahwa Foundation"
      pageDescription="Home page description"
      // navbar={step === 0 ? false : true}
    >
      <HomeView
        step={step}
        data={data}
        videoUrl={videoUrl}
        playVideo={playVideo}
        onTogglePlay={handleTogglePlay}
      />
    </Layout>
  );
}
