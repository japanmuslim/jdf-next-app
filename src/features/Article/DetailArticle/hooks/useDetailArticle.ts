import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';

const useDetailArticle = () => {
  const router = useRouter();
  const [isCopied, setIsCopied] = React.useState(false);

  const handleShareWhatsapp = () => {
    const url = window.location.href; // Mendapatkan URL saat ini
    const message = `${url}`; // Pesan yang ingin dikirim
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank'); // Membuka WhatsApp di tab baru
  };

  const handleCopyLink = () => {
    const url = window.location.href; // Mendapatkan URL saat ini
    navigator.clipboard.writeText(url); // Menyalin URL ke clipboard

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const handleShareFacebook = () => {
    const url = window.location.href; // Mendapatkan URL saat ini
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

    window.open(facebookUrl, '_blank'); // Membuka Facebook di tab baru
  };

  const handleShareX = () => {
    const url = window.location.href; // Mendapatkan URL saat ini
    const xUrl = `https://x.com?u=${url}`;

    window.open(xUrl, '_blank'); // Membuka X di tab baru
  };

  const handleShareInstagram = () => {
    const url = window.location.href; // Mendapatkan URL saat ini
    const instagramUrl = `https://www.instagram.com/sharer/sharer.php?u=${url}`;

    window.open(instagramUrl, '_blank'); // Membuka Instagram di tab baru
  };

  const handleScrollSmooth = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
        inline: 'start',
      });
    }
  };

  const handleRedirect = (slug: string) => {
    if (!slug) {
      toast('Article not found!', {
        type: 'error',
        theme: 'colored',
      });
    } else {
      router.push(`/article/${slug}`);
    }
  };

  return {
    isCopied,
    handleShareWhatsapp,
    handleCopyLink,
    handleShareFacebook,
    handleShareX,
    handleShareInstagram,
    handleScrollSmooth,
    handleRedirect,
  };
};

export default useDetailArticle;
