import React, { memo, useEffect, useState } from 'react';

interface ConvertTextProps {
  text: string;
  longText?: number;
  className?: string;
}

const ConvertText = ({ text, longText, className }: ConvertTextProps) => {
  const [desc, setDesc] = useState<string>('');

  useEffect(() => {
    if (longText) {
      if (text.length > longText) {
        setDesc(text.slice(0, longText) + '...');
      } else {
        setDesc(text);
      }
    } else {
      setDesc(text);
    }
  }, [text, longText]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: desc }}
      className={`leading-normal md:text-lg text-sm !font-thin ${className}`}
    />
  );
};

export default memo(ConvertText);
