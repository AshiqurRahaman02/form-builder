import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function Q1Component({ q1Categories, q1Options }) {
	let items = [];

	q1Options.forEach((element) => {
		let random = Math.floor(1000 + Math.random() * 9000);
		let obj = {
			id: random.toString(),
			content: element.option,
		};
		items.push(obj);
	});

	const [itemsFromBackend, setItemsFromBackend] = useState(items);

	const columnsFromBackend = {
		1: {
			name: "Options",
			items: itemsFromBackend,
		},
	};

	q1Categories.forEach((ele) => {
		let random = Math.floor(1000 + Math.random() * 9000);
		columnsFromBackend[random] = { name: ele.value, items: [] };
	});

	const [columns, setColumns] = useState(columnsFromBackend);

	const onDragEnd = (result, columns, setColumns) => {
		if (!result.destination) return;
		const { source, destination } = result;

		if (source.droppableId !== destination.droppableId) {
			const sourceColumn = columns[source.droppableId];
			const destColumn = columns[destination.droppableId];
			const sourceItems = [...sourceColumn.items];
			const destItems = [...destColumn.items];
			const [removed] = sourceItems.splice(source.index, 1);
			destItems.splice(destination.index, 0, removed);
			setColumns({
				...columns,
				[source.droppableId]: {
					...sourceColumn,
					items: sourceItems,
				},
				[destination.droppableId]: {
					...destColumn,
					items: destItems,
				},
			});
		} else {
			const column = columns[source.droppableId];
			const copiedItems = [...column.items];
			const [removed] = copiedItems.splice(source.index, 1);
			copiedItems.splice(destination.index, 0, removed);
			setColumns({
				...columns,
				[source.droppableId]: {
					...column,
					items: copiedItems,
				},
			});
		}
	};
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				// height: "100%",
				flexWrap: "wrap",
			}}
		>
			<DragDropContext
				onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
			>
				{Object.entries(columns).map(([columnId, column], index) => {
					if (index === 0) {
						return (
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									height:"max-content",
								}}
								key={columnId}
							>
								<h2>{column.name}</h2>
								<div style={{ margin: 8 }}>
									<Droppable droppableId={columnId} key={columnId}>
										{(provided, snapshot) => {
											return (
												<div
													{...provided.droppableProps}
													ref={provided.innerRef}
													style={{
														background: snapshot.isDraggingOver
															? "lightblue"
															: "#D9E7F0",
														padding: 4,
														width: 500,
														display: "flex",
														flexDirection: "column",
														justifyContent: "center",
														alignItems: "center",
														minHeight: 250,
													}}
												>
													{column.items.map((item, index) => {
														return (
															<Draggable
																key={item.id}
																draggableId={item.id}
																index={index}
															>
																{(provided, snapshot) => {
																	return (
																		<div
																			ref={provided.innerRef}
																			{...provided.draggableProps}
																			{...provided.dragHandleProps}
																			style={{
																				userSelect: "none",
																				padding: 16,
																				margin: "0 0 8px 0",
																				width: 200,
																				textAlign: "center",
																				height: "50px",
																				backgroundColor:
																					snapshot.isDragging
																						? "#263B4A"
																						: "#456C86",
																				color: "white",
																				...provided
																					.draggableProps
																					.style,
																			}}
																		>
																			{item.content}
																		</div>
																	);
																}}
															</Draggable>
														);
													})}
													{provided.placeholder}
												</div>
											);
										}}
									</Droppable>
								</div>
								<br />
							</div>
						);
					}
					return (
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
							key={columnId}
						>
							<h2>{column.name}</h2>
							<div style={{ margin: 8 }}>
								<Droppable droppableId={columnId} key={columnId}>
									{(provided, snapshot) => {
										return (
											<div
												{...provided.droppableProps}
												ref={provided.innerRef}
												style={{
													background: snapshot.isDraggingOver
														? "lightblue"
														: "#D9E7F0",
													padding: 4,
													width: 200,
													minHeight: 250,
												}}
											>
												{column.items.map((item, index) => {
													return (
														<Draggable
															key={item.id}
															draggableId={item.id}
															index={index}
														>
															{(provided, snapshot) => {
																return (
																	<div
																		ref={provided.innerRef}
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}
																		style={{
																			userSelect: "none",
																			padding: 16,
																			margin: "0 0 8px 0",
																			textAlign: "center",
																			height: "50px",
																			backgroundColor:
																				snapshot.isDragging
																					? "#263B4A"
																					: "#256C80",
																			color: "white",
																			...provided
																				.draggableProps
																				.style,
																		}}
																	>
																		{item.content}
																	</div>
																);
															}}
														</Draggable>
													);
												})}
												{provided.placeholder}
											</div>
										);
									}}
								</Droppable>
							</div>
						</div>
					);
				})}
			</DragDropContext>
		</div>
	);
}

export default Q1Component;
