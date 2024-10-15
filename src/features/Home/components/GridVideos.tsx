import React, { useRef } from 'react';
import { GridVideosProps } from '../Home.type';
import CardVideos from './CardGridItem';

const GridVideos = (props: GridVideosProps) => {
  const { data = [], onTogglePlay } = props;
  const sectionRef = useRef<HTMLDivElement>(null);

  const groupedData = [
    [data[0], data[1]],
    [data[2], data[3], data[4]],
    [data[5], data[6]],
  ];

  const renderSkew = (index: number) => {
    if (index === 3) {
      return ''; // Tidak ada skew untuk data[3]
    }

    if (index === 2) {
      return 'skew-y-2';
    }

    if (index % 2 === 0) {
      return index === 0 ? 'skew-y-2' : '-skew-y-2';
    } else {
      return index === 1 ? '-skew-y-2' : 'skew-y-2';
    }
  };

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
      <div data-aos="zoom-in" className="lg:space-y-12 md:space-y-10 space-y-4">
        {groupedData.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="flex flex-row justify-center lg:gap-10 md:gap-6 gap-2"
          >
            {group.map((item, index) => (
              <CardVideos
                key={item.id}
                onClick={() => onTogglePlay?.(item.link_youtube)}
                className={renderSkew(groupIndex === 1 ? index + 2 : index)}
                {...item}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridVideos;
