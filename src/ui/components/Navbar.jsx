import { Tabs } from "@geist-ui/core";
import React from "react";

export default function Navbar() {
	return (
		<section>
			<Tabs initialValue="1">
				<Tabs.Item label="http" value="1">
					HTTP is stateless, but not sessionless.
				</Tabs.Item>
				<Tabs.Item label="proxies" value="2">
					Between the Web browser and the server, numerous computers and
					machines relay the HTTP messages.
				</Tabs.Item>
			</Tabs>
		</section>
	);
}
