import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faImage,
	faXmark,
	faBars,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";

import "../App.css";
import InputList from "../components/InputList";
import Question1Component from "../components/Question1Component";
import Question2Component from "../components/Question2Component";
import Question3Component from "../components/Question3Component";
import WordList from "../components/WordList";
import McqInputComponent from "../components/McqInput";

function CreateForm() {
	const host = "https://form-backend-rq3w.onrender.com";
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const navigate = useNavigate();

	const [nav, setNav] = useState({ text: "Log in", to: "/signin" });
	const [navigation, setNavigation] = useState([
		{ name: "Create New Form", to: "/form/create" },
	]);
	const [userId, setUserId] = useState("");

	useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem("userInfo"));
		if (userInfo) {
			setNav({ text: userInfo.name, to: "/" });
			setUserId(userInfo._id);
		} else {
			setTimeout(() => {
				/* eslint-disable no-restricted-globals */
				if (confirm("To create a form, you have to log in first")) {
					navigate("/signin");
				} else {
					navigate("/");
				}
				/* eslint-enable no-restricted-globals */
			}, 1000);
		}
	}, []);

	const [formName, setFormName] = useState("");
	const [formDesc, setFormDesc] = useState("");
	const [headerImage, setHeaderImage] = useState("/images/header_image.jpg");

	const [question1, setQuestion1] = useState({
		question1Description: "",
		question1Marks: "",
		question1ImageHave: false,
		question1Categories: [],
		question1Options: [],
		question1Image: "",
		question1Preview: false,
	});

	const [question2, setQuestion2] = useState({
		question2Description: "",
		question2Marks: "",
		question2ImageHave: false,
		question2Sentence: "",
		question2Options: [],
		question2Image: "",
		question2Preview: false,
		selectedWords: [],
	});

	const [question3, setQuestion3] = useState({
		question3Description: "",
		question3Marks: "",
		question3ImageHave: false,
		paragraph: "",
		mcq: [],
		question3Image: "",
		question3Preview: false,
		mcqComponents: [],
	});
	const [mcqComponents, setMcqComponents] = useState([]);

	const [progress, setProgress] = useState(50);
	const [isProgress, setIsProgress] = useState(false);
	const [progressText, setProgressText] = useState("progressing...");

	const [url, setUrl] = useState("");

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		image: null,
	});

	const uploadImage = (image, type) => {
		const data = new FormData();
		data.append("image", image);

		fetch(`${host}/image/upload`, {
			method: "POST",
			body: data,
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.isError) {
					console.log("Error uploading image", res.message);
				} else {
					if (type === "form") {
						setHeaderImage(res.imageResult.url);
					} else if (type === "q1") {
						setQuestion1({
							...question1,
							question1ImageHave: true,
							question1Image: res.imageResult.url,
						});
					} else if (type === "q2") {
						setQuestion2({
							...question2,
							question2ImageHave: true,
							question2Image: res.imageResult.url,
						});
					} else if (type === "q3") {
						setQuestion2({
							...question3,
							question2ImageHave: true,
							question2Image: res.imageResult.url,
						});
					}
				}
			})
			.catch((err) => {
				console.log(err);
				setIsProgress(false);
				alert(err.message);
			});
	};

	const handleImageChange = (e) => {
		const imageFile = e.target.files[0];
		setFormData({ ...formData, image: imageFile });

		const reader = new FileReader();
		reader.onload = (e) => {
			setHeaderImage(e.target.result);
			uploadImage(imageFile, "form");
		};
		reader.readAsDataURL(imageFile);
	};

	const handleQ1ImageChange = (e) => {
		const imageFile = e.target.files[0];
		setFormData({ ...formData, image: imageFile });

		const reader = new FileReader();
		reader.onload = (e) => {
			setQuestion1({
				...question1,
				question1ImageHave: true,
				question1Image: e.target.result,
			});

			uploadImage(imageFile, "q1");
		};
		reader.readAsDataURL(imageFile);
	};

	const handleQ2ImageChange = (e) => {
		const imageFile = e.target.files[0];
		setFormData({ ...formData, image: imageFile });

		const reader = new FileReader();
		reader.onload = (e) => {
			setQuestion2({
				...question2,
				question2ImageHave: true,
				question2Image: e.target.result,
			});

			uploadImage(imageFile, "q2");
		};
		reader.readAsDataURL(imageFile);
	};

	const handleQ3ImageChange = (e) => {
		const imageFile = e.target.files[0];
		setFormData({ ...formData, image: imageFile });

		const reader = new FileReader();
		reader.onload = (e) => {
			setQuestion3({
				...question3,
				question3ImageHave: true,
				question3Image: e.target.result,
			});

			uploadImage(imageFile, "q3");
		};
		reader.readAsDataURL(imageFile);
	};

	const displayPreview = () => {
		setQuestion1({
			...question1,
			question1Preview: false,
		});

		console.log(question1.question1Options, question1.question1Categories);

		setTimeout(() => {
			setQuestion1({
				...question1,
				question1Preview: true,
			});
		}, 1000);
	};

	const displayQ2Preview = () => {
		setQuestion2({
			...question2,
			question2Preview: false,
		});

		setTimeout(() => {
			setQuestion2({
				...question2,
				question2Preview: true,
			});
		}, 1000);
	};

	const displayQ3Preview = () => {
		setQuestion3({
			...question3,
			question3Preview: false,
		});

		setTimeout(() => {
			setQuestion3({
				...question3,
				question3Preview: true,
			});
		}, 1000);
	};

	const handleWordDoubleClick = (e) => {
		const selectedWord = e.target.textContent.trim();
		const id = e.target.id;

		let obj = {
			id,
			selectedWord,
		};
		setQuestion2({
			...question2,
			selectedWords: [...question2.selectedWords, obj],
			question2Options: [...question2.question2Options, selectedWord],
		});

		console.log(`Selected word: ${selectedWord} ${id}`);
		// You can perform further actions with the selected word here.
	};

	const addMcqComponent = () => {
		// Create a new McqInputComponent and add it to the list
		const newMcqComponent = (
			<McqInputComponent
				key={mcqComponents.length}
				index={mcqComponents.length}
				question3={question3}
				setQuestion3={setQuestion3}
			/>
		);

		// setQuestion3({
		// 	...question3,
		// 	mcqComponents: [...question3.mcqComponents, newMcqComponent]
		// });

		setMcqComponents([...mcqComponents, newMcqComponent]);
	};

	const checkValidity = () => {
		console.log(`Checking validity`);
		setIsProgress(true);

		const isFormValid = formValidity();

		if (isFormValid) {
			setProgress(10);
			setProgressText("Checking Question 1 validity...");
			const isQ1Valid = q1Validity();

			if (isQ1Valid) {
				setProgress(20);
				setProgressText("Checking Question 2 validity...");
				const isQ2Valid = q2Validity();

				if (isQ2Valid) {
					setProgress(30);
					setProgressText("Checking Question 3 validity...");

					const isQ3Valid = q3Validity();

					if (isQ3Valid) {
						setProgress(40);
						setProgressText("Uploading Question 1...");
						createForm();
					} else {
						setIsProgress(false);
					}
				} else {
					setIsProgress(false);
				}
			} else {
				setIsProgress(false);
			}
		} else {
			setIsProgress(false);
		}
	};

	const formValidity = () => {
		if (!formName) {
			alert("Form name is required");
			return false;
		}
		return true;
	};
	const q1Validity = () => {
		if (!question1.question1Marks) {
			alert("Marks is required for Question 1");
			return false;
		}

		if (question1.question1Categories.length < 2) {
			alert("Minimum 2 Categories is required for Question 1");
			return false;
		}

		if (question1.question1Options.length < 1) {
			alert("Minimum 1 Option is required for Question 1");
			return false;
		}

		return true;
	};

	const q2Validity = () => {
		if (!question2.question2Marks) {
			alert("Marks is required for Question 2");
			return false;
		}

		if (!question2.question2Sentence) {
			alert("Sentence is required for Question 2");
			return false;
		}

		return true;
	};

	const q3Validity = () => {
		if (!question3.question3Marks) {
			alert("Marks is required for Question 3");
			return false;
		}

		if (!question3.paragraph) {
			alert("paragraph is required for Question 3");
			return false;
		}

		if (question3.mcq.length < 1) {
			alert("Minimum 1 mcq is required for Question 3");
			return false;
		}

		const isMcqValid = mcqValidity(question3.mcq);

		return isMcqValid;
	};

	const mcqValidity = (mcq) => {
		for (let i = 0; i < mcq.length; i++) {
			let que = mcq[i];

			if (!que.question) {
				alert("Question is required for Question.3." + (i + 1));
				return false;
			}

			if (!que.correctOption) {
				alert("CorrectOption is required for Question.3." + (i + 1));
				return false;
			}

			for (let j = 0; j < que.options.length; j++) {
				let opt = que.options[j];

				if (!opt) {
					alert(
						"Option is required for Question.3." + (i + 1) + "." + (j + 1)
					);
					return false;
				}
			}
		}

		return true;
	};

	const createForm = () => {
		postQ1();
	};

	const postQ1 = () => {
		let q1 = {
			description: question1.question1Description,
			categories: question1.question1Categories,
			options: question1.question1Options,
			q1Image: question1.question1Image,
			markOnCorrectAnswer: question1.question1Marks,
		};

		fetch(`${host}/question/question1/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(q1),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.isError) {
					console.log(res);
					setIsProgress(false);
					alert(res.message);
				} else {
					console.log(res);
					setProgress(52);
					setProgressText("Uploading Question 2...");
					postQ2(res.q1._id);
				}
			})
			.catch((err) => {
				console.log(err);
				setIsProgress(false);
				alert(err.message);
			});
	};
	const postQ2 = (q1ID) => {
		let q2 = {
			description: question2.question2Description,
			preview: question2.question2Sentence,
			q2Image: question2.question2Image,
			correctAnswer: question2.question2Sentence,
			markOnCorrectAnswer: question2.question2Marks,
			options: question2.selectedWords,
		};

		fetch(`${host}/question/question2/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(q2),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.isError) {
					alert(res.message);
					setIsProgress(false);
				} else {
					console.log(res);
					setProgress(65);
					setProgressText("Uploading Question 3...");
					postQ3(q1ID, res.q2._id);
				}
			})
			.catch((err) => {
				setIsProgress(false);
				console.log(err);
				alert(err.message);
			});
	};
	const postQ3 = (q1ID, q2ID) => {
		let q3 = {
			description: question3.q3Desc,
			paragraph: question3.paragraph,
			q3Image: question3.q3Image,
			mcq: question3.mcq,
			markOnCorrectAnswer: question3.q3Marks,
		};

		fetch(`${host}/question/question3/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(q3),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.isError) {
					alert(res.message);
					setIsProgress(false);
				} else {
					console.log(res);
					setProgress(80);
					setProgressText("Uploading Form...");
					postForm(q1ID, q2ID, res.q3._id);
				}
			})
			.catch((err) => {
				console.log(err);
				setIsProgress(false);
				alert(err.message);
			});
	};
	const postForm = (q1, q2, q3) => {
		let formData = {
			name: formName,
			description: formDesc,
			adminId: userId,
			headerImage,
			q1,
			q2,
			q3,
		};

		fetch(`${host}/form/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.isError) {
					setIsProgress(false);
					alert(res.message);
				} else {
					console.log(res.form);
					setProgress(100);
					setProgressText("Form created successfully...");

					let u = window.location.href.split("create")[0];
					setUrl(`${u}${res.form._id}`);
				}
			})
			.catch((err) => {
				console.log(err);
				setIsProgress(false);
				alert(err.message);
			});
	};

	const handelCopyLink = () => {
		let q = url;

		navigator.clipboard.writeText(q).then(
			function () {
				alert("Link copied in clipboard");
			},
			function () {
				alert("Failed to copy question");
			}
		);
	};

	return (
		<div className="bg-white">
			<header className="absolute inset-x-0 top-0 z-50">
				<nav
					className="flex items-center justify-between p-6 lg:px-8"
					aria-label="Global"
				>
					<div className="flex lg:flex-1">
						<Link to="/" className="-m-1.5 p-1.5">
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
							<FontAwesomeIcon icon={faBars} />
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
							to={nav.to}
							className="text-sm font-semibold leading-6 text-gray-900"
						>
							{nav.text} <span aria-hidden="true">&rarr;</span>
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
							<Link to="/" className="-m-1.5 p-1.5">
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
								<FontAwesomeIcon icon={faXmark} />
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
										to={nav.to}
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										{nav.text}
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
						className="flex w-full border-2 h-44 p-3 custom-box-shadow"
					>
						<div className=" w-1/2">
							<div className="flex ">
								<input
									type="text"
									value={formName}
									onChange={(e) => setFormName(e.target.value)}
									placeholder="Enter form name *"
									className="mt-3.5 ml-3.5 mr-8 pl-2 text-3xl font-medium max-w-md border-0 bg-transparent outline-none custom-placeholder border-b-4 border-gray-600 "
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
										className="mr-8 text-3xl cursor-pointer mt-8"
									/>
								</div>
							</div>
							<input
								type="text"
								value={formDesc}
								onChange={(e) => setFormDesc(e.target.value)}
								placeholder="Enter form description"
								className="mt-3.5 ml-3.5 mr-8 pl-2 text-xl w-3/4 border-0 bg-transparent outline-none custom-placeholder border-b-2 border-gray-400"
							/>
						</div>
						{/* <hr/> */}
						<div className=" w-1/2 relative">
							<img
								src={headerImage}
								alt=""
								id="image-preview"
								className="w-full h-36 absolute rounded-md"
							/>
							<div className="absolute">
								<h1 className="mt-3.5 ml-3.5 mr-8 text-3xl font-medium">
									{formName}
								</h1>
								<p className="mt-3.5 ml-3.5 mr-8 text-xl">{formDesc}</p>
							</div>
						</div>
					</section>
					<section
						id="question1"
						className="mt-3.5 flex w-full border-2 p-3 custom-box-shadow"
					>
						<div className=" w-1/2">
							<h2 className="ml-5 text-2xl">Question 1</h2>
							<div className="ml-5">
								<div className="flex">
									<input
										type="text"
										value={question1.question1Description}
										onChange={(e) =>
											setQuestion1({
												...question1,
												question1Description: e.target.value,
											})
										}
										placeholder="Enter description  "
										className="mt-3.5 ml-3.5 mr-8 pl-2 text-xl w-1/2  border-0 bg-transparent outline-none custom-placeholder border-b-2 border-gray-400"
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
											className="mr-8 text-3xl cursor-pointer mt-3.5"
										/>
									</div>
									<input
										type="number"
										value={question1.question1Marks}
										onChange={(e) =>
											setQuestion1({
												...question1,
												question1Marks: e.target.value,
											})
										}
										placeholder="Marks *"
										className="mt-3.5  mr-8 text-xl w-20  bg-transparent outline-none custom-placeholder pl-1 border-b-2 border-gray-400"
									/>
								</div>
								<div>
									<InputList
										Title="Category"
										categories={question1.question1Categories}
										setCategories={(categories) =>
											setQuestion1({
												...question1,
												question1Categories: categories,
											})
										}
										options={question1.question1Options}
										setQ1Options={(options) =>
											setQuestion1({
												...question1,
												question1Options: options,
											})
										}
									/>
									<InputList
										Title="Option"
										categories={question1.question1Categories}
										setCategories={(categories) =>
											setQuestion1({
												...question1,
												question1Categories: categories,
											})
										}
										options={question1.question1Options}
										setQ1Options={(options) =>
											setQuestion1({
												...question1,
												question1Options: options,
											})
										}
									/>
								</div>
								{/* <button
									onClick={displayPreview}
									className="custom-save-button p-1 mt-3.5 px-2 rounded"
								>
									Save
								</button> */}

								<button
									className="bookmarkBtn"
									onClick={displayPreview}
								>
									<span className="IconContainer">
										<svg
											viewBox="0 0 384 512"
											height="0.9em"
											className="icon"
										>
											<path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
										</svg>
									</span>
									<p className="text">Save</p>
								</button>
							</div>
						</div>
						<div className=" w-1/2 ml-5">
							<div className="flex justify-between items-center">
								<h2 className="text-2xl">Question 1</h2>
								<p>Marks {question1.question1Marks}</p>
							</div>
							<div>
								{question1.question1ImageHave && (
									<img
										src={question1.question1Image}
										alt=""
										id="image-preview"
										className="w-full"
									/>
								)}
								{question1.question1Description && (
									<p className="mt-3.5 mr-8 text-l">
										{question1.question1Description}
									</p>
								)}
							</div>
							{question1.question1Preview && (
								<Question1Component
									q1Categories={question1.question1Categories}
									q1Options={question1.question1Options}
								/>
							)}
						</div>
					</section>

					<section
						id="question2"
						className="mt-3.5 flex w-full border-2 p-3 custom-box-shadow"
					>
						<div className=" w-1/2">
							<h2 className="ml-5 text-2xl">Question 2</h2>
							<div className="ml-5">
								<div className="flex">
									<input
										type="text"
										value={question2.question2Description}
										onChange={(e) =>
											setQuestion2({
												...question2,
												question2Description: e.target.value,
											})
										}
										placeholder="Enter description  "
										className="mt-3.5 ml-3.5 mr-8 pl-2 text-xl w-1/2 border-0 bg-transparent outline-none custom-placeholder border-b-2 border-gray-400"
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
											className="mr-8 text-3xl cursor-pointer mt-3.5"
										/>
									</div>
									<input
										type="number"
										value={question2.question2Marks}
										onChange={(e) =>
											setQuestion2({
												...question2,
												question2Marks: e.target.value,
											})
										}
										placeholder="Marks *"
										className="mt-3.5  mr-8 text-xl w-20 bg-transparent outline-none custom-placeholder pl-1 border-b-2 border-gray-400"
									/>
								</div>
								<div>
									<div className="flex">
										<p className="mt-3.5 ml-3.5 mr-8 text-xl w-3/4">
											{question2.question2Sentence
												.split(" ")
												.map((word, index) => (
													<span
														key={index}
														onDoubleClick={handleWordDoubleClick}
														id={index}
													>
														{word}{" "}
													</span>
												))}
										</p>
										{/* {q2Sentence && (
										<FontAwesomeIcon
											icon={faUnderline}
											className="mt-5 ml-3.5 mr-8 cursor-pointer text-2xl"
										/>
									)} */}
									</div>
									<input
										type="text"
										value={question2.question2Sentence}
										onChange={(e) =>
											setQuestion2({
												...question2,
												question2Sentence: e.target.value,
											})
										}
										placeholder="Enter the sentence. Double click on the word for selecting the word as blanks..."
										className="mt-3.5 ml-3.5 mr-8 text-lg w-11/12 border-0 bg-transparent outline-none custom-placeholder border-b-2 border-gray-600"
									/>
									<WordList
										Title="Words"
										selectedWords={question2.selectedWords}
									/>
								</div>
								{/* <button
								onClick={displayQ2Preview}
								className="bg-emerald-400 p-1 ml-5 mt-3.5 px-2 rounded"
							>
								Save
							</button> */}
								<button
									className="bookmarkBtn"
									onClick={displayQ2Preview}
								>
									<span className="IconContainer">
										<svg
											viewBox="0 0 384 512"
											height="0.9em"
											className="icon"
										>
											<path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
										</svg>
									</span>
									<p className="text">Save</p>
								</button>
							</div>
						</div>
						<div className=" w-1/2 ml-5">
							<div className="flex justify-between items-center">
								<h2 className="text-2xl">Question 2</h2>
								<p>Marks {question2.question2Marks}</p>
							</div>
							<div>
								{question2.question2ImageHave && (
									<img
										src={question2.question2Image}
										alt=""
										id="image-preview"
										className="w-full"
									/>
								)}
								{question2.question2Description && (
									<p className="mt-3.5 mr-8 text-l">
										{question2.question2Description}
									</p>
								)}
							</div>
							{question2.question2Preview && (
								<Question2Component
									sentence={question2.question2Sentence}
									wordsArray={question2.question2Options}
								/>
							)}
						</div>
					</section>

					<section
						id="question3"
						className="mt-3.5 flex w-full border-2 p-3 custom-box-shadow"
					>
						<div className=" w-1/2">
							<h2 className="ml-5 text-2xl">Question 3</h2>
							<div className="ml-6">
								<div className="flex">
									<input
										type="text"
										value={question3.q3Desc}
										onChange={(e) =>
											setQuestion3({
												...question3,
												q3Desc: e.target.value,
											})
										}
										placeholder="Enter description  "
										className="mt-3.5 ml-3.5 mr-8 text-xl w-2/4  border-0 bg-transparent outline-none custom-placeholder   border-b-2 border-gray-400"
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
											className="mr-8 text-3xl cursor-pointer mt-8"
										/>
									</div>
									<input
										type="number"
										value={question3.question3Marks}
										onChange={(e) =>
											setQuestion3({
												...question3,
												question3Marks: e.target.value,
											})
										}
										placeholder="Marks *"
										className="mt-3.5  mr-8 text-xl w-20 bg-transparent outline-none custom-placeholder pl-1  border-b-2 border-gray-400"
									/>
								</div>
								<div>
									<div>
										<textarea
											name=""
											id=""
											cols="30"
											rows="5"
											value={question3.paragraph}
											onChange={(e) =>
												setQuestion3({
													...question3,
													paragraph: e.target.value,
												})
											}
											placeholder="Enter paragraph *"
											className="mt-3.5 ml-2 mr-8 text-l w-11/12 border bg-transparent outline-none custom-placeholder pl-1 resize-none tracking-widest border-2 border-gray-600  drag-box-shadow p-4 mb-2 font-mono"
										></textarea>
										<div>
											<div className=" w-11/12 flex justify-end">
												<button
													className="mt-2 ml-3.5 bg-cyan-300 p-1 custom-add-button"
													onClick={addMcqComponent}
												>
													{!mcqComponents.length
														? "Add MCQ Question"
														: "Add More MCQ Question"}{" "}
													<FontAwesomeIcon
														icon={faPlus}
														className="ml-1"
													/>
												</button>
											</div>
											{mcqComponents.map(
												(mcqComponent) => mcqComponent
											)}
										</div>
									</div>
									<button
										className="bookmarkBtn"
										onClick={displayQ3Preview}
									>
										<span className="IconContainer">
											<svg
												viewBox="0 0 384 512"
												height="0.9em"
												className="icon"
											>
												<path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
											</svg>
										</span>
										<p className="text">Save</p>
									</button>
								</div>
							</div>
						</div>
						<div className=" w-1/2 ml-5">
							<div className="flex justify-between items-center">
								<h2 className="text-2xl">Question 3</h2>
								<p>Marks {question3.question3Marks}</p>
							</div>
							<div>
								{question3.question3ImageHave && (
									<img
										src={question3.question3Image}
										alt=""
										id="image-preview"
										className="w-full"
									/>
								)}
								{question3.question3Description && (
									<p className="mt-3.5 mr-8 text-l">
										{question3.question3Description}
									</p>
								)}
							</div>
							{question3.question3Preview && (
								<Question3Component
									paragraph={question3.paragraph}
									mcqArray={question3.mcq}
								/>
							)}
						</div>
					</section>

					<section id="formBottom">
						{/* <button
							onClick={checkValidity}
							className="bg-emerald-400 p-1 ml-5 mt-3.5 px-2 rounded"
						>
							Create Form
						</button> */}
						<button
							className="cssbuttons-io-button"
							onClick={checkValidity}
						>
							{" "}
							Create Form
							<div className="icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width="24"
									height="24"
								>
									<path fill="none" d="M0 0h24v24H0z"></path>
									<path
										fill="currentColor"
										d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
									></path>
								</svg>
							</div>
						</button>
					</section>
				</main>
			</div>

			{isProgress && (
				<div
					id="progress"
					className="flex bg-green-200 pl-40 py-20 m-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				>
					<div className="m-auto">
						<progress id="file" value={progress} max="100">
							{progress}{" "}
						</progress>
						<p>{progressText}</p>
						{url && (
							<p id="link">
								{url}
								{/* <button
									className="border-2 bg-transparent outline-none custom-placeholder px-1 border-b-2 border-sky-200"
									onClick={handelCopyLink}
								>
									Copy Link
								</button> */}
								<button className="copy-btn" onClick={handelCopyLink}>
									<span className="text">Copy</span>
									<span className="svgIcon">
										<svg
											fill="white"
											viewBox="0 0 384 512"
											height="1em"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"></path>
										</svg>
									</span>
								</button>
							</p>
						)}
					</div>
					<FontAwesomeIcon
						icon={faXmark}
						onClick={() => setIsProgress(false)}
						className="mr-8 text-3xl cursor-pointer -mt-16 ml-40"
					/>
				</div>
			)}
		</div>
	);
}

export default CreateForm;
