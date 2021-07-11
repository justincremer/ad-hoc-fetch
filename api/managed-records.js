import fetch from "../util/fetch-fill";
import URI from "urijs";

window.path = "http://localhost:3000/records";

async function retrieve(base_url, query) {
  const res = await fetch(`${base_url}/${query}`);
  console.log(res);
}

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

async function test_retrieve() {
  await retrieve(
    "http://localhost:3000/records",
    query_builder(2, 2, ["red", "green"])
  );
}

(async () => {
  await test_retrieve();
})();

// test_retrieve();

export default retrieve;
