import React from "react";

export default function ShowPortionInfo(props) {
  return (
    <div className="productInfo">
      <br />
      <br />
      <table className="productInfoTable">
        <caption>Annoksessasi</caption>
        <tbody>
          <tr>
            <th>Energia</th>
            <td>{Math.round(props.portionEnergy)}</td>
            <td className="tableUnit">kCal</td>
          </tr>
          <tr>
            <th>Hiilihydraatti</th>
            <td>{Math.round(props.portionCarbohydrate)}</td>
            <td className="tableUnit">g</td>
          </tr>
          <tr>
            <th>Proteiini</th>
            <td>{Math.round(props.portionProtein)}</td>
            <td className="tableUnit">g</td>
          </tr>
          <tr>
            <th>Rasva</th>
            <td>{Math.round(props.portionFat)}</td>
            <td className="tableUnit">g</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
