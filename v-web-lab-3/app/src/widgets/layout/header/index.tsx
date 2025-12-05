import type { FC, FormEvent, ChangeEvent } from 'react';
import { Link } from "react-router-dom";
import { useSearch } from "../../../features/product/search/useSearch";
import { products } from '../../../shared/utils/products';
import { useState, useEffect, useRef } from 'react';

// Импортируем картинки с относительными путями
import homeIcon from './image/home-icon.png';
import searchIcon from './image/search-icon.png';
import heartIcon from './image/heart-icon.png';
import cartIcon from './image/cart-icon.png';

export const Header: FC = () => {
  const { searchQuery, setSearchQuery, clearSearch } = useSearch();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<number | null>(null);

  // Синхронизируем локальное состояние с URL параметром
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  // Эффект для поиска при изменении запроса
  useEffect(() => {
    if (localQuery.length >= 3) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(localQuery.toLowerCase())
      ).slice(0, 7);
      
      setSearchResults(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [localQuery]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const query = e.target.value;
    setLocalQuery(query);
    
    // Очищаем предыдущий таймаут
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Устанавливаем новый таймаут
    timeoutRef.current = window.setTimeout(() => {
      if (query) {
        setSearchQuery(query);
      } else {
        clearSearch();
      }
    }, 300);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchResults.length > 0) {
      setShowDropdown(false);
    }
  };

  const handleProductClick = (productName: string): void => {
    setLocalQuery(productName);
    setSearchQuery(productName);
    setShowDropdown(false);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClearSearch = (): void => {
    setLocalQuery('');
    clearSearch();
    setSearchResults([]);
    setShowDropdown(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="h-[50px] items-center flex p-1.5 border-b border-gray-210 relative">
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="bg-none border-none cursor-pointer p-1.5 rounded transition-colors duration-300 hover:bg-gray-100">
          <img src={homeIcon} alt="Home" width="20" height="20" />
        </Link>

        <div ref={searchRef} className="relative max-w-[300px] w-full">
          <form onSubmit={handleSubmit} className="flex items-center bg-gray-100 rounded-full py-1.5 px-2.5 border border-gray-300 w-full">
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Поиск..." 
              className="border-none bg-none outline-none flex-1 p-1.5 text-sm" 
              value={localQuery}
              onChange={handleSearch}
              onFocus={() => localQuery.length >= 3 && searchResults.length > 0 && setShowDropdown(true)}
            />
            
            {localQuery && (
              <button 
                type="button" 
                onClick={handleClearSearch}
                className="bg-none border-none cursor-pointer p-0.5 mr-1 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            )}
            
            <button 
              type="submit" 
              className="bg-none border-none cursor-pointer p-0.5"
            >
              <img src={searchIcon} alt="Search" width="16" height="16" />
            </button>
          </form>

          {showDropdown && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
              <div className="p-2 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Найдено {searchResults.length} товаров
                  </span>
                  <span className="text-xs text-gray-500">
                    {searchResults.length > 7 ? `Показано 7 из ${searchResults.length}` : `Все товары`}
                  </span>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {searchResults.map(product => (
                  <div 
                    key={product.id}
                    onClick={() => handleProductClick(product.name)}
                    className="p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-800 truncate mr-2">
                        {product.name}
                      </span>
                      <div className="flex items-center gap-2">
                        {product.discountPrice && product.discountPrice < product.price && (
                          <>
                            <span className="text-xs text-gray-500 line-through">
                              {product.price.toLocaleString('ru-RU')} ₽
                            </span>
                            <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                              {product.discountPrice.toLocaleString('ru-RU')} ₽
                            </span>
                          </>
                        )}
                        {(!product.discountPrice || product.discountPrice >= product.price) && (
                          <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                            {product.price.toLocaleString('ru-RU')} ₽
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {searchResults.length > 7 && (
                <div className="p-3 border-t border-gray-100 text-center">
                  <span className="text-sm text-gray-500">
                    И еще {searchResults.length - 7} товаров
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2 items-center">
          <Link to="/wishlist" className="bg-none border-none cursor-pointer p-2 rounded transition-colors duration-300 hover:bg-gray-100">
            <img src={heartIcon} alt="Favorites" width="20" height="20" />
          </Link>

          <Link to="/cart" className="bg-none border-none cursor-pointer p-2 rounded transition-colors duration-300 hover:bg-gray-100">
            <img src={cartIcon} alt="Cart" width="20" height="20" />
          </Link>				
        </div>
      </div>
    </header>
  );
};