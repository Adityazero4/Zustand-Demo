import React from "react";
import { useStore } from "./store/store";
import { useShallow } from "zustand/react/shallow";
import { PRODUCTS_DATA } from "./lib/mockData";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import ChangeQtyButton from "./components/ChangeQtyButton";
import Cart from "./components/Cart";
import User from "./components/User";

const App = () => {
	// const store = useStore();
	// const store = useStore((state) => state);
	// const {address}=useStore();
	// const { address } = useStore((state) => ({ address: state.address }));
	// const address = useStore((state) => state.address);
	// most efficient way
	// const { address } = useStore(
	// 	useShallow((state) => ({ address: state.address })),
	// );

	const addProduct = useStore((state) => state.addProduct);
	const cartProducts = useStore((state) => state.products);

	return (
		<main className="h-screen max-w-sm mx-auto mt-2 space-y-2 dark bg-background">
			<div className="flex justify-between">
				<User />
				<Cart />
			</div>
			<h1 className="text-2xl">Products:</h1>
			<div className="space-y-2">
				{PRODUCTS_DATA.map((product) => (
					<Card key={product.id}>
						<CardHeader>{product.title}</CardHeader>
						<CardContent>{product.price}$</CardContent>
						<CardFooter>
							{cartProducts.find((item) => item.id === product.id) ? (
								<ChangeQtyButton productId={product.id} />
							) : (
								<Button onClick={() => addProduct(product)} variant="default">
									Add to Cart
								</Button>
							)}
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	);
};

export default App;
