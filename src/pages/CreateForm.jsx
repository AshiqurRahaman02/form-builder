import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import "../App.css";

const navigation = [
	{ name: "Product", to: "#" },
	{ name: "Features", to: "#" },
	{ name: "Marketplace", to: "#" },
	{ name: "Company", to: "#" },
];

function CreateForm() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [formName, setFormName] = useState("");
	const [formDesc, setFormDesc] = useState("");
	const [headerImage, setHeaderImage] = useState("/images/heading_image.jpg");

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		image: null, // to store the selected image file
	});

	const handleImageChange = (e) => {
		const imageFile = e.target.files[0];
		setFormData({ ...formData, image: imageFile });

		// To preview the selected image
		const reader = new FileReader();
		reader.onload = (e) => {
			setHeaderImage(e.target.result);
		};
		reader.readAsDataURL(imageFile);
	};
	return (
		<div className="bg-white">
			<header className="absolute inset-x-0 top-0 z-50">
				<nav
					className="flex items-center justify-between p-6 lg:px-8"
					aria-label="Global"
				>
					<div className="flex lg:flex-1">
						<Link to="#" className="-m-1.5 p-1.5">
							<span className="text-2xl font-semibold">
								Form Builder
							</span>
						</Link>
					</div>
					<div className="flex lg:hidden">
						<button
							type="button"
							className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(true)}
						>
							<span className="sr-only">Open main menu</span>
							{/* <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
						</button>
					</div>
					<div className="hidden lg:flex lg:gap-x-12">
						{navigation.map((item) => (
							<Link
								key={item.name}
								to={item.to}
								className="text-sm font-semibold leading-6 text-gray-900"
							>
								{item.name}
							</Link>
						))}
					</div>
					<div className="hidden lg:flex lg:flex-1 lg:justify-end">
						<Link
							to="#"
							className="text-sm font-semibold leading-6 text-gray-900"
						>
							Log in <span aria-hidden="true">&rarr;</span>
						</Link>
					</div>
				</nav>
				<Dialog
					as="div"
					className="lg:hidden"
					open={mobileMenuOpen}
					onClose={setMobileMenuOpen}
				>
					<div className="fixed inset-0 z-50" />
					<Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
						<div className="flex items-center justify-between">
							<Link to="#" className="-m-1.5 p-1.5">
								<span className="text-2xl font-semibold">
									Form Builder
								</span>
								{/* <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                /> */}
							</Link>
							<button
								type="button"
								className="-m-2.5 rounded-md p-2.5 text-gray-700"
								onClick={() => setMobileMenuOpen(false)}
							>
								<span className="sr-only">Close menu</span>
								{/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
							</button>
						</div>
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/10">
								<div className="space-y-2 py-6">
									{navigation.map((item) => (
										<Link
											key={item.name}
											to={item.to}
											className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
										>
											{item.name}
										</Link>
									))}
								</div>
								<div className="py-6">
									<Link
										to="#"
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Log in
									</Link>
								</div>
							</div>
						</div>
					</Dialog.Panel>
				</Dialog>
			</header>

			<div className="relative isolate px-6 pt-14 lg:px-8">
				<div
					className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
					aria-hidden="true"
				>
					<div
						className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					/>
				</div>

				<div
					className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
					aria-hidden="true"
				>
					<div
						className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					/>
				</div>

				<main className="m-20 mx-auto w-1000">
					<section id="formdetails" className="flex w-full border-2 h-44 p-3">
						<div className=" w-1/2">
							<div className="flex">
								<input
									type="text"
									value={formName}
									onChange={(e) => setFormName(e.target.value)}
									placeholder="Enter form name"
									className="mt-3.5 ml-3.5 mr-8 text-4xl max-w-md border-0 bg-transparent outline-none custom-placeholder"
								/>
								<div>
									<input
										type="file"
										name="image"
										id="image"
										accept=".jpg, .png, "
										onChange={handleImageChange}
										className="opacity-0 border absolute cursor-pointer text-5xl w-20 mt-3.5"
									/>
									<FontAwesomeIcon
										icon={faImage}
										className="mr-8 text-5xl cursor-pointer mt-3.5"
									/>
								</div>
							</div>
							<input
								type="text"
								value={formDesc}
								onChange={(e) => setFormDesc(e.target.value)}
								placeholder="Enter form description (optional)"
								className="mt-3.5 ml-3.5 mr-8 text-xl w-3/4 border-0 bg-transparent outline-none custom-placeholder"
							/>
						</div>
						<div className=" w-1/2 relative">
							<img
								src={headerImage}
								alt=""
								id="image-preview"
								className="w-full h-36 absolute"
							/>
							<div className="absolute">
								<h1 className="mt-3.5 ml-3.5 mr-8 text-4xl">
									{formName}
								</h1>
								<p className="mt-3.5 ml-3.5 mr-8 text-xl">{formDesc}</p>
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}

export default CreateForm;
