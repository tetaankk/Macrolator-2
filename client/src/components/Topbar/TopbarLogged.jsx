import { Link } from "react-router-dom";
import "./topbar.scss";

export default function TopbarLogged() {
  return (
    <div className="topBar">
      <ul>
        <li className="navbar-item">
          <p className="navbar-header">MACROLATOR</p>
        </li>
        <li className="navbar-item">
          <Link to="/" className="nav-link">
            HISTORIA
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/create" className="nav-link">
            UUSI ANNOS
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            to=""
            className="nav-link nav-link-small"
            onClick={() => {
              localStorage.clear();
              window.location = "/";
            }}
          >
            KIRJAUDU ULOS
          </Link>
        </li>
      </ul>
    </div>
  );
}
