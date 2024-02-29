import { useEffect, useState } from "react";

import "./App.css";
import Navbar from "./ui/components/Navbar";
import Grid from "@geist-ui/core/esm/grid/grid";
import Card from "@geist-ui/core/esm/card/card";
import Product from "./ui/components/Product";
import Cart from "./ui/components/Cart";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./store";
import { Divider } from "@geist-ui/core";

function App() {
	const [products, setProducts] = useState([]);

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

	useEffect(() => {
		const getProducts = async function () {
			const { data } = await axios.get("https://fakestoreapi.com/products");
			setProducts(data);
		};
		getProducts();
	}, []);

	return (
		<>
			<Provider store={store}>
				<section className="w-full flex-grow flex flex-col">
					<Navbar />
					<Divider />
					<div className="grow">
						<Grid.Container gap={6} justify="center" className="w-full grow">
							<Grid xs={24}>
								<Card width="40%">
									<Cart products={products} />
								</Card>
								<Card width="60%">
									<div>
										<div className="flex flex-wrap gap-4">
											{products.map((product) => (
												<Product key={product.id} product={product} />
											))}
										</div>
									</div>
								</Card>
							</Grid>
						</Grid.Container>
					</div>
				</section>
			</Provider>
		</>
	);
}

export default App;
