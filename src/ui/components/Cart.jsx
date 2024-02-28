import { Card, Grid, Text, Button } from "@geist-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
	decrement,
	getDiscount,
	getShippingCost,
	getSubTotal,
	getTax,
	getTotal,
	increment,
	removeItem,
} from "../../slices/cart-slice";

function Cart() {
	const cartItems = useSelector((state) => state.cart.quantity);
	const subtotal = getSubTotal();
	const tax = getTax();
	const shipping = getShippingCost();
	const discount = getDiscount();
	const total = getTotal();
	console.log(cartItems);
	const dispatch = useDispatch();
	const handleRemoveFromCart = (itemId) => {
		// Example: Dispatch the removeItem action
		dispatch(removeItem(itemId));
	};

	const handleIncrement = (itemId) => {
		// Example: Dispatch the increment action
		dispatch(increment(itemId));
	};

	const handleDecrement = (itemId) => {
		// Example: Dispatch the decrement action
		dispatch(decrement(itemId));
	};

	return (
		<div className="space-y-4 sm:p-2 dark:bg-gray-900 dark:text-gray-100">
			<h2 className="text-xl font-semibold uppercase">Shipping</h2>
			<Grid.Container gap={6} justify="center" className="w-full">
				<Grid xs={24}>
					<Card width={100}>
						<Card.Content>
							<Grid.Container gap={2}>
								<Grid xs={24} justify="space-between" alignItems="center">
									<Text h4>Polaroid camera</Text>
									<Text type="secondary" className="dark:text-gray-400">
										Classic
									</Text>
									<div>
										<Text className="text-lg font-semibold">59.99€</Text>
										<Text className="text-sm line-through dark:text-gray-600">
											75.50€
										</Text>
									</div>
									<div className="flex justify-between space-x-2 items-center">
										<div className="flex gap-2">
											<Button
												onClick={handleDecrement}
												type="secondary-light"
												className="rounded-full"
												auto
												scale={1 / 2}
												ghost
											>
												-
											</Button>
											<Text>{cartItems}</Text>
											<Button
												onClick={handleIncrement}
												type="secondary-light"
												auto
												scale={1 / 2}
												ghost
											>
												+
											</Button>
										</div>
										<Button type="error" auto scale={1 / 2} ghost>
											Delete
										</Button>
									</div>
								</Grid>
							</Grid.Container>
						</Card.Content>
					</Card>
				</Grid>
				{/* Repeat similar Card structure for other items */}
			</Grid.Container>
			<div className="space-y-1 text-right">
				<Text>
					Sub total: <span className="font-semibold">357 €</span>
				</Text>
				<Text>
					Tax: <span className="font-semibold">357 €</span>
				</Text>
				<Text>
					Shipping: <span className="font-semibold">357 €</span>
				</Text>
				<Text type="secondary" className="text-sm dark:text-gray-400">
					Not including taxes and shipping costs
				</Text>
			</div>
			<div className="flex justify-end space-x-4">
				<Button auto type="secondary">
					Continue to Checkout
				</Button>
			</div>
		</div>
	);
}

export default Cart;
