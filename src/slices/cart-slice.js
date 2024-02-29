import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
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

			if (existingItem >= 0) {
				state.items[existingItem].quantity += newItem.quantity;
				// updating price with qty
				state.items[existingItem].price =
					state.items[existingItem].price * newItem.quantity;
			} // If it's a new item, add it to the cart
			else
				state.items.push({
					...newItem,
					price: newItem.price * newItem.quantity,
				});
			state.subtotal = state.items.reduce((acc, item) => acc + item.price, 0);
		},
		increment(state, action) {
			const itemId = action.payload;
			const itemToIncrement = state.items.find((item) => item.id === itemId);

			if (itemToIncrement) {
				itemToIncrement.quantity++;
				itemToIncrement.price =
					itemToIncrement.unitPrice * itemToIncrement.quantity;
			}
			state.subtotal = state.items.reduce((acc, item) => acc + item.price, 0);
		},
		decrement(state, action) {
			const itemId = action.payload;
			const itemToDecrement = state.items.find((item) => item.id === itemId);

			if (itemToDecrement && itemToDecrement.quantity > 1) {
				itemToDecrement.quantity--;
				itemToDecrement.price =
					itemToDecrement.price - itemToDecrement.unitPrice;
			}
			state.subtotal = state.items.reduce((acc, item) => acc + item.price, 0);
		},

		removeItem(state, action) {
			const removedItemId = action.payload;
			const removedItemIndex = state.items.findIndex(
				(item) => item.id === removedItemId
			);

			if (removedItemIndex !== -1) {
				state.quantity -= state.items[removedItemIndex].quantity;
				state.items = [
					...state.items.slice(0, removedItemIndex),
					...state.items.slice(removedItemIndex + 1),
				];
			}
			state.subtotal = state.items.reduce((acc, item) => acc + item.price, 0);
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
export const getItems = (state) => state.cart.items;

export const getSubTotal = (state) => state.cart.subtotal;

export const getTax = (state) => 0.1 * getSubTotal(state);

export const getShippingCost = (state) => 12 + 2 * state.cart.items.length; // starting $12 + per product $2

export const getDiscount = (state) => 0.05 * getSubTotal(state);

export const getTotal = (state) =>
	getSubTotal(state) +
	getTax(state) +
	getShippingCost(state) -
	getDiscount(state);
