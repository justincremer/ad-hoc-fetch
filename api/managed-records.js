import fetch from "../util/fetch-fill";
import URI from "urijs";

window.path = "http://localhost:3000/records";

async function retrieve({ page, colors }) {
	let res = await get_records({page, colors});
	console.log(res);
}

async function get_records({ page, colors }) {
	const allowed_colors = ["red", "brown", "blue", "yellow", "green"];
	let valid = true;
	
	page = page ? page * 10 : 1;
	if (colors) {
		colors.foreach(c => if (!allowed_colors.contains(c)) {
			valid = false;
			break;
		});

		if (!valid) {
			// handle invalid request
			return;
		}

		const query = query_builder(10, page, colors);
		return await fetch(`${window.path}?${query}`);
	}

	const query = query_builder(10, page, allowed_colors);
	const url = `${window.path}?${query}`;
	return await fetch(url);
}

const query_builder = (limit, offset, colors) =>
	  ((limit ? `limit=${limit}&` : "") +
	   (offset ? `offset=${offset}&` : "") +
	   (colors ? colors.reduce((acc, i) => acc + `color[]=${i}&`, "") : "")).slice(0, -1); 

export default retrieve;
