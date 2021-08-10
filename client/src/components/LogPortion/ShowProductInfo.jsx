import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import ShowPortionInfo from "./ShowPortionInfo";
import portionServices from "../../services/portionServices";

export default function ShowProductInfo(props) {
  const [inputAmount, setInputAmount] = useState("");
  const [date, setDate] = useState(new Date());

  const productName = props.selectedFood.name.fi;
  const productEnergy = props.selectedFood.energyKcal;
  const productCarbohydrate = props.selectedFood.carbohydrate;
  const productProtein = props.selectedFood.protein;
  const productFat = props.selectedFood.fat;

  const portionEnergy = productEnergy * (inputAmount / 100);
  const portionCarbohydrate = productCarbohydrate * (inputAmount / 100);
  const portionProtein = productProtein * (inputAmount / 100);
  const portionFat = productFat * (inputAmount / 100);

  const handleInputAmountChange = (event) => {
    setInputAmount(event.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loggedUserJSON = localStorage.getItem("currentUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      const userToken = user.token;
      portionServices.setToken(userToken);

      const foodObject = {
        email: user.email,
        food: productName,
        foodEnergy: productEnergy,
        foodCarbohydrate: productCarbohydrate,
        foodProtein: productProtein,
        foodFat: productFat,
        amount: inputAmount,
        date: date,
        get energy() {
          return this.foodEnergy * (this.amount / 100);
        },
        get carbohydrate() {
          return this.foodCarbohydrate * (this.amount / 100);
        },
        get protein() {
          return this.foodProtein * (this.amount / 100);
        },
        get fat() {
          return this.foodFat * (this.amount / 100);
        },
      };
      portionServices.create(foodObject);
      window.location = "/";
    }
  };

  return (
    <div>
      <div className="productInfo">
        <h2>{productName}</h2>
        <table className="productInfoTable">
          <tbody>
            <tr>
              <th>Energia</th>
              <td>{Math.round(productEnergy)}</td>
              <td className="tableUnit">kCal / 100g</td>
            </tr>
            <tr>
              <th>Hiilihydraatti</th>
              <td>{Math.round(productCarbohydrate)}</td>
              <td className="tableUnit">g / 100 g</td>
            </tr>
            <tr>
              <th>Proteiini</th>
              <td>{Math.round(productProtein)}</td>
              <td className="tableUnit">g / 100g</td>
            </tr>
            <tr>
              <th>Rasva</th>
              <td>{Math.round(productFat)}</td>
              <td className="tableUnit">g / 100g</td>
            </tr>
          </tbody>
        </table>
        <br />
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Määrä (g)"
            value={inputAmount}
            onChange={handleInputAmountChange}
            required
          />
          <ReactDatePicker
            selected={date}
            className="datepicker"
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            required
          />
          <button type="submit" className="amountButton">
            Tallenna
          </button>
        </form>
      </div>
      <div>
        {inputAmount && (
          <ShowPortionInfo
            portionEnergy={portionEnergy}
            portionCarbohydrate={portionCarbohydrate}
            portionProtein={portionProtein}
            portionFat={portionFat}
          />
        )}
      </div>
    </div>
  );
}
