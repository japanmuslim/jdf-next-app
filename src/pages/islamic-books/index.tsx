import useIslamicBooks from '@/features/IslamicBooks/hooks/useIslamicBooks';
import Layout from '@/layouts/Layout';
import { cn } from '@/lib/utils';
import { FaTimes } from 'react-icons/fa';

export default function IslamicBooks() {
  const { containerPdf, isOpenBooks, handleOpenBooks } = useIslamicBooks();

  return (
    <Layout
      id="islamic-books"
      pageTitle="Islamic Books | Japan Dahwa Foundation"
      pageDescription="Islamic Books Page"
    >
      <section
        id="hero"
        className="min-h-screen relative flex items-center justify-center"
      >
        <div className="w-full px-40 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-y-16 2xl:gap-y-20 xl:mt-14 2xl:mt-16 2xl:gap-x-20 xl:gap-x-24 relative z-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 h-60 w-full max-w-[200px] cursor-pointer"
              onClick={handleOpenBooks}
            ></div>
          ))}
        </div>

        <div
          className={cn(
            'absolute inset-0 bg-black/80 w-full h-full top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 flex justify-center items-center z-[999] transition-all duration-300',
            isOpenBooks ? 'opacity-100' : 'opacity-0 pointer-events-none',
          )}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl z-[999]"
            onClick={handleOpenBooks}
          >
            <FaTimes />
          </button>
          {/* <iframe
            ref={containerPdf}
            src="https://player.flipsnack.com?hash=NUFEQkJGNTU2OUIrZDFrbHhjdGd2dQ=="
            width="80%"
            height="80%"
            seamless
            scrolling="no"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-read; clipboard-write"
            allowTransparency
          ></iframe> */}
          <div
            ref={containerPdf}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            <iframe
              style={{
                position: 'absolute',
                border: 'none',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
              }}
              src="https://online.fliphtml5.com/megantaros/iwao/"
              seamless
              scrolling="no"
              frameBorder={0}
              allowTransparency
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
