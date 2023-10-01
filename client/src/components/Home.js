import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  getTasks, addTask, editTask, deleteTask, 
  getActiveTasks, getCompletTasks
} from "../store/actions.js";

function Home() {
	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.taskReducer.tasks);

	const [task, setTask] = useState("");

	useEffect(() => {
		dispatch(getTasks());
	}, [dispatch]);

	const handleAdd = async () => {
		await dispatch(addTask({ title: task }));
		dispatch(getTasks());
		setTask("");
	};



	const handleEdit = async (id) => {
		await dispatch(editTask({ title: "Updated" }, id));
		dispatch(getTasks());
	};

	const handleDelete = async (id) => {
		await dispatch(deleteTask(id));
		dispatch(getTasks());
	};

	return (
		<div className="d-flex justify-content-center">
			<h1>What's the plan for today?</h1>
			<input
				value={task}
				onChange={(e) => setTask(e.target.value)}
				placeholder="Add a task"
			/>
			<button onClick={handleAdd}>Add</button>

			<br></br>
			<br></br>

			<button onClick={() => dispatch(getTasks())}>All Tasks</button>
			<button onClick={() => dispatch(getActiveTasks())}>Active Tasks</button>
			<button onClick={() => dispatch(getCompletTasks())}>Completed Tasks</button>

			<ul>
				{tasks.map((t) => (
					<li key={t.id}>
						{t.title} 
						<button onClick={() => handleEdit(t.id)}>Edit</button>
						<button onClick={() => handleDelete(t.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Home;
