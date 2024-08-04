import { Button } from "@/components/ui/button";
import Layout from "@/layouts/Layout";

export default function Quiz() {
    return (
        <Layout
            id="quiz"
            pageTitle="Quiz"
            pageDescription="Quiz page"
        >
            <section id="hero" className="min-h-screen flex justify-center items-center lg:px-8 px-6">
                <div className="bg-white w-full lg:max-w-lg p-4 rounded-lg text-primary relative z-10">
                    <h1 className="text-2xl font-bold text-center">Quiz</h1>
                    <div className="mt-4">
                        <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel mauris ac nunc posuere fermentum.</p>
                    </div>
                    <div className="mt-4">
                        <Button
                            type="button"
                            className="w-full"
                        >
                            Start Quiz
                        </Button>
                    </div>
                </div>
            </section>
        </Layout>
    );
}


