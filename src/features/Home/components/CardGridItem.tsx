import { cn } from '@/lib/utils';
import { CardVideosProps } from '../Home.type';
import Image from 'next/image';
import { IoPlay } from 'react-icons/io5';

const CardVideos = (props: CardVideosProps) => {
  const { name_tafseer, className, thumbnail_url, onClick } = props;

  return (
    <div
      className={cn(
        'relative lg:w-80 lg:h-44 md:w-60 md:h-36 w-28 h-16 bg-gray-800 text-white overflow-hidden shadow-lg transform transition-transform duration-300 ease-out perspective bg-cover bg-center bg-no-repeat cursor-pointer grid-card-item hover:scale-110 hover:-translate-y-4',
        className,
      )}
    >
      <Image
        src={thumbnail_url || ''}
        alt={name_tafseer || 'Tafseer'}
        layout="fill"
        objectFit="cover"
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
            {name_tafseer}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CardVideos;
