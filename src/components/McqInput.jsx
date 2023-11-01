import React, { useEffect, useState } from "react";

function McqInputComponent({ index, mcq, setMcq }) {
	const [question, setQuestion] = useState("");
	const [checkboxInputs, setCheckboxInputs] = useState([
		{ label: "", checked: false, input: "" },
		{ label: "", checked: false, input: "" },
		{ label: "", checked: false, input: "" },
	]);

	const addCheckboxInput = () => {
		setCheckboxInputs([
			...checkboxInputs,
			{ label: "", checked: false, input: "" },
		]);
	};

	const handleCheckboxChange = (index) => {
		const updatedInputs = [...checkboxInputs];
		updatedInputs.forEach((input, i) => {
			if (i === index) {
				input.checked = true;
			} else {
				input.checked = false;
			}
		});
		setCheckboxInputs(updatedInputs);
	};

	const handleInputChange = (index, label, value) => {
		const updatedInputs = [...checkboxInputs];
		updatedInputs[index] = {
			label,
			checked: updatedInputs[index].checked,
			input: value,
		};
		setCheckboxInputs(updatedInputs);
	};

	useEffect(() => {
		let options = [];
		let correctOption = "";

		checkboxInputs.forEach((input) => {
			options.push(input.input);
			if (input.checked) {
				correctOption = input.input;
			}
		});

		mcq[index] = {
			question,
			options,
			correctOption,
		};

		setMcq([...mcq]);
	}, [question, checkboxInputs]);

	return (
		<div className="mt-3.5 ml-5">
			<h2 className=" text-xl">Question 3.{index + 1}</h2>
			<input
				type="text"
				placeholder="Enter Question"
				value={question}
				onChange={(e) => setQuestion(e.target.value)}
				className="mt-3.5 ml-3.5 mr-8 text-lg w-2/4 border-0 bg-transparent outline-none custom-placeholder border-b-4 border-sky-200"
			/>
			{checkboxInputs.map((input, index) => (
				<div key={index} className=" ml-3.5">
					<input
						type="checkbox"
						checked={input.checked}
						onChange={() => handleCheckboxChange(index)}
					/>
					<input
						type="text"
						placeholder={"Enter Option " + (index + 1)}
						value={input.input}
						className="mt-3.5 ml-2 mr-8 text-base w-2/4 border-0 bg-transparent outline-none custom-placeholder  border-b-2 border-sky-200"
						onChange={(e) =>
							handleInputChange(index, input.label, e.target.value)
						}
					/>
				</div>
			))}
			<button
				onClick={addCheckboxInput}
				className="mt-2 ml-3.5 bg-cyan-300 p-1 ml-7 mt-2 rounded"
			>
				Add Option
			</button>
		</div>
	);
}

export default McqInputComponent;
