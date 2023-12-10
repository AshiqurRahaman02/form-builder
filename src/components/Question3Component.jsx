import React, { useState } from "react";

function Question3Component({ paragraph, mcqArray }) {
	const [selectedOptions, setSelectedOptions] = useState([]);

	const handleOptionChange = (question, selectedOption) => {
		const updatedSelectedOptions = [...selectedOptions];
		updatedSelectedOptions[question] = selectedOption;
		setSelectedOptions(updatedSelectedOptions);
	};

	return (
		<div className="mt-3.5 ml-5">
			<p className=" text-xl  drag-box-shadow p-4 mb-5 font-mono">{paragraph}</p>
			{mcqArray.map((mcq, index) => (
				<div key={index} className=" drag-box-shadow p-3 mb-2">
					<p className="mt-3.5 ml-0 mr-8 text-lg font-bold">
						{"Question 3."}
						{index + 1}{" "}
					</p>
					<p className="mt-0 ml-8 mr-8 text-lg font-sans">{mcq.question}</p>

					{mcq.options.map((option, optionIndex) => (
						<div key={optionIndex} className="ml-8 mt-2">
							<input
								type="checkbox"
								checked={selectedOptions[index] === option}
								onChange={() => handleOptionChange(index, option)}
							/>
							<span className="ml-2 text-base font-serif">{option}</span>
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default Question3Component;
