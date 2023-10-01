import Swal from "sweetalert2";

function alertSuccess(message) {
	const data = {
		title: "Yeay!",
		text: message,
		icon: "success",
	};

	Swal.fire(data);
}

function alertError(message) {
	const data = {
		title: "Oops!",
		text: message,
		icon: "error",
	};

	Swal.fire(data);
}

export { alertSuccess, alertError };