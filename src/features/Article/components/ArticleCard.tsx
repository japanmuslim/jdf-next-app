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
      <p className="text-md text-[#f05454] flex items-center gap-2 h-4">
        <IoTimeOutline className="text-lg" />
        {typeof window !== 'undefined' &&
          new Date(article?.created_at).toLocaleString('ja-JP', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
      </p>
      <h3 className="text-xl font-bold">{article?.title}</h3>
      <div
        dangerouslySetInnerHTML={{
          __html: `${article?.desc.slice(0, 70)}...`,
        }}
        className="text-[#777A7B] md:text-sm text-xs whitespace-wrap !font-normal"
      />
      <div className="flex flex-wrap gap-2">
        {article?.keywords.split(',').map((keyword, index) => (
          <span
            key={index}
            className="text-xs rounded-full px-4 py-[6px] bg-primary bg-opacity-10 text-blue-500 capitalize"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default memo(ArticleCard);
