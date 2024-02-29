import { Button, Card, Grid, Text } from "@geist-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { decrement, increment, removeItem } from "../../slices/cart-slice";

export default function CartItem({ item }) {
	const { id, title, price, quantity } = item;
	console.log(item);
	const dispatch = useDispatch();

	const handleIncrement = (itemId) => dispatch(increment(itemId));
	const handleDecrement = (itemId) => dispatch(decrement(itemId));
	const handleDelete = (itemId) => dispatch(removeItem(itemId));
	return (
		<Grid.Container justify="center" className="p-0">
			<div className="p-0 grid w-full">
				<Card>
					<Card.Content>
						<Grid.Container gap={2}>
							<Grid
								xs={6}
								md={24}
								className="gap-2"
								justify="space-between"
								alignItems="center"
							>
								<Text i h6>
									{title}
								</Text>
								<div>
									<Text className="text-sm dark:text-gray-600">
										${price.toFixed(2)}
									</Text>
								</div>
								<div className="flex justify-between space-x-2 items-center">
									<div className="flex gap-2">
										<Button
											onClick={() => handleDecrement(id)}
											type="secondary-light"
											className="rounded-full"
											auto
											scale={1 / 2}
											ghost
										>
											-
										</Button>
										<Text>{quantity}</Text>
										<Button
											onClick={() => handleIncrement(id)}
											type="secondary-light"
											auto
											scale={1 / 2}
											ghost
										>
											+
										</Button>
									</div>
									<Button
										onClick={() => handleDelete(id)}
										type="error"
										auto
										scale={1 / 2}
										ghost
									>
										Delete
									</Button>
								</div>
							</Grid>
						</Grid.Container>
					</Card.Content>
				</Card>
			</div>
		</Grid.Container>
	);
}
