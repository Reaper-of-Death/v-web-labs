declare module '../shared/utils' {
  export const withProvider: any;
}

declare module '../pages/home' {
  export const Home: React.ComponentType;
}

declare module '../pages/cart' {
  export const Cart: React.ComponentType;
}

declare module '../pages/wishlist' {
  export const Wishlist: React.ComponentType;
}

declare module '../layouts/app' {
  export const Layout: React.ComponentType<{ children: React.ReactNode }>;
}