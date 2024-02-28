import React from "react";
import { Card, Grid, Image, Modal, Text } from "@geist-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../slices/cart-slice";

export default function ModalCart({ setVisible, bindings, product }) {
	const { image, title, price, category, description, rating } = product;
	const cart = useSelector((state) => state.cart);
	console.log(cart);
	const dispatch = useDispatch();

	function handleAddToCart() {
		const itemForCart = {
			title,
			price,
		};
		dispatch(addItem(itemForCart));
	}
	return (
		<div>
			<Modal width="35rem" {...bindings}>
				<Modal.Content>
					<Grid.Container gap={2}>
						<Grid xs={10}>
							<div width="100%">
								<Image
									src={image}
									height="150px"
									width="100%"
									draggable={false}
								/>

								<div className="border-l px-2">
									<Text py={0.5}>{title}</Text>
									<Text b>${price}</Text>
									<div className="flex justify-between">
										<Text type={rating.count > 0 ? `warning` : "error"}>
											{rating.count > 0 ? "In stock" : "Out of Stock"}
										</Text>
										<Text>{rating.count} left</Text>
									</div>
								</div>
							</div>
						</Grid>
						<Grid xs={14}>
							<div className="w-full">
								<Modal.Title>Item Details</Modal.Title>
								<Grid padding={0}>
									<Text b mb={0.5}>
										Category: {category}
									</Text>
									<br />
									<Text b my={0.5}>
										Rating {rating.rate}
									</Text>
									<br />
									<Text
										mt={0.5}
										className="overflow-hidden overflow-ellipsis whitespace-nowrap"
									>
										{description}
									</Text>
								</Grid>
							</div>
						</Grid>
					</Grid.Container>
				</Modal.Content>
				<Modal.Action
					passive
					onClick={() => {
						setVisible(false);
					}}
				>
					Cancel
				</Modal.Action>
				<Modal.Action onClick={handleAddToCart}>Add To cart</Modal.Action>
			</Modal>
		</div>
	);
}
