import Image from 'next/image';
import React, { FC, memo } from 'react';
import { IoTimeOutline } from 'react-icons/io5';
import { ArticleState } from '../Article.type';
import { FaRegFileAlt } from 'react-icons/fa';
import { FaRegFileImage } from 'react-icons/fa6';

interface ArticleCardProps {
  key: number;
  article: ArticleState;
  onRedirect: (slug: string) => void;
}

const ArticleCard: FC<ArticleCardProps> = ({ key, article, onRedirect }) => (
  <div
    key={key}
    id="article-card"
    className="flex flex-col gap-2 cursor-pointer"
    onClick={() => onRedirect(article?.slug)}
  >
    <div
      id="article-container"
      className="relative overflow-hidden rounded-xl w-full md:h-60 h-40 border border-[#777A7B]"
    >
      {article?.thumbnail_url && (
        <Image
          src={article?.thumbnail_url || '/images/placeholder.jpg'}
          width={500}
          height={300}
          alt={article?.title}
          className="w-full h-full object-cover"
        />
      )}
      {!article?.thumbnail_url && (
        <FaRegFileImage className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#777A7B] text-6xl" />
      )}
    </div>
    <div className="space-y-2 mt-2">
      <p className="md:text-md text-xs text-[#f05454] flex items-center gap-1 h-4">
        <IoTimeOutline className="md:text-lg text-md" />
        {typeof window !== 'undefined' &&
          new Date(article?.created_at).toLocaleString('ja-JP', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
      </p>
      <h3 className="md:text-xl text-base font-bold">{article?.title}</h3>
      <div
        dangerouslySetInnerHTML={{
          __html: `${article?.desc.slice(0, 70)}...`,
        }}
        className="text-[#777A7B] md:text-sm text-xs whitespace-wrap !font-normal"
      />
      {(article?.tags?.length || 0) > 0 && (
        <div className="flex flex-wrap gap-1">
          {article?.tags?.map((item, index) => (
            <button
              type="button"
              key={index}
              className="text-md rounded-full px-6 py-2 bg-blue-500 bg-opacity-10 text-blue-500 capitalize"
            >
              {item?.name}
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default memo(ArticleCard);
