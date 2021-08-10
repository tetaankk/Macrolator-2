import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Food(props) {
  const months = [
    "Tammi",
    "Helmi",
    "Maalis",
    "Huhti",
    "Touko",
    "Kesä",
    "Heinä",
    "Elo",
    "Syys",
    "Loka",
    "Marras",
    "Joulu",
  ];
  const days = ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"];
  return (
    <tr>
      <td rowSpan="1" style={{ overflow: "hidden", maxWidth: "30%" }}>
        {props.food.food}
      </td>
      <td>{props.food.amount}</td>
      <td>
        {days[new Date(props.food.date).getDay()] +
          " " +
          new Date(props.food.date).getDate() +
          ". " +
          months[new Date(props.food.date).getMonth()] +
          " " +
          new Date(props.food.date).getFullYear()}
      </td>
      <td>{Math.round(props.food.energy)}</td>
      <td>{Math.round(props.food.carbohydrate)}</td>
      <td>{Math.round(props.food.protein)}</td>
      <td>{Math.round(props.food.fat)}</td>
      <td>
        <Link to={"/edit/" + props.food._id}>
          <EditIcon style={{ color: "#242731" }} />
        </Link>
        <button
          style={{
            color: "#242731",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => {
            props.deleteFood(props.food._id);
          }}
        >
          <DeleteIcon />
        </button>
      </td>
    </tr>
  );
}
