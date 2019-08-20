import React from "react";

const Pizza = props => {
  console.log("Props in pizza=", props);
  return (
    <tr>
      <td>{props.pizza.topping}</td>
      <td>{props.pizza.size}</td>
      <td>{props.pizza.vegetarian}</td>
      <td>
        <button
          type="button"
          onClick={props.handleOnEditClick}
          className="btn btn-primary"
          data-id={props.pizza.id}
        >
          Edit Pizza
        </button>
      </td>
    </tr>
  );
};

export default Pizza;
