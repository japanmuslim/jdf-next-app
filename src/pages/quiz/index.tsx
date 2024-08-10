import QuizView from "@/features/Quiz";
import Layout from "@/layouts/Layout";
import { useRouter } from "next/router";

export default function Quiz() {

    const router = useRouter();

    const handleStart = () => {
        router.push('/quiz/start');
    }

    return (
        <Layout
            id="quiz"
            pageTitle="Quiz"
            pageDescription="Quiz page"
        >
            <QuizView handleStart={handleStart} />
        </Layout>
    );
}


