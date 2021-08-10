import React, { Component } from "react";
import "../../common.scss";
import userServices from "../../services/userServices";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
      message: "",
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    userServices
      .login(user)
      .then((response) => {
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        window.location = "/";
      })
      .catch((err) => this.setState({ message: err }));

    this.setState({
      email: "",
      password: "",
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h3 style={{ fontSize: "20px" }}>Kirjaudu sisään</h3>
        {this.state.message && <h2>{this.state.message}</h2>}
        <label>Sähköpostiosoite </label>
        <input
          type="email"
          required
          placeholder="Sähköpostiosoite..."
          value={this.state.email}
          onChange={this.onChangeEmail}
        />
        <label>Salasana </label>
        <input
          type="password"
          required
          placeholder="Salasana..."
          value={this.state.password}
          onChange={this.onChangePassword}
        />
        <button type="submit">Kirjaudu sisään</button>
      </form>
    );
  }
}
