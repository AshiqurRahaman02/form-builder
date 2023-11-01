import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Q2Component({ sentence, wordsArray }) {
	console.log(wordsArray)
	const answer = new Array(sentence.split(" ").length).fill("###");

	sentence.split(" ").forEach((element,index) => {
		if(!wordsArray.includes(element)){
			answer[index] = element
		}
	});

    const [answerSentence, setAnswerSentence] = useState([...answer])
	const [words, setWords] = useState(wordsArray);
	const [blanks, setBlanks] = useState([]);
	const [remainingWords, setRemainingWords] = useState([...wordsArray]);

	const handleDragEnd = (result) => {
		if (!result.destination) return;

		console.log(result.source)

		const draggedWord = remainingWords[result.source.index];
		// const updatedWords = [...words];
		// updatedWords.splice(result.source.index, 1);
		// setWords(updatedWords);

		// const droppedBlank = blanks[result.destination.index];
		// const updatedBlanks = [...blanks];
		// if (droppedBlank) {
		// 	updatedWords.push(droppedBlank);
		// 	updatedBlanks.splice(result.destination.index, 1);
		// } else {
		// 	setRemainingWords(
		// 		remainingWords.filter((word) => word !== draggedWord)
		// 	);
		// 	updatedBlanks.push(draggedWord);
		// }

		// setWords(updatedWords);
		// setBlanks(updatedBlanks);

		setRemainingWords(
			remainingWords.filter((word) => word !== draggedWord)
		);

        const droppedIndex = result.destination.droppableId.split("-")[1]
        answerSentence[droppedIndex] = draggedWord
        console.log( draggedWord,droppedIndex);

		setAnswerSentence([...answerSentence])

	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<div className="sentence mt-3.5 ml-3.5 mr-8 text-xl">
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
									<span>{"______ "}</span>
									{provided.placeholder}
								</span>
							)}
						</Droppable>
					) : (
						<span key={index}>{word} </span>
					)
					// <span key={index}>{word}{" "}</span>
					// <Droppable
					// 	key={`blank-${index}`}
					// 	droppableId={`blank-${index}`}
					// 	// isDropDisabled={!!blanks[index]}
					// >
					// 	{(provided, snapshot) => (
					// 		<span
					// 			ref={provided.innerRef}
					// 			className={`blank ${
					// 				snapshot.isDraggingOver ? "dragging-over" : ""
					// 			}`}
					// 		>
					// 			{blanks[index] ? blanks[index]: <span>{word}{" "}</span>}
					// 			{provided.placeholder}
					// 		</span>
					// 	)}
					// </Droppable>
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
											{word}
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

export default Q2Component;
