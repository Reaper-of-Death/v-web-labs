import type { FC } from 'react';
import type { Product } from '../../../entities/product';
import { createProduct } from "../../../entities/product";
import { Card } from '../../../widgets/product/card'; 
import { useSearch } from "../../../features/product/search/useSearch";
import defaultImage from "../products/image/default-image.png";

const defaultImageConstruction = {url: defaultImage, alt: defaultImage}

export const products: Product[] = [
    createProduct(1, 'Белая футболка', '', 1999, 1499, defaultImageConstruction),
    createProduct(2, 'Красная футболка', '', 2999, 2499, defaultImageConstruction),
    createProduct(3, 'Зеленая футболка', '', 2599, 1999, defaultImageConstruction),
    createProduct(4, 'Синяя футболка', '', 5999, 5699, defaultImageConstruction),
    createProduct(5, 'Желтая футболка', '', 3499, 2999, defaultImageConstruction),
    createProduct(6, 'Белая бесболка', '', 1599, 1399, defaultImageConstruction),
    createProduct(7, 'Красная бесболка', '', 3999, 3499, defaultImageConstruction),
    createProduct(8, 'Зеленая бесболка', '', 2299, 1999, defaultImageConstruction),
    createProduct(9, 'Синяя бесболка', '', 7999, 6999, defaultImageConstruction),
    createProduct(10, 'Желтая бесболка', '', 4999, 3999, defaultImageConstruction)
  ];

export const ProductList: FC = () => {
  const { searchQuery } = useSearch();

  // Защищенная фильтрация
  const filteredProducts = products.filter(product => {
    // Если searchQuery пустой или undefined, показываем все товары
    if (!searchQuery || searchQuery.trim() === '') {
      return true;
    }
    
    // Защита от ошибок если product или product.name undefined
    if (!product || !product.name) {
      return false;
    }
    
    // Безопасный поиск по name
    const query = searchQuery.toLowerCase().trim();
    const productname = product.name.toLowerCase();
    const matches = productname.includes(query);
    
    return matches;
  });

  return (
    <div className="max-w-6xl mx-auto mt-6">
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