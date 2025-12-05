import type { Product } from "../../../entities/product";

export const filterProducts = (products: Product[], query: string): Product[] => {
  if (!query) return products;
  
  const lowercasedQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercasedQuery) ||
    product.description?.toLowerCase().includes(lowercasedQuery)
  );
};