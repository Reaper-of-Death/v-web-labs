import { type FC, type FormEvent, type ChangeEvent } from 'react';
import { Link } from "react-router-dom";
import { useSearch } from "../../../features/product/search/useSearch";

// Импортируем картинки с относительными путями
import homeIcon from './image/home-icon.png';
import searchIcon from './image/search-icon.png';
import heartIcon from './image/heart-icon.png';
import cartIcon from './image/cart-icon.png';

export const Header: FC = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <header className="h-[50px] items-center flex p-1.5 border-b border-gray-210">
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="bg-none border-none cursor-pointer p-1.5 rounded transition-colors duration-300 hover:bg-gray-100">
          <img src={homeIcon} alt="Home" width="20" height="20" />
        </Link>

        <form onSubmit={handleSubmit} className="flex items-center bg-gray-100 rounded-full py-1.5 px-2.5 border border-gray-300 max-w-[300px] w-full">
          <input 
            type="text" 
            placeholder="Поиск..." 
            className="border-none bg-none outline-none flex-1 p-1.5 text-sm" 
            value={searchQuery}
            onChange={handleSearch}
          />
          <button type="submit" className="bg-none border-none cursor-pointer p-0.5">
            <img src={searchIcon} alt="Search" width="16" height="16" />
          </button>
        </form>

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