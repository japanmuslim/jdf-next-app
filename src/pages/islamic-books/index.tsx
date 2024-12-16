import NewSwiper from '@/components/new-swiper';
import Swiper from '@/components/ui/swiper';
import ModalPdf from '@/features/IslamicBooks/components/ModalPdf';
import useIslamicBooks from '@/features/IslamicBooks/hooks/useIslamicBooks';
import { Datum, IslamicBook } from '@/features/IslamicBooks/IslamicBook.type';
import useViewport from '@/hooks/useViewport';
import store from '@/init/store/store';
import Layout from '@/layouts/Layout';
import { cn } from '@/lib/utils';
import { IslamicBooksApi } from '@/services/api/islamicBooksService';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import Slider from 'react-slick';

export const getStaticProps: GetStaticProps = async () => {
  const data = await store.dispatch(
    IslamicBooksApi.endpoints.getCategoryBooks.initiate({}),
  );

  return {
    props: {
      data: data?.data?.data?.data ?? [],
    },
    revalidate: 10,
  };
};

interface IslamicBooksProps {
  data: Datum[];
}

export default function IslamicBooks({ data }: IslamicBooksProps) {
  const {
    containerPdf,
    isOpenBooks,
    currentCategory,
    handleCurrentCategory,
    handleCurrentBook,
    handleCloseBooks,
    dataLength,
    itemsPerSlide,
    totalSlides,
  } = useIslamicBooks(data);

  return (
    <Layout
      id="islamic-books"
      pageTitle="Islamic Books | Japan Dahwa Foundation"
      pageDescription="Islamic Books Page"
    >
      {isOpenBooks && (
        <ModalPdf
          isOpenBooks={isOpenBooks}
          containerPdf={containerPdf}
          onHandleCloseBooks={handleCloseBooks}
        />
      )}

      {/* isDesktop */}
      <section
        id="hero"
        className="min-h-screen relative lg:flex hidden flex-col items-center justify-center xl:pb-10 lg:pb-20"
      >
        <div className="w-full px-40 grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 xl:gap-y-16 2xl:gap-y-28 xl:mt-32 2xl:mt-52 lg:gap-x-12 lg:gap-y-14 lg:mt-32 2xl:gap-x-20 xl:gap-x-24 relative z-10">
          {data[currentCategory]?.islamic_books
            .map((val, i) => (
              <div
                key={i}
                className="overflow-hidden xl:h-60 lg:h-56 w-full max-w-[200px] cursor-pointer hover:-translate-y-2  transition-all duration-300 hover:shadow-lg mx-auto"
              >
                <Image
                  src={val?.cover}
                  alt={val?.book_title}
                  height={200}
                  width={200}
                  onClick={() => handleCurrentBook(i)}
                  className="object-cover h-full w-full"
                />
              </div>
            ))
            .concat(
              Array.from({
                length: 8 - data[currentCategory]?.islamic_books.length,
              }).map((_, i) => (
                <div
                  key={i}
                  className="xl:h-60 lg:h-56 w-full bg-slate-50 max-w-[200px] mx-auto"
                ></div>
              )),
            )}
        </div>

        <div className="flex mx-auto 2xl:-mb-6 xl:-mb-12 xl:mt-10 lg:mt-10 lg:-mb-20 relative z-10">
          {data.map((val, i) => (
            <button
              key={i}
              onClick={() => handleCurrentCategory(i)}
              className={cn(
                'px-10 py-3 mx-2 text-white rounded-full bg-[#191919]/60 hover:bg-[#191919] transition-all duration-300',
                currentCategory === i ? 'bg-[#191919]' : 'bg-[#191919]/60',
              )}
            >
              {val?.name}
            </button>
          ))}
        </div>
      </section>

      {/* isTablet and Mobile */}
      <section className="lg:hidden flex items-center justify-center min-h-screen bg-[url('/assets/images/islamic-books/bg-mobile.jpg')] bg-center bg-cover bg-no-repeat md:px-10 px-4 pt-20">
        <div>
          <NewSwiper
            id="islamic-books"
            dynamicBullets={false}
            autoPlay={false}
            buttonNextClassName="md:!top-[38%] md:!right-4 md:!p-4 hover:!bg-[#EBEEFF]"
            buttonNextLabelClassName="md:!text-2xl"
            buttonPrevClassName="md:!top-[38%] md:!left-4 md:!p-4 hover:!bg-[#EBEEFF]"
            buttonPrevLabelClassName="md:!text-2xl"
            classNameSlide="md:!pb-20 !pb-10 !w-full !h-fit"
            breakpoint={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
            }}
          >
            {[...Array(totalSlides)].map((_, i) => (
              <div
                key={i}
                className="relative w-full h-full flex items-center justify-center !pt-2"
              >
                <div className="grid grid-cols-2 gap-4 md:gap-12">
                  {[...Array(itemsPerSlide)].map((_, j) => {
                    const dataIndex = i * itemsPerSlide + j;

                    if (dataIndex >= dataLength) {
                      return (
                        <div
                          key={j}
                          className="xl:h-60 lg:h-56 w-full bg-slate-50 max-w-[200px] mx-auto"
                        ></div>
                      );
                    }

                    const item =
                      data[currentCategory]?.islamic_books[dataIndex];

                    if (!item) {
                      return (
                        <div
                          key={j}
                          className="xl:h-60 lg:h-56 w-full bg-slate-50 max-w-[200px] mx-auto"
                        ></div>
                      );
                    }

                    return (
                      <div
                        key={j}
                        className="overflow-hidden md:h-80 h-60 w-full md:w-60 cursor-pointer hover:-translate-y-2  transition-all duration-300 hover:shadow-lg mx-auto"
                      >
                        <Image
                          src={item?.cover}
                          alt="Test"
                          height={200}
                          width={200}
                          onClick={() => handleCurrentBook(dataIndex)}
                          className="object-cover h-full w-full"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </NewSwiper>

          <div className="flex flex-col items-center justify-center md:mt-10 mt-6 z-10">
            {data.map((val, i) => (
              <button
                key={i}
                onClick={() => handleCurrentCategory(i)}
                className={cn(
                  'px-10 py-2 md:py-4 mx-2 text-white rounded-full bg-[#191919]/60 hover:bg-[#191919] transition-all duration-300',
                  currentCategory === i ? 'bg-[#191919]' : 'bg-[#191919]/60',
                )}
              >
                {val?.name}
              </button>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
