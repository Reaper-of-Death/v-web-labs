import { Header } from "../../widgets/layout/header";
import { Footer } from "../../widgets/layout/footer";
import { ProductList } from "../../shared/utils/Products";

export const Home = () => {
  return (
    <div class="font-sans leading-relaxed min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
      <Header />

      <main className="flex-grow flex-1 p-5 w-full">
        <div className="w-full mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Наши товары
          </h1>
          <ProductList />
        </div>
      </main>

      <Footer />
    </div>
  );
};