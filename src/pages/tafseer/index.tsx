import Loading from '@/components/page/loading';
import { useTafseer } from '@/features/Tafseer/hooks/useTafseer';
import { TafseerProps, TafseerState } from '@/features/Tafseer/Tafseer.type';
import store from '@/init/store/store';
import Layout from '@/layouts/Layout';
import { TafseerApi } from '@/services/api/tafseerService';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';

export const getStaticProps: GetStaticProps = async () => {
  const data = await store.dispatch(TafseerApi.endpoints.getSurah.initiate({}));
  const juz = await store.dispatch(TafseerApi.endpoints.getJuz.initiate({}));
  const getLatest = await store.dispatch(
    TafseerApi.endpoints.getTafseerLatest.initiate({}),
  );

  return {
    props: {
      data: data?.data?.data ?? [],
      juz: juz?.data?.data ?? [],
      latest: getLatest?.data?.data ?? [],
    },
  };
};

const TafseerView = dynamic(() => import('@/features/Tafseer'), {
  ssr: false,
  loading: () => <Loading />,
});

export default function Tafseer({ data, juz, latest }: TafseerProps) {
  const {
    filteredData,
    isCurrentSurah,
    isCurrentTafseer,
    tafseerRef,
    isTab,
    isJuz,
    isCurrentJuz,
    handleCurrentSurah,
    handleCurrentTafseer,
    handleSearch,
    isNavVisible,
    handlePlay,
    handlePause,
    handleTab,
    handleCurrentJuz,
    handleCurrentLatest,
  } = useTafseer({ data, juz });

  return (
    <Layout
      id="tafseer"
      className="relative"
      pageTitle="Tafseer | Japan Dahwa Foundation"
      pageDescription="Tafseer page description"
      navbar={!isNavVisible}
    >
      <TafseerView
        data={data}
        latest={latest}
        filteredData={filteredData}
        isCurrentSurah={isCurrentSurah}
        isCurrentTafseer={isCurrentTafseer}
        isTab={isTab}
        isJuz={isJuz}
        isCurrentJuz={isCurrentJuz}
        tafseerRef={tafseerRef}
        onSearch={handleSearch}
        onCurrentSurah={handleCurrentSurah}
        onCurrentTafseer={handleCurrentTafseer}
        onPlay={handlePlay}
        onPause={handlePause}
        onTab={handleTab}
        onCurrentJuz={handleCurrentJuz}
        onCurrentLatest={handleCurrentLatest}
      />
    </Layout>
  );
}
