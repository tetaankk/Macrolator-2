import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import portionServices from "../../services/portionServices";
import "./foodlist.scss";

export default class EditFood extends Component {
  constructor(props) {
    super(props);

    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      food: "",
      foodEnergy: 0,
      foodCarbohydrate: 0,
      foodProtein: 0,
      foodFat: 0,
      amount: 0,
      date: null,
      energy: 0,
      carbohydrate: 0,
      protein: 0,
      fat: 0,
    };
  }

  componentDidMount() {
    portionServices
      .get(this.props.match.params.id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          email: response.data.email,
          food: response.data.food,
          foodEnergy: response.data.foodEnergy,
          foodCarbohydrate: response.data.foodCarbohydrate,
          foodProtein: response.data.foodProtein,
          foodFat: response.data.foodFat,
          amount: response.data.amount,
          date: new Date(response.data.date),
          energy: response.data.energy,
          carbohydrate: response.data.energy,
          protein: response.data.protein,
          fat: response.data.fat,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const food = {
      email: this.state.email,
      food: this.state.food,
      foodEnergy: this.state.foodEnergy,
      foodCarbohydrate: this.state.foodCarbohydrate,
      foodProtein: this.state.foodProtein,
      foodFat: this.state.foodFat,
      amount: this.state.amount,
      date: this.state.date,
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
    portionServices.update(this.props.match.params.id, food);
    window.location = "/";
  }

  render() {
    return (
      <div className="foodList">
        <form onSubmit={this.onSubmit}>
          <h3>Muokkaa annosta</h3>
          <label>Määrä (g): </label>
          <input
            type="text"
            value={this.state.amount}
            onChange={this.onChangeAmount}
          />
          <div>
            <label>Päivämäärä: </label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
              dateFormat="dd/MM/yyyy"
              className="datepicker"
            />
          </div>
          <button type="submit">Tallenna</button>
        </form>
      </div>
    );
  }
}
