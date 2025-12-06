import { useEffect, useState } from 'react';
import type { CartProduct } from '../../../../entities/product';
import { cartStore } from './cart-store';

export const useCart = () => {
  const [items, setItems] = useState<CartProduct[]>(cartStore.items);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {    
    const updateItems = () => {
      setItems([...cartStore.items]);
      setIsInitialized(true);
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart') {
        updateItems();
      }
    };

    updateItems();

    window.addEventListener('storage', handleStorageChange);
    
    const handleCartUpdate = () => updateItems();
    window.addEventListener('cartUpdated', handleCartUpdate as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate as EventListener);
    };
  }, []);

  const addItem = (product: Parameters<typeof cartStore.addItem>[0]) => {
    cartStore.addItem(product);
    setItems([...cartStore.items]);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (id: number) => {
    cartStore.removeItem(id);
    setItems([...cartStore.items]);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const updateQuantity = (id: number, quantity: number) => {
    cartStore.updateQuantity(id, quantity);
    setItems([...cartStore.items]);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCart = () => {
    cartStore.clearCart();
    setItems([]);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const getTotalPrice = () => cartStore.getTotalPrice();
  const getItemCount = () => cartStore.getItemCount();

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getItemCount,
    isInitialized
  };
};