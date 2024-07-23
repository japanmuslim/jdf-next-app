import TafseerView from "@/features/Tafseer";
import Layout from "@/layouts/Layout";

export default function Tafseer() {
    return (
        <Layout
            id="tafseer"
            className="relative"
            pageTitle="Tafseer | Japan Dahwa Foundation"
            pageDescription="Tafseer page description"
        >
            <TafseerView />
        </Layout>
    );
}


