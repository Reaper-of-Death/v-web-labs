import { Link } from "react-router";
import { useSearch } from "../../../features/product/search/useSearch";

export const Header = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Поиск выполняется автоматически через состояние
  };

  return (
    <header class="h-[50px] items-center flex p-1.5 border-b border-gray-210">
      <div class="flex items-center justify-between w-full">
        <Link to="/" class="bg-none border-none cursor-pointer p-1.5 rounded transition-colors duration-300 hover:bg-gray-100" name="home-btn">
          <img src="src/widgets/layout/header/image/home-icon.png" alt="Home" width="20" height="20"></img>
        </Link>

        <form onSubmit={handleSubmit} class="flex items-center bg-gray-100 rounded-full py-1.5 px-2.5 border border-gray-300 max-w-[300px] w-full">
          <input 
            type="text" 
            placeholder="Поиск..." 
            class="border-none bg-none outline-none flex-1 p-1.5 text-sm" 
            id="searchInput"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button type="submit" class="bg-none border-none cursor-pointer p-0.5">
            <img src="src/widgets/layout/header/image/search-icon.png" alt="Search" width="16" height="16"></img>
          </button>
        </form>

        <div class="flex gap-2 items-center">
          <Link to="/wishlist" class="bg-none border-none cursor-pointer p-2 rounded transition-colors duration-300 hover:bg-gray-100" name="favorite-btn">
            <img src="src/widgets/layout/header/image/heart-icon.png" alt="Favorites" width="20" height="20"></img>
          </Link>

          <Link to="/cart" class="bg-none border-none cursor-pointer p-2 rounded transition-colors duration-300 hover:bg-gray-100" name="cart-btn">
            <img src="src/widgets/layout/header/image/cart-icon.png" alt="Cart" width="20" height="20"></img>
          </Link>				
        </div>
      </div>
    </header>
  );
};