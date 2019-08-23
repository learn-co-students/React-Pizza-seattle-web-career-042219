import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import PizzaForm from "./components/PizzaForm";
import PizzaList from "./containers/PizzaList";

class App extends Component {
  state = {
    pizzas: [],
    selectedPizzaId: "",
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
    // console.log(selectedPizza[0]);
    this.setState({
      selectedPizzaId: selectedPizza[0].id,
      topping: selectedPizza[0].topping,
      size: selectedPizza[0].size,
      vegetarian: selectedPizza[0].vegetarian
    });
  };

  handleFormOnChange = e => {
    if (e.target.name === "vegetarian") {
      let newBool = true;
      if (e.target.value === "false" || e.target.value === false) {
        newBool = false;
      }
      this.setState({ vegetarian: newBool });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleOnSubmit = e => {
    // if selectedPizzaId, then it is a PATCH, else post
    e.preventDefault();
    if (this.state.selectedPizzaId) {
      this.handlePatch();
    } else {
      this.handlePost();
    }
  };

  handlePatch = () => {
    fetch(`http://localhost:3000/pizzas/${this.state.selectedPizzaId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        id: this.state.selectedPizzaId ? this.state.selectedPizzaId : null,
        topping: this.state.topping,
        size: this.state.size,
        vegetarian: this.state.vegetarian
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log("res in the patch call", res);
        return res;
      })
      .then(res => this.pessRerender(res))
      .catch(err => console.log(err));
  };

  handlePost = () => {
    fetch("http://localhost:3000/pizzas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        id: this.state.selectedPizzaId ? this.state.selectedPizzaId : null,
        topping: this.state.topping,
        size: this.state.size,
        vegetarian: this.state.vegetarian
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log("res in the post call", res);
        return res;
      })
      .then(res => this.pessRerender(res))
      .catch(err => console.log(err));
  };

  pessRerender = res => {
      // true means it is a patch, so map and update the previous pizza. false is a post, so append the new pizza
      this.setState(
        prevState => ({
          topping: "",
          size: "",
          vegetarian: "",
          selectedPizzaId: "",
          pizzas: this.state.selectedPizzaId ? [...prevState.pizzas.map(pizza=> pizza.id === res.id ? pizza = res : pizza)] : [...prevState.pizzas, res]
        })
      );
    } 

  render() {
    return (
      <Fragment>
        <Header />
        <PizzaForm
          topping={this.state.topping}
          size={this.state.size}
          vegetarian={this.state.vegetarian}
          handleFormOnChange={this.handleFormOnChange}
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
