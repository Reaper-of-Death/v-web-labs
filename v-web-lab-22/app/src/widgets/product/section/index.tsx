import type { FC, ReactNode } from 'react';

// Интерфейс для пропсов компонента
interface SectionProps {
  title: string;
  children: ReactNode;
}

// Вариант 1: С использованием FC
export const Section: FC<SectionProps> = ({ title, children }) => {
  return (
    <section className='flex flex-col gap-6'>
      <h3 className='text-2xl font-medium'>{title}</h3>
      {children}
    </section>
  );
};