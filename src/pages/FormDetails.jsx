import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import Body from "../components/BodyComponent";
import Q1Component from "../components/Q1Component";
import Q2Component from "../components/Q2Component";
import Q3Component from "../components/Q3Component";

const navigation = [
	{ name: "Product", to: "#" },
	{ name: "Features", to: "#" },
	{ name: "Marketplace", to: "#" },
	{ name: "Company", to: "#" },
];

function FormDetails() {
	const host = "http://localhost:5151";
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { id } = useParams();

	const [formName, setFormName] = useState("");
	const [formDesc, setFormDesc] = useState("");
	const [displayForm, setDisplayForm] = useState(false)
	const [formImageHaves, setFormImageHaves] = useState(false);
	const [headerImage, setHeaderImage] = useState("/images/heading_image.jpg");

	const [q1Id, setQ1Id] = useState("");
	const [q2Id, setQ2Id] = useState("");
	const [q3Id, setQ3Id] = useState("");

	const [q1Desc, setQ1Desc] = useState("");
	const [q1Marks, setQ1Marks] = useState("");
	const [q1ImageHave, setQ1ImageHave] = useState(false);
	const [q1Categories, setQ1Categories] = useState([]);
	const [q1Options, setQ1Options] = useState([]);
	const [q1Image, setQ1Image] = useState();
	const [displayQ1, setDisplayQ1] = useState(false);

	const [q2Desc, setQ2Desc] = useState("");
	const [q2Marks, setQ2Marks] = useState("");
	const [q2ImageHave, setQ2ImageHave] = useState(false);
	const [q2PreviewSentence, setQ2PreviewSentence] = useState("");
	const [q2Sentence, setQ2Sentence] = useState("");
	const [q2Options, setQ2Options] = useState([]);
	const [q2Image, setQ2Image] = useState();
	const [displayQ2, setDisplayQ2] = useState(false);
	const [selectedWords, setSelectedWords] = useState([]);

	const [q3Desc, setQ3Desc] = useState("");
	const [q3Marks, setQ3Marks] = useState("");
	const [q3ImageHave, setQ3ImageHave] = useState(false);
	const [paragraph, setParagraph] = useState("");
	const [mcq, setMcq] = useState([]);
	const [q3Image, setQ3Image] = useState();
	const [displayQ3, setDisplayQ3] = useState(false);
	const [mcqComponents, setMcqComponents] = useState([]);

	useEffect(() => {
		fetch(`${host}/form/get/${id}`)
			.then((res) => res.json())
			.then((res) => {
				if (res.isError) {
					console.log(res);
					alert(res.message);
				} else {
					setDetails(res);
				}
			})
			.catch((err) => {
				console.log(err);
				alert(err.message);
			});
	}, []);

	const setDetails = (res) => {
		console.log(res.form);

		let q1 = res.form.q1;
		let q2 = res.form.q2;
		let q3 = res.form.q3;

		setFormName(res.form.name);
		setFormDesc(res.form.description);

		setQ1Categories(q1.categories);
		setQ1Options(q1.options);
		setQ1Marks(q1.markOnCorrectAnswer);

		setQ2Sentence(q2.correctAnswer);
		let arr =  q2.options.map((ele) =>{
			return ele.selectedWord
		})
		setQ2Options(arr);
		setQ2Marks(q2.markOnCorrectAnswer);

		setParagraph(q3.paragraph);
		setMcq(q3.mcq);
		setQ3Marks(q3.markOnCorrectAnswer);

		setTimeout(()=>{
			console.log(q2.options)
			setDisplayForm(true);
			setDisplayQ1(true);
			setDisplayQ2(true);
			setDisplayQ3(true);
		},1000)
	};

	return (
		<div className="bg-white">
			<div className="bg-white ">
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
								to="/signin"
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
											to="/signin"
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

					<main  className="mt-16">
						{displayForm && <section className=" w-1/2  m-auto border">
							
							<div className="absolute">
								<h1 className="mt-3.5 ml-3.5 mr-8 text-4xl">
									{formName}
								</h1>
								<p className="mt-3.5 ml-3.5 mr-8 text-xl">{formDesc}</p>
							</div>
							<img
								src={headerImage}
								alt=""
								id="image-preview"
								className="w-full h-36 "
							/>
						</section>}
						{displayQ1 && <section className=" w-1/2 m-auto mt-8 px-2 border">
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
							<Q1Component
								q1Categories={q1Categories}
								q1Options={q1Options}
							/>
						</section>}
						{displayQ2 && <section className=" w-1/2 m-auto  mt-8  px-2 border">
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
							<Q2Component
								sentence={q2Sentence}
								wordsArray={q2Options}
							/>
						</section>}
						{displayQ3 && <section className=" w-1/2 m-auto mt-8 px-2 border">
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
							<Q3Component paragraph={paragraph} mcqArray={mcq} />
						</section>}
						<section id="formBottom" className=" w-1/2 m-auto  mt-8">
							<button
								// onClick={checkValidity}
								className="bg-emerald-400 p-1 ml-5 mt-3.5 px-2 rounded"
							>
								Submit Form
							</button>
						</section>
					</main>
				</div>
			</div>
		</div>
	);
}

export default FormDetails;
