import { type FC, type ReactNode } from 'react';

// Интерфейс для пропсов компонента
interface LayoutProps {
  children: ReactNode;
}

// Вариант 1: С использованием FC
export const Layout: FC<LayoutProps> = ({ children }) => {
  return <div className='flex h-screen w-screen flex-col'>{children}</div>;
};