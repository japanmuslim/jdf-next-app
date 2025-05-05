import TafseerView from '@/features/Tafseer';
import { useTafseer } from '@/features/Tafseer/hooks/useTafseer';
import { OpeningTafseer, TafseerProps } from '@/features/Tafseer/Tafseer.type';
import store from '@/init/store/store';
import Layout from '@/layouts/Layout';
import { TafseerApi } from '@/services/api/tafseerService';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const data = await store.dispatch(TafseerApi.endpoints.getSurah.initiate({}));
  const juz = await store.dispatch(TafseerApi.endpoints.getJuz.initiate({}));
  const getLatest = await store.dispatch(
    TafseerApi.endpoints.getTafseerLatest.initiate({}),
  );
  const openingTafseer = await store.dispatch(
    TafseerApi.endpoints.getOpeningTafseer.initiate({}),
  );

  return {
    props: {
      opening: openingTafseer?.data?.data ?? null,
      data: data?.data?.data ?? [],
      juz: juz?.data?.data ?? [],
      latest: getLatest?.data?.data ?? [],
    },
    revalidate: 10,
  };
};

export default function Tafseer({ data, juz, latest, opening }: TafseerProps) {
  const {
    linkVideo,
    filteredData,
    isCurrentSurah,
    isCurrentTafseer,
    tafseerRef,
    isTab,
    isJuz,
    isCurrentJuz,
    isCloseDrawer,
    handleCurrentSurah,
    handleCurrentTafseer,
    handleSearch,
    isNavVisible,
    handleTab,
    handleCurrentJuz,
    handleCurrentLatest,
    handlePlayVideo,
    handlePauseVideo,
  } = useTafseer({ data, juz, opening: opening ?? ({} as OpeningTafseer) });

  return (
    <Layout
      id="tafseer"
      className="relative"
      pageTitle="Tafseer | Japan Dahwa Foundation"
      pageDescription="Tafseer page description"
      navbar={!isNavVisible}
    >
      <TafseerView
        linkVideo={linkVideo ?? ''}
        data={data}
        latest={latest}
        filteredData={filteredData}
        isCurrentSurah={isCurrentSurah}
        isCurrentTafseer={isCurrentTafseer}
        isTab={isTab}
        isJuz={isJuz}
        isCurrentJuz={isCurrentJuz}
        isCloseDrawer={isCloseDrawer}
        tafseerRef={tafseerRef}
        onSearch={handleSearch}
        onCurrentSurah={handleCurrentSurah}
        onCurrentTafseer={handleCurrentTafseer}
        onTab={handleTab}
        onCurrentJuz={handleCurrentJuz}
        onCurrentLatest={handleCurrentLatest}
        onPlay={handlePlayVideo}
        onPause={handlePauseVideo}
      />
    </Layout>
  );
}
