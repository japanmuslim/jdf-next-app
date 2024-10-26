import { cn } from '@/lib/utils';
import Image from 'next/image';
import { IoPlay } from 'react-icons/io5';
import { CategoryVideoProps, VideoState } from '../Home.type';
import { IMG_BLUR } from '@/contants';

interface CardVideosProps {
  type?: 'category' | 'video';
  className?: string;
  onClick?: () => void;
  item: any;
}

const CardVideos = (props: CardVideosProps) => {
  const { className, onClick, item, type } = props;

  if (type === 'category') {
    return (
      <div
        className={cn(
          'grid-card-item-flip lg:w-80 lg:h-44 md:w-60 md:h-36 w-28 h-16 shadow-lg perspective !delay-300',
          className,
        )}
      >
        {/* Bagian depan card */}
        <div className="grid-card-item-front">
          <Image
            src={item?.thumbnail || ''}
            alt={item?.category_name || 'Category'}
            layout="fill"
            objectFit="cover"
          />
          <h3 className="card-title text-center">
            {item?.category_name || 'Category'}
          </h3>
        </div>

        {/* Bagian belakang card */}
        <div className="grid-card-item-back bg-[#191919] relative">
          <Image
            src={item?.thumbnail || ''}
            alt={item?.category_name || 'Category'}
            layout="fill"
            objectFit="cover"
            blurDataURL={IMG_BLUR}
            placeholder="blur"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center h-full w-full bg-black/80">
            <p
              onClick={onClick}
              className="font-semibold text-center lg:text-xl md:text-md text-xs hover:-translate-y-2 duration-300 transition-all hover:text-white/80 cursor-pointer"
            >
              {item?.category_name}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative lg:w-80 lg:h-44 md:w-60 md:h-36 w-28 h-16 bg-gray-800 text-white overflow-hidden shadow-lg transform transition-transform duration-300 ease-out perspective bg-cover bg-center bg-no-repeat cursor-pointer grid-card-item hover:scale-110 hover:-translate-y-4',
        className,
      )}
    >
      <Image
        src={item?.thumbnail_url || ''}
        alt={item?.name_video || 'Video'}
        layout="fill"
        objectFit="cover"
        blurDataURL={IMG_BLUR}
        placeholder="blur"
        priority
      />
      <div className="grid-card-item-overlay">
        <div className="flex flex-col items-center justify-center h-full relative w-full">
          <button
            onClick={onClick}
            className="md:p-4 p-1 rounded-full hover:bg-primary/80 hover:-translate-y-2 duration-300 transition-all hover:shadow shadow-lg"
          >
            <IoPlay className="md:text-3xl text-xs text-white" />
          </button>
          <h3 className="md:text-lg text-[8px] font-medium text-white absolute inset-x-0 md:bottom-3 bottom-1 w-full text-center">
            {item?.name_video}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CardVideos;
