export const filterProducts = (products, query) => {
  if (!query) return products;
  
  const lowercasedQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercasedQuery) ||
    product.description?.toLowerCase().includes(lowercasedQuery)
  );
}