import TafseerView from '@/features/Tafseer';
import { useTafseer } from '@/features/Tafseer/hooks/useTafseer';
import { TafseerProps, TafseerState } from '@/features/Tafseer/Tafseer.type';
import store from '@/init/store/store';
import Layout from '@/layouts/Layout';
import { TafseerApi } from '@/services/api/tafseerService';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const data = await store.dispatch(
    TafseerApi.endpoints.getTafseerLatest.initiate({}),
  );

  return {
    props: {
      data: data?.data?.data,
    },
  };
};

export default function Tafseer({ data }: TafseerProps) {
  const { filteredData, isCurrent, tafseerRef, handleCurrent, handleSearch } =
    useTafseer({ data });

  return (
    <Layout
      id="tafseer"
      className="relative"
      pageTitle="Tafseer | Japan Dahwa Foundation"
      pageDescription="Tafseer page description"
    >
      <TafseerView
        data={data}
        filteredData={filteredData}
        isCurrent={isCurrent}
        tafseerRef={tafseerRef}
        onSearch={handleSearch}
        onCurrent={handleCurrent}
      />
    </Layout>
  );
}
