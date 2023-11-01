import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHand, faXmark } from "@fortawesome/free-solid-svg-icons";

function WordList({ Title, selectedWords }) {
	const [inputs, setInputs] = useState([...selectedWords]);

	const handleInputChange = (event, inputId) => {
		const updatedInputs = inputs.map((input) => {
			if (input.id === inputId) {
				return { ...input, value: event.target.value };
			}
			return input;
		});
		setInputs(updatedInputs);
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

	useEffect(() => {
		setInputs([...selectedWords]);
	}, [selectedWords]);

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
											className="flex"
										>
											<FontAwesomeIcon
												icon={faHand}
												className="text-xl opacity-25 hover:opacity-100 transition-opacity mr-2"
											/>
											<p className=" mr-8 text-l  border bg-transparent outline-none custom-placeholder px-1 border-b-2 border-sky-200">
												{input.selectedWord}
											</p>
											{/* <FontAwesomeIcon
													icon={faXmark}
													className="text-xl mr-2"
													onClick={() => handleRemoveInput(index)}
												/> */}
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			{/* <button onClick={addInput}>Add {Title}</button> */}
		</div>
	);
}

export default WordList;
