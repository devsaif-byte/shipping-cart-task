import { Text } from "@geist-ui/core";
import React from "react";

export default function Navbar() {
	return (
		<section>
			<Text
				b
				style={{ letterSpacing: "0.6px" }}
				type="error"
				h2
				className="uppercase"
			>
				Simple cart
			</Text>
		</section>
	);
}
