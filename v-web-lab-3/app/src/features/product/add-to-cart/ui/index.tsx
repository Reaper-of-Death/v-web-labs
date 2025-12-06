import type { FC } from 'react';
import { useCart } from '../model/use-cart';
import cartIcon from '../../../../widgets/layout/header/image/cart-icon.png'

export const CartIndicator: FC = () =>{
    const { getItemCount } = useCart();
    const count = getItemCount();

    return(
        <div className="relative">
        <div className="text-2xl"><img src={cartIcon} alt="Cart" width="20" height="20" /></div>
        {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {count > 99 ? '99+' : count}
            </span>
        )}
        </div>
    )
}