import React, { useState } from "react";

function ParagraphMCQComponent({ paragraph, mcqArray }) {
	const [selectedOptions, setSelectedOptions] = useState([]);

	const handleOptionChange = (question, selectedOption) => {
		const updatedSelectedOptions = [...selectedOptions];
		updatedSelectedOptions[question] = selectedOption;
		setSelectedOptions(updatedSelectedOptions);
	};

	return (
		<div className="mt-3.5 ml-5">
			<p className=" text-xl">{paragraph}</p>
			{mcqArray.map((mcq, index) => (
				<div key={index} className="">
					<p className="mt-3.5 ml-0 mr-8 text-lg">
						{"Question 3."}
						{index + 1}{" "}
					</p>
					<p className="mt-0 ml-8 mr-8 text-lg">{mcq.question}</p>

					{mcq.options.map((option, optionIndex) => (
						<div key={optionIndex} className="ml-8 mt-2">
							<input
								type="checkbox"
								checked={selectedOptions[index] === option}
								onChange={() => handleOptionChange(index, option)}
							/>
							<span className="ml-2 text-base">{option}</span>
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default ParagraphMCQComponent;
