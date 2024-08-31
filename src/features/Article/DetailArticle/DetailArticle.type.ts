import { ArticleState } from '../Article.type';

export interface DetailArticleProps {
  data?: ArticleState;
  relatedPost?: ArticleState[];
}

export interface DetailArticleViewProps {
  data?: ArticleState;
  relatedPost?: ArticleState[];
  isCopied: boolean;
  onShareWhatsapp: () => void;
  onCopyLink: () => void;
  onShareFacebook: () => void;
  onShareX: () => void;
  onShareInstagram: () => void;
  onScrollSmooth: (href: string) => void;
  onRedirect: (slug: string) => void;
}
