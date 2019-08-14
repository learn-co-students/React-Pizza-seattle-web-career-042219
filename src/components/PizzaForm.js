import React from "react";

const PizzaForm = props => {
  console.log("props in Pizza Form:", props);
  const { selectedPizza } = props;
  return (
    <div className="form-row">
      <div className="col-5">
        <input
          type="text"
          className="form-control"
          placeholder="Pizza Topping"
          name="topping"
          onChange={props.handleFormOnChange}
          value={
            selectedPizza ? selectedPizza.topping : ""
            //Pizza Topping Should Go Here
            // null
            // props.pizza.topping
          }
        />
      </div>
      <div className="col">
        <select
          value={selectedPizza ? selectedPizza.size : ""}
          className="form-control"
          onChange={props.handleFormOnChange}
          name="size"
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
      <div className="col">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value="Vegetarian"
            name="vegetarian"
            onChange={props.handleFormOnChange}
            checked={selectedPizza ? selectedPizza.vegetarian : ""}
          />
          <label className="form-check-label">Vegetarian</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value="Not Vegetarian"
            name="vegetarian"
            onChange={props.handleFormOnChange}
            checked={selectedPizza ? !selectedPizza.vegetarian : ""}
          />
          <label className="form-check-label">Not Vegetarian</label>
        </div>
      </div>
      <div className="col">
        <button
          type="submit"
          className="btn btn-success"
          onClick={props.handleOnSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PizzaForm;
