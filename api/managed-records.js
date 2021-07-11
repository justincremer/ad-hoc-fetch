import fetch from "../util/fetch-fill";
import URI from "urijs";

window.path = "http://localhost:3000/records";

async function retrieve({ page, colors }) {
  const default_colors = ["red", "brown", "blue", "yellow", "green"];
  const query = query_builder(10, page * 10, colors ?? default_colors);
  const res = await fetch_records(query);

  console.log(JSON.parse(res));
}

const fetch_records = async (query) => {
  const base_url = "http://localhost:3000/records";
  const url = `${base_url}?${query}`;
  const res = await fetch(url);
  return res;
};

const query_builder = (limit, offset, colors) =>
  (
    (limit ? `limit=${limit}&` : "") +
    (offset ? `offset=${offset}&` : "") +
    (colors ? colors.reduce((acc, i) => acc + `color[]=${i}&`, "") : "")
  ).slice(0, -1);

function test_query_builder() {
  console.log(query_builder(2, 2, ["red", "green"]));
  console.log(query_builder(false, 2, ["red", "green"]));
  console.log(query_builder(false, false, ["red"]));
  console.log(query_builder(false, 2, []));
  console.log(query_builder(2, false, false));
}

async function test_fetch_records() {
  await retrieve(
    "http://localhost:3000/records",
    query_builder(2, 2, ["red", "green"])
  );
}

export default retrieve;
