// Базовый интерфейс для продукта
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number; // опциональное поле
  image: {
    url: string;
    alt: string;
  };
}

// Функция с явной типизацией параметров и возвращаемого значения
export const createProduct = (
  id: number,
  name: string,
  description: string | undefined,
  price: number,
  discountPrice: number | undefined,
  image: {
    url: string;
    alt: string;
  }
): Product => ({
  id,
  name,
  description,
  price,
  discountPrice,
  image,
});