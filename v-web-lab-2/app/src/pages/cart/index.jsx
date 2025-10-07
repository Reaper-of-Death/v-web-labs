import { Header } from "../../widgets/layout/header";
import { Footer } from "../../widgets/layout/footer";

export const Cart = () => {
	return <div class="font-sans leading-relaxed min-h-screen flex flex-col bg-gray-50">
		<Header />

		<div class="flex-grow flex-1 p-5">
			Cart Page
		</div>

		<Footer />
	</div>;
};