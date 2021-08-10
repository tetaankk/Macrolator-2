import express from "express";
const fetchRouter = express.Router();
import fetch from "node-fetch";

fetchRouter.get("/:toSearch", (req, res) => {
  const toSearch = req.params.toSearch;
  fetch(`https://fineli.fi/fineli/api/v1/foods?q=${toSearch}`)
    .then((res) => res.json())
    .then((data) => res.json(data));
});

export default fetchRouter;
