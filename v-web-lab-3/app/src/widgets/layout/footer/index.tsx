import type { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-[50px] items-center flex p-1.5 border-t border-gray-210 bg-white z-40">
      <div className="flex gap-5 items-center justify-center">
        <p>&copy; 2025 Магазин</p>
        <p>Политика и безопасность</p>
        <p>Cookie</p>
      </div>
    </footer>
  );
};