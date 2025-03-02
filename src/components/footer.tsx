import React, { memo } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import Icon from './icon';
import { handleSocialMedia } from '@/lib/helpers';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className="container py-10 grid lg:grid-cols-3 grid-cols-1 lg:gap-0 gap-8">
        <div className="flex items-center justify-center gap-3">
          <Icon />
          <div>
            <h4 className="text-white lg:text-xl md:text-xl text-lg font-bold !leading-none lg:tracking-wide md:tracking-wide tracking-normal">
              Japan Dahwa
            </h4>
            <h4 className="text-white lg:text-2xl md:text-2xl text-xl font-bold !leading-none lg:tracking-wide md:tracking-wide tracking-wider">
              Foundation
            </h4>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex-1 space-y-2">
            <h4 className="text-white text-base font-bold mb-4">本社</h4>
            <p className="text-white text-sm">静岡市駿河区広野5-14-5</p>
            <p className="text-white text-sm">Email: Eメール</p>
            <p className="text-white text-sm">muslimjapan.com</p>
          </div>
          <small className="text-white lg:block hidden">
            © 2021 Japan Dahwa Foundation. All rights reserved.
          </small>
        </div>
        <div className="flex flex-col">
          <div className="flex-1">
            <h4 className="text-white text-base font-bold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2">
              <ul className="text-white text-sm space-y-3">
                <li>
                  <Link href="/">ホーム</Link>
                </li>
                <li>
                  <Link href="/tafseer">タフスィール</Link>
                </li>
                <li>
                  <Link href="/dua">ドゥアー（祈り）とズィクル（唱念）</Link>
                </li>
                <li>
                  <Link href="/islamic-books">イスラーム関連書籍</Link>
                </li>
              </ul>
              <ul className="text-white text-sm space-y-3">
                <li>
                  <Link href="/article">記事</Link>
                </li>
                <li>
                  <Link href="/q&a">Q&よくある質問</Link>
                </li>
                <li>
                  <Link href="/quiz">クイズに挑戦</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex gap-14 lg:mt-8 mt-10 lg:justify-start justify-evenly">
            <Button
              variant={`destructive`}
              size={`icon`}
              className="rounded-full shadow-xl w-12 h-12 hover:scale-110 duration-300 transition-all"
              onClick={() => handleSocialMedia('fb')}
            >
              <FaFacebookF className="text-2xl" />
            </Button>
            <Button
              variant={`destructive`}
              size={`icon`}
              className="rounded-full shadow-xl w-12 h-12 hover:scale-110 duration-300 transition-all"
              onClick={() => handleSocialMedia('x')}
            >
              <FaXTwitter className="text-2xl" />
            </Button>
            <Button
              variant={`destructive`}
              size={`icon`}
              className="rounded-full shadow-xl w-12 h-12 hover:scale-110 duration-300 transition-all"
              onClick={() => handleSocialMedia('ig')}
            >
              <FaInstagram className="text-2xl" />
            </Button>
          </div>
        </div>
        <small className="text-white text-center lg:hidden block lg:mt-0 mt-2">
          © 2021 Japan Dahwa Foundation. All rights reserved.
        </small>
      </div>
    </footer>
  );
};

export default memo(Footer);
