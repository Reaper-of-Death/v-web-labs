import { type FC, type ImgHTMLAttributes } from 'react';

// Интерфейс для пропсов компонента
interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  url: string;
  alt: string;
}

// Вариант 4: Обернуть в функцию если нужно избежать verbatimModuleSyntax
export const Image: FC<ImageProps> = function ImageComponent({ url, alt }) {
  return <img src={url} alt={alt} />;
};