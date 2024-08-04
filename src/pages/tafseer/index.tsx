import TafseerView from "@/features/Tafseer";
import { TafseerProps } from "@/features/Tafseer/Tafseer.type";
import store from "@/init/store/store";
import Layout from "@/layouts/Layout";
import { TafseerApi } from "@/services/api/tafseerService";
import { GetStaticProps } from "next";
import { useCallback, useRef, useState } from "react";

export const getStaticProps: GetStaticProps = async () => {
    const data = await store.dispatch(TafseerApi.endpoints.getTafseerLatest.initiate({}));

    return {
        props: {
            data: data?.data?.data,
        },
    };
}

export default function Tafseer({ data }: TafseerProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCurrent, setIsCurrent] = useState<number>(0);
    const tafseerRef = useRef<HTMLDivElement>(null);

    if (!data) setIsLoading(true);

    const handleCurrent = useCallback((current: number) => {
        setIsCurrent(current);
        tafseerRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <Layout
            id="tafseer"
            className="relative"
            pageTitle="Tafseer | Japan Dahwa Foundation"
            pageDescription="Tafseer page description"
        >
            <TafseerView
                data={data}
                tafseerRef={tafseerRef}
                isLoading={isLoading}
                isCurrent={isCurrent}
                handleCurrent={handleCurrent}
            />
        </Layout>
    );
}


