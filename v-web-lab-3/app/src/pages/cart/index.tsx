import type { FC } from 'react';
import { Header } from '../../widgets/layout/header';
import { Footer } from '../../widgets/layout/footer';
import { CartL } from '../../widgets/cart/cart';

export const Cart: FC = () => {
  return (
    <div className="font-sans leading-relaxed min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex-grow flex-1 p-5">
        <CartL />
      </div>

      <Footer />
    </div>
  );
};