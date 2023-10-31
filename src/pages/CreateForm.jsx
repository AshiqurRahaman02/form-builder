import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faUnderline } from "@fortawesome/free-solid-svg-icons";

import "../App.css";
import InputList from "../components/InputList";
import Q1Component from "../components/Q1Component";
import Q2Component from "../components/Q2Component";
import Q3Component from "../components/Q3Component";
import WordList from "../components/WordList";
import McqInputComponent from "../components/McqInput";

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
	const [formImageHaves, setFormImageHaves] = useState(false);
	const [headerImage, setHeaderImage] = useState("/images/heading_image.jpg");

	const [q1Desc, setQ1Desc] = useState("");
	const [q1Marks, setQ1Marks] = useState("");
	const [q1ImageHave, setQ1ImageHave] = useState(false);
	const [q1Categories, setQ1Categories] = useState([]);
	const [q1Options, setQ1Options] = useState([]);
	const [q1Image, setQ1Image] = useState();
	const [q1Preview, setQ1Preview] = useState(false);

	const [q2Desc, setQ2Desc] = useState("");
	const [q2Marks, setQ2Marks] = useState("");
	const [q2ImageHave, setQ2ImageHave] = useState(false);
	const [q2PreviewSentence, setQ2PreviewSentence] = useState("");
	const [q2Sentence, setQ2Sentence] = useState("");
	const [q2Options, setQ2Options] = useState([]);
	const [q2Image, setQ2Image] = useState();
	const [q2Preview, setQ2Preview] = useState(false);
	const [selectedWords, setSelectedWords] = useState([]);

	const [q3Desc, setQ3Desc] = useState("");
	const [q3Marks, setQ3Marks] = useState("");
	const [q3ImageHave, setQ3ImageHave] = useState(false);
	const [paragraph, setParagraph] = useState("");
	const [mcq, setMcq] = useState([]);
	const [q3Image, setQ3Image] = useState();
	const [q3Preview, setQ3Preview] = useState(false);
	const [mcqComponents, setMcqComponents] = useState([]);

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
			setFormImageHaves(true);
			setHeaderImage(e.target.result);
		};
		reader.readAsDataURL(imageFile);
	};

	const handleQ1ImageChange = (e) => {
		const imageFile = e.target.files[0];
		setFormData({ ...formData, image: imageFile });

		// To preview the selected image
		const reader = new FileReader();
		reader.onload = (e) => {
			setQ1ImageHave(true);
			setQ1Image(e.target.result);
		};
		reader.readAsDataURL(imageFile);
	};

	const handleQ2ImageChange = (e) => {
		const imageFile = e.target.files[0];
		setFormData({ ...formData, image: imageFile });

		// To preview the selected image
		const reader = new FileReader();
		reader.onload = (e) => {
			setQ2ImageHave(true);
			setQ2Image(e.target.result);
		};
		reader.readAsDataURL(imageFile);
	};

	const handleQ3ImageChange = (e) => {
		const imageFile = e.target.files[0];
		setFormData({ ...formData, image: imageFile });

		// To preview the selected image
		const reader = new FileReader();
		reader.onload = (e) => {
			setQ3ImageHave(true);
			setQ3Image(e.target.result);
		};
		reader.readAsDataURL(imageFile);
	};

	const addCategory = (index) => {
		setQ1Categories(index);
	};

	const displayPreview = () => {
		console.log(q1Options, q1Categories);
		setQ1Preview(true);
	};

	const displayQ2Preview = () => {
		setQ2Preview(true);
	};

	const displayQ3Preview = () => {
		// const mcqData = mcqComponents.map((mcqComponent, index) => {
		// 	console.log(mcqComponent)
		// 	const question = mcqComponent[index].questionInputValue;
		// 	const options = mcqComponent[index].options;
		// 	const correctOption = mcqComponent[index].checkedOption;
		// 	return {
		// 	  question,
		// 	  options,
		// 	  correctOption,
		// 	};
		//   });

		// Now you have an array of collected data from each McqInputComponent
		console.log(mcq);
		setQ3Preview(true);
	};

	const handleWordDoubleClick = (e) => {
		const selectedWord = e.target.textContent.trim();
		const id = e.target.id;

		let obj = {
			id,
			selectedWord,
		};
		setSelectedWords([...selectedWords, obj]);
		setQ2Options([...q2Options, selectedWord]);
		console.log(selectedWords);

		console.log(`Selected word: ${selectedWord} ${id}`);
		// You can perform further actions with the selected word here.
	};

	const addMcqComponent = () => {
		// Create a new McqInputComponent and add it to the list
		const newMcqComponent = (
			<McqInputComponent
				key={mcqComponents.length}
				index={mcqComponents.length}
				mcq={mcq}
				setMcq={setMcq}
			/>
		);
		setMcqComponents([...mcqComponents, newMcqComponent]);
	};
	// {
	// 	correctOption: "jgjkgj"
	// 	options: (3) ['adfadf', 'fhafdfdgsfdg', 'jgjkgj']
	// 	question: "sfgsfdg"
	// 	}

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
					<section
						id="formdetails"
						className="flex w-full border-2 h-44 p-3"
					>
						<div className=" w-1/2">
							<div className="flex ">
								<input
									type="text"
									value={formName}
									onChange={(e) => setFormName(e.target.value)}
									placeholder="Enter form name"
									className="mt-3.5 ml-3.5 mr-8 text-4xl max-w-md border-0 bg-transparent outline-none custom-placeholder border-b-4 border-sky-200"
								/>
								<div>
									<input
										type="file"
										name="image"
										id="image"
										accept=".jpg, .png, "
										onChange={handleImageChange}
										className="opacity-0 border absolute cursor-pointer text-5xl w-20 mt-3.5 "
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
								className="mt-3.5 ml-3.5 mr-8 text-xl w-3/4 border-0 bg-transparent outline-none custom-placeholder border-b-2 border-sky-200"
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
					<section
						id="question1"
						className="mt-3.5 flex w-full border-2 p-3"
					>
						<div className=" w-1/2">
							<h2 className="ml-5 text-2xl">Question 1</h2>
							<div className="flex">
								<input
									type="text"
									value={q1Desc}
									onChange={(e) => setQ1Desc(e.target.value)}
									placeholder="Enter description (optional)"
									className="mt-3.5 ml-3.5 mr-8 text-xl w-2/4 border-0 bg-transparent outline-none custom-placeholder  border-b-2 border-sky-200"
								/>
								<div>
									<input
										type="file"
										name="image"
										id="image"
										accept=".jpg, .png, "
										onChange={handleQ1ImageChange}
										className="opacity-0 border absolute cursor-pointer text-5xl w-20 mt-3.5"
									/>
									<FontAwesomeIcon
										icon={faImage}
										className="mr-8 text-5xl cursor-pointer mt-3.5"
									/>
								</div>
								<input
									type="number"
									value={q1Marks}
									onChange={(e) => setQ1Marks(e.target.value)}
									placeholder="Marks (required)"
									className="mt-3.5  mr-8 text-xl w-1/4 border bg-transparent outline-none custom-placeholder pl-1"
								/>
							</div>
							<div>
								<InputList
									Title="Category"
									categories={q1Categories}
									setCategories={setQ1Categories}
									options={q1Options}
									setQ1Options={setQ1Options}
								/>
								<InputList
									Title="Option"
									categories={q1Categories}
									setCategories={setQ1Categories}
									options={q1Options}
									setQ1Options={setQ1Options}
								/>
							</div>
							<button
								onClick={displayPreview}
								className="bg-emerald-400 p-1 ml-5 mt-3.5 px-2 rounded"
							>
								Save
							</button>
						</div>
						<div className=" w-1/2 ml-5">
							<div className="flex justify-between items-center">
								<h2 className="text-2xl">Question 1</h2>
								<p>Marks {q1Marks}</p>
							</div>
							<div>
								{q1ImageHave && (
									<img
										src={q1Image}
										alt=""
										id="image-preview"
										className="w-full"
									/>
								)}
								{q1Desc && (
									<p className="mt-3.5 mr-8 text-l">{q1Desc}</p>
								)}
							</div>
							{q1Preview && (
								<Q1Component
									q1Categories={q1Categories}
									q1Options={q1Options}
								/>
							)}
						</div>
					</section>

					<section
						id="question2"
						className="mt-3.5 flex w-full border-2 p-3"
					>
						<div className=" w-1/2">
							<h2 className="ml-5 text-2xl">Question 2</h2>
							<div className="flex">
								<input
									type="text"
									value={q2Desc}
									onChange={(e) => setQ2Desc(e.target.value)}
									placeholder="Enter description (optional)"
									className="mt-3.5 ml-3.5 mr-8 text-xl w-2/4 border-0 bg-transparent outline-none custom-placeholder border-b-2 border-sky-200"
								/>
								<div>
									<input
										type="file"
										name="image"
										id="image"
										accept=".jpg, .png, "
										onChange={handleQ2ImageChange}
										className="opacity-0 border absolute cursor-pointer text-5xl w-20 mt-3.5"
									/>
									<FontAwesomeIcon
										icon={faImage}
										className="mr-8 text-5xl cursor-pointer mt-3.5"
									/>
								</div>
								<input
									type="number"
									value={q2Marks}
									onChange={(e) => setQ2Marks(e.target.value)}
									placeholder="Marks (required)"
									className="mt-3.5  mr-8 text-xl w-1/4 border bg-transparent outline-none custom-placeholder pl-1"
								/>
							</div>
							<div>
								<div className="flex">
									<p className="mt-3.5 ml-3.5 mr-8 text-xl w-3/4">
										{q2Sentence.split(" ").map((word, index) => (
											<span
												key={index}
												onDoubleClick={handleWordDoubleClick}
												id={index}
											>
												{word}{" "}
											</span>
										))}
									</p>
									{q2Sentence && (
										<FontAwesomeIcon
											icon={faUnderline}
											className="mt-5 ml-3.5 mr-8 cursor-pointer text-2xl"
										/>
									)}
								</div>
								<input
									type="text"
									value={q2Sentence}
									onChange={(e) => setQ2Sentence(e.target.value)}
									placeholder="Enter the sentence"
									className="mt-3.5 ml-3.5 mr-8 text-xl w-2/4 border-0 bg-transparent outline-none custom-placeholder border-b-4 border-sky-200"
								/>
								<WordList Title="Words" selectedWords={selectedWords} />
							</div>
							<button
								onClick={displayQ2Preview}
								className="bg-emerald-400 p-1 ml-5 mt-3.5 px-2 rounded"
							>
								Save
							</button>
						</div>
						<div className=" w-1/2 ml-5">
							<div className="flex justify-between items-center">
								<h2 className="text-2xl">Question 2</h2>
								<p>Marks {q2Marks}</p>
							</div>
							<div>
								{q2ImageHave && (
									<img
										src={q2Image}
										alt=""
										id="image-preview"
										className="w-full"
									/>
								)}
								{q2Desc && (
									<p className="mt-3.5 mr-8 text-l">{q2Desc}</p>
								)}
							</div>
							{q2Preview && (
								<Q2Component
									sentence={q2Sentence}
									wordsArray={q2Options}
								/>
							)}
						</div>
					</section>

					<section
						id="question3"
						className="mt-3.5 flex w-full border-2 p-3"
					>
						<div className=" w-1/2">
							<h2 className="ml-5 text-2xl">Question 3</h2>
							<div className="flex">
								<input
									type="text"
									value={q3Desc}
									onChange={(e) => setQ3Desc(e.target.value)}
									placeholder="Enter description (optional)"
									className="mt-3.5 ml-3.5 mr-8 text-xl w-2/4 border-0 bg-transparent outline-none custom-placeholder  border-b-2 border-sky-200"
								/>
								<div>
									<input
										type="file"
										name="image"
										id="image"
										accept=".jpg, .png, "
										onChange={handleQ3ImageChange}
										className="opacity-0 border absolute cursor-pointer text-5xl w-20 mt-3.5 "
									/>
									<FontAwesomeIcon
										icon={faImage}
										className="mr-8 text-5xl cursor-pointer mt-3.5"
									/>
								</div>
								<input
									type="number"
									value={q3Marks}
									onChange={(e) => setQ3Marks(e.target.value)}
									placeholder="Marks (required)"
									className="mt-3.5  mr-8 text-xl w-1/4 border bg-transparent outline-none custom-placeholder pl-1"
								/>
							</div>
							<div>
								<div>
									<textarea
										name=""
										id=""
										cols="30"
										rows="5"
										setParagraph
										value={paragraph}
										onChange={(e) => setParagraph(e.target.value)}
										placeholder="Enter paragraph (required)"
										className="mt-3.5 ml-2 mr-8 text-l w-11/12 border bg-transparent outline-none custom-placeholder pl-1 resize-none border-2 border-sky-200"
									></textarea>
									<div>
										<div className=" w-11/12 flex justify-end">
											<button
												className="mt-2 ml-3.5 bg-cyan-300 p-1 rounded"
												onClick={addMcqComponent}
											>
												{!mcqComponents.length
													? "Add MCQ Question"
													: "Add More MCQ Question"}
											</button>
										</div>
										{mcqComponents.map(
											(mcqComponent) => mcqComponent
										)}
									</div>
								</div>
								<button
									onClick={displayQ3Preview}
									className="bg-emerald-400 p-1 ml-5 mt-3.5 px-2 rounded"
								>
									Save
								</button>
							</div>
						</div>
						<div className=" w-1/2 ml-5">
							<div className="flex justify-between items-center">
								<h2 className="text-2xl">Question 3</h2>
								<p>Marks {q3Marks}</p>
							</div>
							<div>
								{q3ImageHave && (
									<img
										src={q3Image}
										alt=""
										id="image-preview"
										className="w-full"
									/>
								)}
								{q3Desc && (
									<p className="mt-3.5 mr-8 text-l">{q3Desc}</p>
								)}
							</div>
							{q3Preview && (
								<Q3Component paragraph={paragraph} mcqArray={mcq} />
							)}
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}

export default CreateForm;
