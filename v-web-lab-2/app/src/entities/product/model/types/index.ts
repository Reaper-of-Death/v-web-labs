// Базовый интерфейс для продукта
export interface Product {
  id: string | number;
  title: string;
  price: number;
  discountPrice?: number; // опциональное поле
  image: string;
}

// Функция с явной типизацией параметров и возвращаемого значения
export const create = (
  id: string | number,
  title: string,
  price: number,
  discountPrice: number | undefined,
  image: string
): Product => ({
  id,
  title,
  price,
  discountPrice,
  image,
});