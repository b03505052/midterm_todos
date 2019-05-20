import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions";

class TodoForm extends Component {
  state = { text: "" };

  handleInput = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addTodo(this.state.text);
    this.setState({ text: "" });
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <input
          className="todo-app__input"
          placeholder="What needs to be done?"
          name="text"
          value={this.state.text}
          onChange={this.handleInput}
        />
      </form>
    );
  }
}

export default connect(
  null,
  { addTodo }
)(TodoForm);
