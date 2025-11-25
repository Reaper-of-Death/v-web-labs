// Базовый интерфейс для продукта
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number; // опциональное поле
  image: string;
}

// Функция с явной типизацией параметров и возвращаемого значения
export const create = (
  id: number,
  name: string,
  description: string | undefined,
  price: number,
  discountPrice: number | undefined,
  image: string
): Product => ({
  id,
  name,
  description,
  price,
  discountPrice,
  image,
});