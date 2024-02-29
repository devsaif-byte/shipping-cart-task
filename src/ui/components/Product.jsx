import { Image, Link, Text, useModal } from "@geist-ui/core";
import Card from "@geist-ui/core/esm/card/card";
import React, { useState } from "react";
import ModalCart from "./Modal";
// {
// "id": 1,
// "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
// "price": 109.95,
// "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
// "category": "men's clothing",
// "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
// "rating": {
//   "rate": 3.9,
//   "count": 120
// }
export default function Product({ product }) {
	const { visible, setVisible, bindings } = useModal();
	const { image, price, title } = product;

	return (
		<>
			<Card width="200px" onClick={() => setVisible(true)}>
				<Image src={image} height="150px" width="100%" draggable={false} />
				<Text h5 my={0}>
					${price}
				</Text>
				<Card.Footer>
					<Text type="secondary" small>
						{title}
					</Text>
				</Card.Footer>
				{visible && (
					<ModalCart
						setVisible={setVisible}
						bindings={bindings}
						product={product}
					/>
				)}
			</Card>
		</>
	);
}
