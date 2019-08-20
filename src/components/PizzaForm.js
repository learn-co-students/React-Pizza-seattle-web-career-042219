import React from "react";

const PizzaForm = props => {
  // console.log("props in Pizza Form:", props);
  return (
    <div className="form-row">
      <div className="col-5">
        <input
          type="text"
          className="form-control"
          placeholder="Pizza Topping"
          name="topping"
          onChange={props.handleFormOnChange}
          value={props.topping}
        />
      </div>
      <div className="col">
        <select
          value={props.size}
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
            value="true"
            name="vegetarian"
            onChange={props.handleFormOnChange}
            checked={props.vegetarian === true}
          />
          <label className="form-check-label">Vegetarian</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value="false"
            name="vegetarian"
            onChange={props.handleFormOnChange}
            checked={props.vegetarian === false}
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
