import { Link } from "react-router-dom";
import "./topbar.scss";
import userServices from "../../services/userServices";

export default function TopbarNotLogged() {
  const testUserLogin = () => {
    const user = {
      email: "testi@testi",
      password: "testi",
    };

    userServices.login(user).then((res) => {
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      window.location = "/";
    });
  };

  return (
    <div className="topBar">
      <form>
        <Link to="/login" className="link">
          <span>Kirjaudu sisään</span>
        </Link>
        tai
        <Link to="/register" className="link">
          <span>Luo käyttäjä</span>
        </Link>
        tai
        <Link to="" className="link" onClick={testUserLogin}>
          <span>Kokeile palvelua testikäyttäjällä!</span>
        </Link>
      </form>
    </div>
  );
}
