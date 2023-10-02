import {
	SET_TASK,
	SET_TASKS,
} from "./actionTypes";

export function setTasks(payload) {
	return {
		type: SET_TASKS,
		payload: payload,
	};
}

export function getTasks() {
	return (dispatch) => {
		fetch(`https://frozen-ridge-79795-c98a6f9c5261.herokuapp.com/gettodo`, {
		})
			.then((result) => {
				return result.json();
			})
			.then((result) => {
				dispatch(setTasks(result));
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function getActiveTasks() {
	return (dispatch) => {
		fetch(`https://frozen-ridge-79795-c98a6f9c5261.herokuapp.com/getactive`, {
		})
			.then((result) => {
				return result.json();
			})
			.then((result) => {
				dispatch(setTasks(result));
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function getCompletTasks() {
	return (dispatch) => {
		fetch(`https://frozen-ridge-79795-c98a6f9c5261.herokuapp.com/getcomplete`, {
		})
			.then((result) => {
				return result.json();
			})
			.then((result) => {
				dispatch(setTasks(result));
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function addTask(payload) {
	return () => {
		return new Promise((resolve, reject) => {
			fetch(`https://frozen-ridge-79795-c98a6f9c5261.herokuapp.com/addtodo`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			})
				.then((result) => {
					if (result.ok) {
						resolve(result.json());
					}
					return result.json();
				})
				.then((result) => {
					reject(result);
				})
				.catch((err) => {
					reject(err);
				});
		});
	};
}

export function editTask(payload, id) {
	return () => {
		return new Promise((resolve, reject) => {
			fetch(`https://frozen-ridge-79795-c98a6f9c5261.herokuapp.com/edittask/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			})
				.then((result) => {
					if (result.ok) {
						resolve(result.json());
					}
					return result.json();
				})
				.then((result) => {
					reject(result);
				})
				.catch((err) => {
					reject(err);
				});
		});
	};
}

export function editStatus(payload, id) {
	return () => {
		return new Promise((resolve, reject) => {
			fetch(`https://frozen-ridge-79795-c98a6f9c5261.herokuapp.com/editstatus/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			})
				.then((result) => {
					if (result.ok) {
						resolve(result.json());
					}
					return result.json();
				})
				.then((result) => {
					reject(result);
				})
				.catch((err) => {
					reject(err);
				});
		});
	};
}

export function deleteTask(id) {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			fetch(`https://frozen-ridge-79795-c98a6f9c5261.herokuapp.com/task/${id}`, {
				method: "DELETE",
			})
				.then((result) => {
					if (result.ok) {
						const updateTasks = getState().taskReducer.tasks.filter(
							(el) => el.id !== Number(id)
						);
						dispatch(setTasks(updateTasks));
						resolve(result.json());
					}
					return result.json();
				})
				.then((result) => {
					reject(result);
				})
				.catch((err) => {
					console.log(err);
					reject(err);
				});
		});
	};
}


