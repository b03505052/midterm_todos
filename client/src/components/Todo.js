import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTodo } from "../actions";
import x from "./x.png";
import edit from "./edit.png";

class Todo extends Component {
  state = { editing: false, text: "" };

  componentDidMount = () => this.setState({ text: this.props.name });

  handleDeleteTodo = e => {
    e.stopPropagation();
    this.props.deleteTodo();
  };

  showEditForm = e => {
    e.stopPropagation();
    this.setState(prevState => ({ editing: !prevState.editing }));
  };

  onInputClick = e => {
    e.stopPropagation();
  };

  onInputChange = e => {
    this.setState({ text: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.setState(prevState => ({ editing: !prevState.editing }));
    this.props.updateTodo(this.props.id, this.state.text);
  };

  render() {
    const { name, done, toggleTodo } = this.props;

    return (
      <li className="todo-app__item">
        <div onClick={toggleTodo} className="todo-app__checkbox">
          <label
            style={{
              background: !done ? "rgba(99, 99, 99, 0.698)" : "#26ca299b"
            }}
          />
        </div>

        <h1
          className="todo-app__item-detail"
          style={{
            textDecoration: done ? "line-through" : "",
            opacity: done ? 0.5 : 1
          }}
        >
          <span style={{ display: this.state.editing ? "none" : "" }}>
            {name}
          </span>
          <form
            style={{ display: this.state.editing ? "inline" : "none" }}
            onSubmit={this.onFormSubmit}
          >
            <input
              type="text"
              value={this.state.text}
              onClick={this.onInputClick}
              onChange={this.onInputChange}
            />
          </form>
        </h1>
        <img
          src={edit}
          alt="edit"
          className="todo-app__item-e"
          onClick={this.showEditForm}
        />
        <img
          src={x}
          alt="X"
          className="todo-app__item-x"
          onClick={this.handleDeleteTodo}
        />
      </li>
    );
  }
}

export default connect(
  null,
  { updateTodo }
)(Todo);
