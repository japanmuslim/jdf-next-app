import Layout from '@/layouts/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

// export async function getStaticProps() {
//   const res = await axios.get(
//     'https://artikel-islam.netlify.app/.netlify/functions/api/fir',
//   );
//   const articles = res;

//   return {
//     props: {
//       articles,
//     },
//   };
// }

export default function Article() {
  return (
    <Layout
      id="article"
      pageTitle="Article | Japan Dahwa Foundation"
      pageDescription="Article page"
    >
      <section
        id="hero"
        className="min-h-[50vh] flex justify-center items-center bg-white"
      >
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center">Article Page</h1>
          <p className="text-center max-w-lg mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            convallis, nunc nec pulvinar aliquam, nunc risus varius purus, ac
            ultrices libero justo nec turpis
          </p>
        </div>
      </section>
      <section className="-mt-10 relative z-50 min-h-screen bg-[#191919] py-14 px-10 rounded-[30px] rounded-b-none">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="hidden lg:block lg:w-1/4 lg:sticky lg:top-20">
            <div className="py-6 px-4 rounded-xl flex flex-col gap-4 border border-[#777A7B]">
              {[...Array(5)].map((_, index) => (
                <Button asChild key={index} size="lg" variant="secondary">
                  <Link href="/article">Category {index + 1}</Link>
                </Button>
              ))}
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[...Array(4)].map((_, index) => (
                <Link
                  key={index}
                  href="/article"
                  className="flex flex-col gap-2"
                >
                  <div
                    className="relative overflow-hidden rounded-xl w-full md:h-60 border border-[#777A7B]"
                    id="article-card"
                  >
                    <Image
                      src="https://japan-dakwah-foundation.s3.amazonaws.com/13/Th-Surah-AN-Nasr.jpg"
                      width={500}
                      height={300}
                      alt="article"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-[#777A7B]">
                      Saturday, 12 June 2021 | 12:00 WIB
                    </p>
                    <h3 className="text-xl font-bold">
                      Surah An-Nasr: The Victory
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            {/* pagination */}
            <div className="flex justify-center gap-2 mt-10">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
