import type { CartProduct } from "@/types/cartProduct";
import type { Product } from "@/types/product";
import type { StateCreator } from "zustand";

type CartState = {
	products: CartProduct[];
	total: number;
};

type CartAction = {
	addProduct: (product: Product) => void;
	removeProduct: (productId: string) => void;
	incQty: (productId: string) => void;
	decQty: (productId: string) => void;
	getProductById: (productId: string) => CartProduct | undefined;
	setTotal: (total: number) => void;
	reset: () => void;
};

export type CartSlice = CartState & CartAction;

const intitalState: CartState = {
	products: [],
	total: 0,
};

export const createCartSlice: StateCreator<
	CartSlice,
	[["zustand/immer", never]],
	[],
	CartSlice
> = (set, get) => ({
	...intitalState,
	incQty: (productId) =>
		set((state) => {
			const product = state.products.find((p) => p.id === productId);
			if (product) {
				product.qty++;
				state.total += product.price;
			}
		}),
	decQty: (productId) =>
		set((state) => {
			const productIndex = state.products.findIndex((p) => p.id === productId);
			if (productIndex !== -1) {
				if (state.products[productIndex].qty === 1) {
					state.products.splice(productIndex, 1);
				} else {
					state.products[productIndex].qty--;
				}
			}
		}),
	addProduct: (product) =>
		set((state) => {
			state.products.push({ ...product, qty: 1 });
		}),
	removeProduct: (productId) =>
		set((state) => {
			state.products = state.products.filter((p) => p.id !== productId);
		}),
	getProductById: (productId) => get().products.find((p) => p.id === productId),
	reset: () => set(() => intitalState),
	setTotal: (total) =>
		set((state) => {
			state.total = total;
		}),
});
