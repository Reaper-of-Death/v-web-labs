import { type FC } from 'react';

// Интерфейс для пропсов компонента
interface PriceProps {
  price?: number | string;
  discountPrice?: number | string | null;
}

// Вариант 1: С использованием FC
export const Price: FC<PriceProps> = ({ price, discountPrice }) => {
  return (
    <div className='inline-flex gap-1'>
      {discountPrice && price ? (
        <>
          <p className='text-base font-semibold'>{discountPrice}</p>
          <p className='text-xs line-through'>{price}</p>
        </>
      ) : (
        <p className='text-base font-semibold'>{price}</p>
      )}
    </div>
  );
};