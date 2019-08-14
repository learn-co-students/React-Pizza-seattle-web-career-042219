import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import PizzaForm from "./components/PizzaForm";
import PizzaList from "./containers/PizzaList";

class App extends Component {
  state = {
    pizzas: [],
    selectedPizza: [],
    topping: "",
    size: "",
    vegetarian: ""
  };

  componentDidMount() {
    fetch("http://localhost:3000/pizzas")
      .then(res => res.json())
      .then(res => this.setState({ pizzas: res }))
      .catch(err => console.log(err));
  }

  handleOnEditClick = e => {
    e.preventDefault();
    const selectedPizza = this.state.pizzas.filter(
      pizza => pizza.id === parseInt(e.target.dataset.id, 10)
    );
    // this.setState({
    //   selectedPizza: this.state.pizzas.filter(
    //     pizza => {
    //       pizza.id === parseInt(e.target.dataset.id, 10);
    //     },
    //     () => console.log(this.state.selectedPizza)
    //   )
    // });
    console.log(selectedPizza[0]);
    this.setState(
      {
        selectedPizza: selectedPizza,
        topping: selectedPizza[0].topping,
        size: selectedPizza[0].size,
        vegetarian: selectedPizza[0].vegetarian
      },
      () => console.log(this.state.vegetarian)
    );
  };

  // handleFormOnChange = e => {
  //   console.log("this.state.selectedPizza[0]=", this.state.selectedPizza[0]);
  //   const newSelectedPizza = [...this.state.selectedPizza][0];
  //   console.log("newSelectedPizza=", newSelectedPizza);
  //   newSelectedPizza[e.target.name] = e.target.value;
  //   console.log("newSelectedPizza=", newSelectedPizza);
  //   this.setState({ selectedPizza: newSelectedPizza }, () =>
  //     console.log("this.state.selectedPizza=", this.state.selectedPizza)
  //   );
  // };

  handleFormOnChange = e => {
    console.log("this.state.selectedPizza[0]=", this.state.selectedPizza[0]);
    console.log(e.target.name);
    let newBool = true;
    if (e.target.name === "vegetarian") {
      if (e.target.value === "false" || e.target.value === false) {
        newBool = false;
      } else {
      }
      this.setState({ vegetarian: newBool });
    } else {
      this.setState(
        {
          [e.target.name]: e.target.value
        },
        () => console.log(this.state)
      );
    }
  };

  handleOnSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:3000/pizzas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        id: this.state.selectedPizza.id ? this.state.selectedPizza.id : null,
        topping: this.state.topping,
        size: this.state.size,
        vegetarian: this.state.vegetarian
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return res;
      })
      .then(res => this.pessRerender(res))
      .catch(err => console.log(err));
  };

  pessRerender = res => {
    this.setState(
      prevState => ({
        topping: "",
        size: "",
        vegetarian: "",
        selectedPizza: "",
        pizzas: [...prevState.pizzas, res]
      }),
      () => console.log(this.state)
    );
  };

  render() {
    return (
      <Fragment>
        <Header />
        <PizzaForm
          selectedPizza={this.state.selectedPizza[0]}
          topping={this.state.topping}
          size={this.state.size}
          vegetarian={this.state.vegetarian}
          handleFormOnChange={this.handleFormOnChange}
          handleRadioChange={this.handleRadioChange}
          handleOnSubmit={this.handleOnSubmit}
        />
        <PizzaList
          pizzas={this.state.pizzas}
          handleOnEditClick={this.handleOnEditClick}
        />
      </Fragment>
    );
  }
}

export default App;
