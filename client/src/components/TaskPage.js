import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { alertError, alertSuccess } from "../apis/swal";
import { addTask } from "../store/actions";

export default function TaskPage() {
	const dispatch = useDispatch();
	const history = useHistory();

	const [input, setInput] = useState({
		title: "",
	});

	const handleInput = (e) => {
		const value = e.target.value;
		const title = e.target.title;

		setInput({
			...input,
			[title]: value,
		});
	};

	const handleAddTask = (e) => {
		e.preventDefault();
		const payload = input;

		dispatch(addTask(payload))
			.then((result) => {
				alertSuccess(
					`task ${result.title} has been added with id ${result.id}`
				);
				// history.push("/users");
			})
			.catch((err) => {
				let message = err.message;
				alertError(message);
			});
	};

	return (
		<div className="col-10 px-5" id="Register">
			<h3 className="my-4">Add Task</h3>
			<hr className="mb-4" />
			<div className="d-flex justify-content-center">
				<div className="card p-5 w-50 mb-5">
					<form onSubmit={handleAddTask}>
						<strong>TASK</strong>
						<input
							type="email"
							name="email"
							className="form-control mt-1 mb-3"
							value={input.title}
							onChange={handleInput}
						/>

						<input
							type="submit"
							value="Add Task"
							className="btn btn-primary mt-4"
						/>
					</form>
				</div>
			</div>
		</div>
	);
}