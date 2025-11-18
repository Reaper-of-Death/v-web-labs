import { type FC } from 'react';
import { create } from "../../../entities/product";
import { Card } from '../../../widgets/product/card'; 
import { useSearch } from "../../../features/product/search/useSearch";
import defaultImage from "../products/image/default-image.png";

interface LocalProduct {
  id: number;
  title: string;
  price: number;
  discountPrice: number;
  image: {
    url: string;
    alt: string;
  };
}

// Преобразуем продукт из create в нужный формат
const createProduct = (id: number, title: string, price: number, discountPrice: number, alt: string): LocalProduct => ({
  id,
  title,
  price,
  discountPrice,
  image: {
    url: defaultImage,
    alt
  }
});

export const ProductList: FC = () => {
  const { searchQuery } = useSearch();
  
  const products: LocalProduct[] = [
    createProduct(1, 'Белая футболка', 1999, 1499, 'Белая футболка'),
    createProduct(2, 'Красная футболка', 2999, 2499, 'Красная футболка'),
    createProduct(3, 'Зеленая футболка', 2599, 1999, 'Зеленая футболка'),
    createProduct(4, 'Синяя футболка', 5999, 5699, 'Синяя футболка'),
    createProduct(5, 'Желтая футболка', 3499, 2999, 'Желтая футболка'),
    createProduct(6, 'Белая бесболка', 1599, 1399, 'Белая бесболка'),
    createProduct(7, 'Красная бесболка', 3999, 3499, 'Красная бесболка'),
    createProduct(8, 'Зеленая бесболка', 2299, 1999, 'Зеленая бесболка'),
    createProduct(9, 'Синяя бесболка', 7999, 6999, 'Синяя бесболка'),
    createProduct(10, 'Желтая бесболка', 4999, 3999, 'Желтая бесболка')
  ];

  // Защищенная фильтрация
  const filteredProducts = products.filter(product => {
    // Если searchQuery пустой или undefined, показываем все товары
    if (!searchQuery || searchQuery.trim() === '') {
      return true;
    }
    
    // Защита от ошибок если product или product.title undefined
    if (!product || !product.title) {
      return false;
    }
    
    // Безопасный поиск по title
    const query = searchQuery.toLowerCase().trim();
    const productTitle = product.title.toLowerCase();
    const matches = productTitle.includes(query);
    
    return matches;
  });

  return (
    <div className="max-w-6xl mx-auto">
      {searchQuery && searchQuery.trim() !== '' && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Результаты поиска
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Найдено товаров: <span className="font-medium">{filteredProducts.length}</span>
            </p>
            <p className="text-gray-600">
              По запросу: "<span className="font-medium">{searchQuery}</span>"
            </p>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && searchQuery && searchQuery.trim() !== '' && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            Ничего не найдено
          </h3>
          <p className="text-gray-500">
            Попробуйте изменить запрос или посмотреть другие товары
          </p>
        </div>
      )}
    </div>    
  );
};