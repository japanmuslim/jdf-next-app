import DuaView from "@/features/Dua";
import { DuaProps } from "@/features/Dua/Dua.type";
import store from "@/init/store/store";
import Layout from "@/layouts/Layout";
import { DuaApi } from "@/services/api/duaService";
import { GetStaticProps } from "next";
import { useCallback, useRef, useState } from "react";

export const getStaticProps: GetStaticProps = async () => {
    const data = await store.dispatch(DuaApi.endpoints.getDuaLatest.initiate({}));

    return {
        props: {
            data: data?.data?.data,
        }
    }
}

export default function Dua({ data }: DuaProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCurrent, setIsCurrent] = useState<number>(0);
    const duaRef = useRef<HTMLDivElement>(null);

    if (!data) setIsLoading(true);

    const handleCurrent = useCallback((current: number) => {
        setIsCurrent(current);
        duaRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <Layout
            id="dua"
            pageTitle="Dua"
            pageDescription="Dua page"
        >
            <DuaView
                data={data}
                duaRef={duaRef}
                isLoading={isLoading}
                isCurrent={isCurrent}
                handleCurrent={handleCurrent}
            />
        </Layout>
    );
}


