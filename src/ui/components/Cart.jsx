import { Text, Button } from "@geist-ui/core";
import { useSelector } from "react-redux";
import {
	getDiscount,
	getItems,
	getShippingCost,
	getSubTotal,
	getTax,
	getTotal,
} from "../../slices/cart-slice";
import CartItem from "./CartItem";

function Cart({ products }) {
	console.log(products);
	const cartItems = useSelector(getItems);
	const subtotal = useSelector(getSubTotal);
	const tax = useSelector(getTax);
	const shipping = useSelector(getShippingCost);
	const discount = useSelector(getDiscount);
	const total = useSelector(getTotal);
	console.log(cartItems, subtotal, tax, shipping, discount, total);

	return (
		<div className="space-y-4 sm:p-2 dark:bg-gray-900 dark:text-gray-100">
			<h2 className="text-xl font-semibold uppercase">Shipping</h2>
			{/* This container will be multiple cat item */}
			{cartItems.map((item) => (
				<CartItem key={item.id} item={item} />
			))}

			{cartItems.length > 0 && (
				<>
					<div className="space-y-1 text-right animate-fade">
						<Text>
							Sub total:{" "}
							<span className="text-sm dark:text-gray-400">
								{subtotal.toFixed(2)}
							</span>
						</Text>
						<Text>
							Tax:{" "}
							<span className="text-sm dark:text-gray-400">
								{tax.toFixed(2)}
							</span>
						</Text>
						<Text>
							Shipping:{" "}
							<span className="text-sm dark:text-gray-400">
								{shipping.toFixed(2)}
							</span>
						</Text>
						<Text>
							Discount on cart:{" "}
							<span className=" text-sm dark:text-gray-400">
								{discount.toFixed(2)}
							</span>
						</Text>
						<Text className="font-semibold">
							Total:{" "}
							<span className=" text-sm dark:text-gray-400">
								{total.toFixed(2)}
							</span>
						</Text>
					</div>
					<div className="flex justify-end space-x-4">
						<Button auto type="secondary">
							Continue to Checkout
						</Button>
					</div>
				</>
			)}
		</div>
	);
}

export default Cart;
