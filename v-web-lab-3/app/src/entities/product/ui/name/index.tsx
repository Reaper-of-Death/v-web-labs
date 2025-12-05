import type { FC } from 'react';

// Интерфейс для пропсов компонента
interface NameProps {
  name: string;
  className?: string;
}

// Вариант 1: С использованием FC
export const Name: FC<NameProps> = ({ name, className = "" }) => {
  return (
    <p className={`text-sm font-medium text-gray-800 line-clamp-2 ${className}`}>
      {name}
    </p>
  );
};