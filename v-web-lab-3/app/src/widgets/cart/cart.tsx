import type { FC } from 'react';
import { useCart } from '../../features/product/add-to-cart/model/use-cart';

export const CartL: FC = () => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    getTotalPrice, 
    getItemCount 
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="text-gray-400 text-4xl mb-4">🛒</div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Корзина пуста
        </h3>
        <p className="text-gray-500">
          Добавьте товары из каталога
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Корзина ({getItemCount()} товаров)</h2>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Очистить корзину
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <img 
                src={item.image.url} 
                alt={item.image.alt} 
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-600">
                  {(item.discountPrice || item.price).toLocaleString('ru-RU')} ₽ × {item.count}
                </p>
                <p className="font-bold">
                  {((item.discountPrice || item.price) * item.count).toLocaleString('ru-RU')} ₽
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.count - 1)}
                  className="w-8 h-8 flex items-center justify-center border rounded"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.count}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.count + 1)}
                  className="w-8 h-8 flex items-center justify-center border rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="ml-4 text-red-600 hover:text-red-800"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 border-t">
        <div className="flex justify-between items-center">
          <span className="text-lg">Итого:</span>
          <span className="text-2xl font-bold">{getTotalPrice().toLocaleString('ru-RU')} ₽</span>
        </div>
        <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium">
          Оформить заказ
        </button>
      </div>
    </div>
  );
};