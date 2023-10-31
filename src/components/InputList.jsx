import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHand, faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";

function InputList({ Title, setCategories, categories , options, setQ1Options}) {
	const [inputs, setInputs] = useState([{ id: "input-0", value: "" }]);
    const [selectedValues, setSelectedValues] = useState(Array(inputs.length).fill(''));

	const handleInputChange = (event, inputId) => {
		const updatedInputs = inputs.map((input) => {
			if (input.id === inputId) {
                let index = input.id.split('-')[1]
                console.log(options[index])
				return { ...input, value: event.target.value };
			}
			return input;
		});
		setInputs(updatedInputs);

		if (Title === "Category") {
			setCategories(updatedInputs);
		}
	};

    const handleSelectChange = (index, value) => {
        const updatedValues = [...selectedValues];
        updatedValues[index] = value;
        setSelectedValues(updatedValues);

        console.log(inputs[index].value,updatedValues[index])
        options[index]={
            option: inputs[index].value,
			correctCategory: updatedValues[index],
        }
        console.log(options)
      };

	const handleDragEnd = (result) => {
		if (!result.destination) return;

		const reorderedInputs = [...inputs];
		const [movedInput] = reorderedInputs.splice(result.source.index, 1);
		reorderedInputs.splice(result.destination.index, 0, movedInput);

		setInputs(reorderedInputs);
	};

	const handleRemoveInput = (index) => {
		const updatedInputs = [...inputs];
		updatedInputs.splice(index, 1);
		setInputs(updatedInputs);
	};

	const addInput = () => {
		const newInputId = `input-${inputs.length}`;
		// handleAddCategory(newInputId);
		setInputs([...inputs, { id: newInputId, value: "" }]);
	};

	return (
		<div className="ml-5 mt-3.5">
			<h2 className=" text-xl">{Title}</h2>
			<DragDropContext onDragEnd={handleDragEnd}>
				<Droppable droppableId="input-list">
					{(provided) => (
						<div {...provided.droppableProps} ref={provided.innerRef}>
							{inputs.map((input, index) => (
								<Draggable
									key={input.id}
									draggableId={input.id}
									index={index}
								>
									{(provided) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<FontAwesomeIcon
												icon={faHand}
												className="text-xl opacity-25 hover:opacity-100 transition-opacity mr-2"
											/>
											<input
												type="text"
												placeholder={"Enter " + Title}
												value={input.value}
												onChange={(e) =>
													handleInputChange(e, input.id)
												}
												className="mt-3.5  mr-8 text-l w-1/4 border bg-transparent outline-none custom-placeholder pl-1 border-b-2 border-sky-200"
											/>
											{input.value && (
												<FontAwesomeIcon
													icon={faXmark}
													className="text-xl mr-2"
													onClick={() => handleRemoveInput(index)}
												/>
											)}
											{input.value && Title === "Option" && (
												<select name="" id="" value={selectedValues[index]}
                                                onChange={(e) => handleSelectChange(index, e.target.value)}>
													<option value="">
														Select Correct Category
													</option>
													{categories.map((category) => (
														<option
															key={category.id}
															value={category.value}
														>
															{category.value}
														</option>
													))}
												</select>
											)}
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			<button onClick={addInput} className="bg-cyan-300 p-1 ml-7 mt-2 rounded">Add {Title} <FontAwesomeIcon icon={faPlus} /></button>
		</div>
	);
}

export default InputList;
