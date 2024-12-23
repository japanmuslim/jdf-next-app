import React, { useRef } from 'react';
import { GridVideosProps } from '../Home.type';
import CardVideos from './CardGridItem';

const groupData = (data: any) => {
  const length = data.length;

  switch (length) {
    case 1:
      return [[data[0]]];
    case 2:
      return [[data[0]], [data[1]]];
    case 3:
      return [[data[0]], [data[1]], [data[2]]];
    case 4:
      return [
        [data[0], data[1]],
        [data[2], data[3]],
      ];
    case 5:
      return [[data[0], data[1]], [data[2]], [data[3], data[4]]];
    case 6:
      return [[data[0]], [data[1], data[2], data[3]], [data[4], data[5]]];
    case 7:
      return [
        [data[0], data[1]],
        [data[2], data[3], data[4]],
        [data[5], data[6]],
      ];
    case 8:
      return [
        [data[0], data[1]],
        [data[2], data[3], data[4]],
        [data[5], data[6], data[7]],
      ];
    case 9:
      return [
        [data[0], data[1], data[2]],
        [data[3], data[4], data[5]],
        [data[6], data[7], data[8]],
      ];
    case 10:
      return [
        [data[0], data[1], data[2]],
        [data[3], data[4], data[5], data[6]],
        [data[7], data[8], data[9]],
      ];
    default:
      return [];
  }
};

const GridPerspective = (props: GridVideosProps) => {
  const { data = [], type, onHandleVideo, onHandleCategory, isLoading } = props;
  const sectionRef = useRef<HTMLDivElement>(null);

  const groupedDataVideo = groupData(data);
  const groupDataCategory = groupData(data);

  const renderSkewCategory = (groupIndex: number, index: number) => {
    if (groupIndex === 0) {
      return index === 0 ? 'skew-y-2' : '-skew-y-2';
    }

    if (groupIndex === 1) {
      if (index === 0) {
        return '-skew-y-1';
      }
      if (index === 1) {
        return '';
      }
      if (index === 2) {
        return 'skew-y-1';
      }
    }

    if (groupIndex === 2) {
      return index === 0 ? '-skew-y-1' : 'skew-y-1';
    }
  };

  // const renderSkew = (index: number) => {
  //   if (index === 3) {
  //     return '';
  //   }

  //   if (index === 2) {
  //     return 'skew-y-2';
  //   }

  //   if (index % 2 === 0) {
  //     return index === 0 ? 'skew-y-2' : '-skew-y-2';
  //   } else {
  //     return index === 1 ? '-skew-y-2' : 'skew-y-2';
  //   }
  // };

  const handleMouseMove = (e: React.MouseEvent) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const centerX = rect.width / 2;
    const rotateY = (x - centerX) / 80;

    section.style.transform = `perspective(1000px) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const section = sectionRef.current;
    if (section) {
      section.style.transform = `perspective(1000px) rotateY(0deg)`;
    }
  };

  return (
    <div
      ref={sectionRef}
      className="hover-section w-full min-h-screen bg-transparent rounded-lg shadow-lg transition-transform duration-300 ease-out flex items-center justify-center pt-32 pb-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {type === 'category' && (
        <div
          data-aos="zoom-in"
          className="lg:space-y-12 md:space-y-10 space-y-4"
        >
          {groupDataCategory.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="flex flex-row justify-center lg:gap-10 md:gap-6 gap-2"
            >
              {group.map((item, index) => (
                <CardVideos
                  key={index}
                  type={type}
                  onClick={() =>
                    onHandleCategory && onHandleCategory(item?.category_name)
                  }
                  // className={renderSkewCategory(
                  //   groupIndex,
                  //   groupIndex === 1 ? index + 2 : index,
                  // )}
                  item={item}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {type === 'video' && (
        <div
          data-aos="zoom-in"
          className="lg:space-y-12 md:space-y-10 space-y-4"
        >
          {groupedDataVideo.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="flex flex-row justify-center lg:gap-10 md:gap-6 gap-2"
            >
              {group.map((item, index) => (
                <CardVideos
                  key={index}
                  type={type}
                  onClick={() => onHandleVideo && onHandleVideo(item?.id)}
                  // className={renderSkew(groupIndex === 1 ? index + 2 : index)}
                  item={item}
                  isLoading={isLoading}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GridPerspective;
