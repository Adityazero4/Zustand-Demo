import { useStore } from "@/store/store";
import React, { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

type ChangeQtyButtonProps = {
	productId: string;
};

const ChangeQtyButton = ({ productId }: ChangeQtyButtonProps) => {
	const { getProductById, decQty, incQty, setTotal } = useStore(
		useShallow((state) => ({
			getProductById: state.getProductById,
			decQty: state.decQty,
			incQty: state.incQty,
			setTotal: state.setTotal,
		})),
	);
	const product = getProductById(productId);

	useEffect(() => {
		const unSub = useStore.subscribe(
			(state) => state.products,
			(products) => {
				setTotal(
					products.reduce((acc, curr) => acc + curr.price * curr.qty, 0),
				);
			},
			{
				fireImmediately: true,
			},
		);
		return unSub;
	}, [setTotal]);

	return (
		<>
			{product && (
				<div className="flex items-center gap-2">
					<Button size={"icon"} onClick={() => decQty(product.id)}>
						<Minus />
					</Button>
					<p>{product.qty}</p>
					<Button size={"icon"} onClick={() => incQty(product.id)}>
						<Plus />
					</Button>
				</div>
			)}
		</>
	);
};

export default ChangeQtyButton;
