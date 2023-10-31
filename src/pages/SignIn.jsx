import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import Body from "../components/BodyComponent";

const navigation = [
	{ name: "Product", to: "#" },
	{ name: "Features", to: "#" },
	{ name: "Marketplace", to: "#" },
	{ name: "Company", to: "#" },
];

function SignIn() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	return (
		<div className="bg-white">
			<Body/>
		</div>
	);
}

export default SignIn;
