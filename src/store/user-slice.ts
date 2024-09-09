import type { StateCreator } from "zustand";

type UserState = {
	userName: string;
	fullName: string;
	age: number;
	address: string;
};

type UserAction = {
	setAddress: (address: string) => void;
	fetchUser: () => Promise<void>;
};

export type UserSlice = UserState & UserAction;

export const createUserSlice: StateCreator<
	UserSlice,
	[["zustand/immer", never]],
	[],
	UserSlice
> = (set) => ({
	address: "",
	age: 0,
	fullName: "",
	userName: "",
	setAddress: (address) =>
		set((state) => {
			state.address = address;
		}),
	fetchUser: async () => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		set((state) => {
			state.address = "";
			state.age = 30;
			state.fullName = "John Doe";
			state.userName = "johndoe@test.com";
		});
	},
});
