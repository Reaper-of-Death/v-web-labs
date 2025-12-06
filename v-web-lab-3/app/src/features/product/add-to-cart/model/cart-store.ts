import type { Product, CartProduct } from "../../../../entities/product";

interface CartStore {
  items: CartProduct[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const createCartStore = (): CartStore => {
  let items: CartProduct[] = [];

  // Загружаем корзину из localStorage при инициализации
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        items = JSON.parse(savedCart);
      } catch (error) {
        console.error('Ошибка при загрузке корзины из localStorage:', error);
      }
    }
  }

  const saveToLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  };

  const addItem = (product: Product) => {
    const existingItem = items.find(item => item.id === product.id);
    
    if (existingItem) {
      // Увеличиваем количество, если товар уже в корзине
      existingItem.count += 1;
    } else {
      // Добавляем новый товар в корзину
      const cartProduct: CartProduct = {
        ...product,
        count: 1
      };
      items.push(cartProduct);
    }
    
    saveToLocalStorage();
  };

  const removeItem = (id: number) => {
    items = items.filter(item => item.id !== id);
    saveToLocalStorage();
  };

  const updateQuantity = (id: number, quantity: number) => {
    const item = items.find(item => item.id === id);
    if (item) {
      if (quantity <= 0) {
        removeItem(id);
      } else {
        item.count = quantity;
        saveToLocalStorage();
      }
    }
  };

  const clearCart = () => {
    items = [];
    saveToLocalStorage();
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = item.discountPrice || item.price;
      return total + (price * item.count);
    }, 0);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.count, 0);
  };

  return {
    get items() {
      return [...items]; // Возвращаем копию для иммутабельности
    },
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getItemCount
  };
};

// Экспортируем синглтон экземпляр
export const cartStore = createCartStore();