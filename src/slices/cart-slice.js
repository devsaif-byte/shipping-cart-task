import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
	quantity: 1,
	subtotal: 0,
	tax: 0,
	shippingCost: 0,
	discount: 0,
	total: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.findIndex(
				(item) => item.id === newItem.id
			);

			if (existingItem) existingItem.quantity += newItem.quantity;
			else state.items.push(newItem);

			state.quantity = newItem.quantity;
		},
		removeItem(state, action) {
			state.items = state.items.filter((item) => item.id !== action.payload);
		},
		increment(state, action) {
			let item = state.items.findIndex((item) => item.id === action.payload);
			item.quantity++;
		},
		decrement(state, action) {
			let item = state.items.findIndex((item) => item.id === action.payload);
			item.quantity--;
		},
		clearCart(state) {
			state.items = [];
		},
	},
});

export const { addItem, removeItem, increment, decrement, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;

// ********* selector functions **********
export const getSubTotal = (state) =>
	state.cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

export const getTax = (state) => {
	const subtotal = getSubTotal(state);
	return 0.1 * subtotal; // 10% tax
};

export const getShippingCost = (state) => {
	const items = state.cart.items;
	return 5 + 2 * items.length; // Fixed shipping cost is 5 + 2 per item additional
};

export const getDiscount = (state) => {
	const subtotal = getSubTotal(state);
	return 0.05 * subtotal; // 5% discount
};

export const getTotal = (state) => {
	const subtotal = getSubTotal(state);
	const tax = getTax(state);
	const shippingCost = getShippingCost(state);
	const discount = getDiscount(state);
	return subtotal + tax + shippingCost - discount;
};
