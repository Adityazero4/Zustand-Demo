import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CircleX, ShoppingCart, Trash2 } from "lucide-react";
import { useStore } from "@/store/store";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { useShallow } from "zustand/react/shallow";
import ChangeQtyButton from "./ChangeQtyButton";

const Cart = () => {
	const { products, removeProduct, reset, total, address } = useStore(
		useShallow((state) => ({
			products: state.products,
			removeProduct: state.removeProduct,
			reset: state.reset,
			total: state.total,
			address: state.address,
		})),
	);

	return (
		<Popover>
			<PopoverTrigger>
				<Button size={"icon"} variant={"secondary"}>
					<ShoppingCart />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="space-y-2 overflow-y-scroll w-96 ">
				<div className="flex items-center gap-2 text-lg">
					<h1>Cart:</h1>
					<Button variant={"destructive"} onClick={reset}>
						<CircleX />
					</Button>
				</div>
				<div className="space-y-2">
					{products.map((product) => (
						<Card key={product.id} className="flex flex-col">
							<CardHeader className="flex flex-row items-center gap-2">
								<CardTitle>{product.title}</CardTitle>
								<Button
									onClick={() => removeProduct(product.id)}
									variant={"destructive"}
									size={"icon"}
								>
									<Trash2 />
								</Button>
							</CardHeader>
							<CardContent>{product.price}</CardContent>
							<CardFooter>
								<ChangeQtyButton productId={product.id} />
							</CardFooter>
						</Card>
					))}
				</div>
				<p>Total: {total}$</p>
				<p>Address: {address}</p>
			</PopoverContent>
		</Popover>
	);
};

export default Cart;
