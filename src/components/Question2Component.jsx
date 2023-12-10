import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHand } from "@fortawesome/free-solid-svg-icons";

function Question2Component({ sentence, wordsArray }) {
	console.log(wordsArray);
	const answer = new Array(sentence.split(" ").length).fill("###");

	sentence.split(" ").forEach((element, index) => {
		if (!wordsArray.includes(element)) {
			answer[index] = element;
		}
	});

	const [answerSentence, setAnswerSentence] = useState([...answer]);
	const [remainingWords, setRemainingWords] = useState([...wordsArray]);

	const handleDragEnd = (result) => {
		if (!result.destination) return;

		console.log(result.source);

		const draggedWord = remainingWords[result.source.index];

		setRemainingWords(remainingWords.filter((word) => word !== draggedWord));

		const droppedIndex = result.destination.droppableId.split("-")[1];
		answerSentence[droppedIndex] = draggedWord;
		console.log(draggedWord, droppedIndex);

		setAnswerSentence([...answerSentence]);
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<div className="sentence mt-3.5 ml-3.5 mr-8 text-xl drag-box-shadow p-4 ">
				{answerSentence.map((word, index) =>
					word === "###" ? (
						<Droppable
							key={`blank-${index}`}
							droppableId={`blank-${index}`}
							// isDropDisabled={!!blanks[index]}
						>
							{(provided, snapshot) => (
								<span
									ref={provided.innerRef}
									className={`blank ${
										snapshot.isDraggingOver ? "dragging-over" : ""
									}`}
								>
									<span className="shadow-inner bg-gray-100 p-2 mr-2">
										{"______"}
									</span>
									{provided.placeholder}
								</span>
							)}
						</Droppable>
					) : (
						<span key={index}>{word} </span>
					)
				)}
			</div>
			<div className="word-list mt-3.5 ml-3.5 mr-8 text-xl">
				<Droppable droppableId="words" direction="horizontal">
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
							className={`word-container ${
								snapshot.isDraggingOver ? "dragging-over" : ""
							}`}
						>
							{remainingWords.map((word, index) => (
								<Draggable key={word} draggableId={word} index={index}>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className={`word ${
												snapshot.isDragging ? "dragging" : ""
											}`}
										>
											{/* {word} */}
											<div className="flex w-max px-2 py-3 ml-2 mt-3 drag-box-shadow">
												<FontAwesomeIcon
													icon={faHand}
													className="text-xl opacity-25 hover:opacity-100 transition-opacity mr-2"
												/>
												<p className="  text-l   bg-transparent outline-none custom-placeholder px-1  font-semibold leading-6 text-gray-900">
													{word}
												</p>
											</div>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		</DragDropContext>
	);
}

export default Question2Component;
