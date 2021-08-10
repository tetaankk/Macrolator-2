import React, { useState } from "react";
import ShowProductInfo from "./ShowProductInfo";
import "./logportion.scss";
import fetchServices from "../../services/fetchServices";

export default function Search() {
  const [toSearch, setToSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleToSearchChange = (event) => {
    setToSearch(event.target.value);
  };

  const setSelectedFoodHandler = (food) => {
    setSelectedFood(food);
  };

  const fetchResults = (event) => {
    event.preventDefault();
    setSearchResults([]);
    setIsLoading(true);
    fetchServices.get(toSearch).then((response) => {
      setSearchResults(response.data);
      setIsLoading(false);
    });
  };

  return (
    <div className="logPortionView">
      <div className="leftContainer">
        <form onSubmit={fetchResults}>
          <input
            value={toSearch}
            onChange={handleToSearchChange}
            placeholder='Hae ruokaa, esim. "omena"...'
            style={{ width: "50%" }}
            required
          />
          <button type="submit">Hae</button>
        </form>
        <ul className="searchResults">
          {isLoading && <p>Loading...</p>}
          {searchResults &&
            searchResults.map((food) => (
              <li
                className="searchResultsItem"
                key={food.id}
                onClick={() => setSelectedFoodHandler(food)}
              >
                {food.name.fi}
              </li>
            ))}
        </ul>
      </div>
      <div className="rightContainer">
        <div>
          {selectedFood && <ShowProductInfo selectedFood={selectedFood} />}
        </div>
      </div>
    </div>
  );
}
