import DuaView from '@/features/Dua';
import { DuaProps } from '@/features/Dua/Dua.type';
import useDua from '@/features/Dua/hooks/useDua';
import store from '@/init/store/store';
import Layout from '@/layouts/Layout';
import { DuaApi } from '@/services/api/duaService';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const data = await store.dispatch(DuaApi.endpoints.getDuaLatest.initiate({}));

  return {
    props: {
      data: data?.data?.data || [],
    },
    revalidate: 10,
  };
};

export default function Dua({ data }: DuaProps) {
  const {
    duaRef,
    filteredData,
    isCurrent,
    isNavVisible,
    isCloseDrawer,
    handleCurrent,
    handleSearch,
    handlePlayVideo,
    handlePauseVideo,
  } = useDua({ data });

  return (
    <Layout
      id="dua"
      pageTitle="Dua | Japan Dahwa Foundation"
      pageDescription="Dua"
      navbar={!isNavVisible}
    >
      <DuaView
        data={data}
        duaRef={duaRef}
        filteredData={filteredData}
        isCurrent={isCurrent}
        isCloseDrawer={isCloseDrawer}
        onCurrent={handleCurrent}
        onSearch={handleSearch}
        onPlay={handlePlayVideo}
        onPause={handlePauseVideo}
      />
    </Layout>
  );
}
