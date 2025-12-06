import type { FC } from 'react';
import { Image, Price, Name } from '../../../entities/product';
import type { Product } from '../../../entities/product';
import { useCart } from '../../../features/product/add-to-cart/model/use-cart';

// Интерфейс для пропсов компонента
interface CardProps {
  product: Product;
}

export const Card: FC<CardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    addItem(product);
    console.log('Добавлен товар:', product.id);
  };

  return (
    <div className='flex flex-col gap-3 bg-white rounded-xl shadow-md p-4 w-40 hover:shadow-2xl transition-all duration-500 ease-out hover:scale-105 cursor-pointer transform-gpu'>
      <div className='relative h-48 overflow-hidden rounded-lg'>
        <Image url={product.image.url} alt={product.image.alt} className="w-full h-full object-cover"/>
      </div>

      <div className="flex flex-col gap-2">
        <Name className="text-gray-900 hover:text-blue-600 transition" name={product.name} />
        <Price price={product.price} discountPrice={product.discountPrice} />

        <button
        onClick={handleAddToCart}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-800"
        >
         В корзину 
        </button>				
      </div>			
    </div>
  );
};