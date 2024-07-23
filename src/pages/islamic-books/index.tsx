import Layout from "@/layouts/Layout";
import { cn } from "@/lib/utils";

export default function IslamicBooks() {
    return (
        <Layout
            id="islamic-books"
            pageTitle="Islamic Books | Japan Dahwa Foundation"
            pageDescription="Islamic Books Page"
        >
            <section id="hero" className="min-h-screen py-96 relative">
                {/* <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex ms-7 gap-5">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="flex items-center">
                            <div className={cn(
                                "w-3 h-3 bg-white rounded-full",
                                i
                            )}></div>
                        </div>
                    ))}
                </div> */}
            </section>
        </Layout>
    );
}


