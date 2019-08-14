import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import PizzaForm from "./components/PizzaForm";
import PizzaList from "./containers/PizzaList";

class App extends Component {
  state = {
    pizzas: [],
    selectedPizza: []
  };

  componentDidMount() {
    fetch("http://localhost:3000/pizzas")
      .then(res => res.json())
      // .then(res => {
      //   console.log(res);
      //   return res;
      // })
      .then(res => this.setState({ pizzas: res }))
      .catch(err => console.log(err));
  }

  handleOnClick = e => {
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
    this.setState({ selectedPizza: selectedPizza }, () =>
      console.log(this.state.selectedPizza)
    );
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
        id: this.state.selectedPizza.id,
        topping: this.state.selectedPizza.topping,
        size: this.state.selectedPizza.size,
        vegetarian: this.state.selectedPizza.vegetarian
      })
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  };

  handleFormOnChange = e => {
    console.log("handleFormOnChange fires");
    console.log("this.state.selectedPizza[0]=", this.state.selectedPizza[0]);
    const newSelectedPizza = [...this.state.selectedPizza][0];
    console.log("newSelectedPizza=", newSelectedPizza);
    newSelectedPizza[e.target.name] = e.target.value;
    console.log("newSelectedPizza=", newSelectedPizza);
    this.setState({ selectedPizza: newSelectedPizza }, () =>
      console.log(this.state.selectedPizza)
    );
  };

  render() {
    return (
      <Fragment>
        <Header />
        <PizzaForm
          selectedPizza={this.state.selectedPizza[0]}
          handleFormOnChange={this.handleFormOnChange}
        />
        <PizzaList
          pizzas={this.state.pizzas}
          handleOnClick={this.handleOnClick}
        />
      </Fragment>
    );
  }
}

export default App;
