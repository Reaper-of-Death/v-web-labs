import { type FC } from 'react';

// Интерфейс для пропсов компонента
interface TitleProps {
  title: string;
  className?: string;
}

// Вариант 1: С использованием FC
export const Title: FC<TitleProps> = ({ title, className = "" }) => {
  return (
    <p className={`text-sm font-medium text-gray-800 line-clamp-2 ${className}`}>
      {title}
    </p>
  );
};