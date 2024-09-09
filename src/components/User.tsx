import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CircleX, ShoppingCart, Trash2, UserIcon } from "lucide-react";
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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect } from "react";

const User = () => {
	const { setAddress, address, fullName, userName, fetchUser } = useStore(
		useShallow((state) => ({
			setAddress: state.setAddress,
			address: state.address,
			fullName: state.fullName,
			userName: state.userName,
			fetchUser: state.fetchUser,
		})),
	);

	useEffect(() => {
		async function fetchData() {
			await fetchUser();
		}
		fetchData();
	}, [fetchUser]);

	return (
		<Popover>
			<PopoverTrigger>
				<Button size={"icon"} variant={"secondary"}>
					<UserIcon />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="space-y-2 overflow-y-scroll w-96 ">
				<div className="flex items-center gap-2">
					<p>{fullName}</p>
					<p className="text-sm">{userName}</p>
				</div>
				<Label htmlFor="address">Your Address:</Label>
				<Input
					value={address}
					id="address"
					onChange={(e) => setAddress(e.target.value)}
				/>
			</PopoverContent>
		</Popover>
	);
};

export default User;
