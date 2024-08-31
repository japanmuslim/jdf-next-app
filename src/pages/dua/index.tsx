import Loading from '@/components/page/loading';
import { DuaProps } from '@/features/Dua/Dua.type';
import useDua from '@/features/Dua/hooks/useDua';
import store from '@/init/store/store';
import Layout from '@/layouts/Layout';
import { DuaApi } from '@/services/api/duaService';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';

export const getStaticProps: GetStaticProps = async () => {
  const data = await store.dispatch(DuaApi.endpoints.getDuaLatest.initiate({}));

  return {
    props: {
      data: data?.data?.data,
    },
  };
};

const DuaView = dynamic(() => import('@/features/Dua'), {
  ssr: false,
  loading: () => <Loading />,
});

export default function Dua({ data }: DuaProps) {
  const {
    duaRef,
    filteredData,
    isCurrent,
    isNavVisible,
    handleCurrent,
    handleSearch,
    handlePlay,
    handlePause,
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
        onCurrent={handleCurrent}
        onSearch={handleSearch}
        onPlay={handlePlay}
        onPause={handlePause}
      />
    </Layout>
  );
}
