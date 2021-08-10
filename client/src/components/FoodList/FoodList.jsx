import React, { Component } from "react";
import portionServices from "../../services/portionServices";
import ReactDatePicker from "react-datepicker";
import "./foodlist.scss";
import Food from "./Food";

export default class FoodsList extends Component {
  constructor(props) {
    super(props);

    this.deleteFood = this.deleteFood.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.state = {
      foods: [],
      date: new Date(),
    };
  }

  componentDidMount() {
    const loggedUser = JSON.parse(localStorage.getItem("currentUser"));
    portionServices
      .getAll()
      .then((response) => {
        this.setState({
          foods: response.data.filter(
            (element) => element.email === loggedUser.email
          ),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteFood(id) {
    portionServices.remove(id);
    this.setState({
      foods: this.state.foods.filter((element) => element._id !== id),
    });
  }

  foodList() {
    var tempFoods;
    if (this.state.date) {
      tempFoods = this.state.foods.filter(
        (food) =>
          new Date(food.date).getFullYear() === this.state.date.getFullYear() &&
          new Date(food.date).getMonth() === this.state.date.getMonth() &&
          new Date(food.date).getDate() === this.state.date.getDate()
      );
    } else {
      tempFoods = this.state.foods;
    }
    return tempFoods.map((currentfood) => {
      return (
        <Food
          food={currentfood}
          deleteFood={this.deleteFood}
          key={currentfood._id}
        />
      );
    });
  }

  foodListTotals() {
    var tempFoods;
    if (this.state.date) {
      tempFoods = this.state.foods.filter(
        (food) =>
          new Date(food.date).getFullYear() === this.state.date.getFullYear() &&
          new Date(food.date).getMonth() === this.state.date.getMonth() &&
          new Date(food.date).getDate() === this.state.date.getDate()
      );
    } else {
      tempFoods = this.state.foods;
    }
    let totalAmount = 0;
    let totalEnergy = 0;
    let totalProtein = 0;
    let totalCarbohydrate = 0;
    let totalFat = 0;
    tempFoods.forEach((food) => {
      totalAmount += food.amount;
      totalEnergy += food.energy;
      totalProtein += food.protein;
      totalCarbohydrate += food.carbohydrate;
      totalFat += food.fat;
    });
    return (
      <tr>
        <td></td>
        <td>{totalAmount}</td>
        <td></td>
        <td>{Math.round(totalEnergy)}</td>
        <td>{Math.round(totalCarbohydrate)}</td>
        <td>{Math.round(totalProtein)}</td>
        <td>{Math.round(totalFat)}</td>
      </tr>
    );
  }

  handleDateChange(date) {
    this.setState({
      date: date,
    });
  }

  render() {
    return (
      <div className="foodList">
        <div className="foodListHeader">
          <h3>Kirjatut annokset</h3>
          <form>
            <ReactDatePicker
              selected={this.state.date}
              onChange={this.handleDateChange}
              dateFormat="dd/MM/yyyy"
              className="datepicker"
            />
            <button
              type="button"
              onClick={() => this.setState({ date: new Date() })}
            >
              Tänään
            </button>
            <button
              type="button"
              onClick={() =>
                this.setState({
                  date: new Date(new Date().setDate(new Date().getDate() - 1)),
                })
              }
            >
              Eilen
            </button>
            <button
              type="button"
              onClick={() =>
                this.setState({
                  date: "",
                })
              }
            >
              Kaikki
            </button>
          </form>
        </div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th style={{ width: "30%" }}>Ruoka</th>
              <th>Määrä (g)</th>
              <th>Pvm</th>
              <th>Energia (kCal)</th>
              <th>Hiilihydraatti (g)</th>
              <th>Proteiini (g)</th>
              <th>Rasva (g)</th>
              <th>Toiminnot</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>{this.foodList()}</tbody>
          <tfoot>
            <tr>
              <th>Yhteensä</th>
              <th>Määrä</th>
              <th></th>
              <th>Energia</th>
              <th>Hiilihydraatti</th>
              <th>Proteiini</th>
              <th>Rasva</th>
            </tr>
            {this.foodListTotals()}
          </tfoot>
        </table>
      </div>
    );
  }
}
