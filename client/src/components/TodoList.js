import React, { Component } from "react";
import { connect } from "react-redux";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { fetchTodos, toggleTodo, deleteTodo, toggleTab } from "../actions";
import { TABS } from "../actions/types";

class TodoList extends Component {
  componentDidMount = async () => {
    this.props.fetchTodos();
    try {
      setInterval(async () => {
        this.props.fetchTodos();
      }, 10000);
    } catch (e) {
      console.log(e);
    }
  };

  removeComplete = () => {
    this.props.todos.forEach(({ done, _id }) => {
      if (done) this.props.deleteTodo(_id);
    });
  };

  removeAll = () => {
    this.props.todos.forEach(({ done, _id }) => {
      this.props.deleteTodo(_id);
    });
  };

  renderTodos = todos => {
    return todos.map(todo => {
      return (
        <Todo
          key={todo._id}
          id={todo._id}
          name={todo.name}
          done={todo.done}
          toggleTodo={() => this.props.toggleTodo(todo._id)}
          deleteTodo={() => this.props.deleteTodo(todo._id)}
        />
      );
    });
  };

  renderTabs = currTab => {
    return TABS.map(tab => {
      return (
        <button
          key={tab}
          style={{
            color: tab === currTab ? "#fff" : "#6c6777",
            background: tab === currTab ? "#6c6777" : "#fff"
          }}
          onClick={() => this.props.toggleTab(tab)}
        >
          {tab}
        </button>
      );
    });
  };

  render() {
    let todos = [];

    if (this.props.currTab === "All") {
      todos = this.props.todos;
    } else if (this.props.currTab === "Active") {
      todos = this.props.todos.filter(todo => !todo.done);
    } else if (this.props.currTab === "Completed") {
      todos = this.props.todos.filter(todo => todo.done);
    }

    return (
      <article>
        <TodoForm />

        <ul className="todo-app__list">{this.renderTodos(todos)}</ul>
        <footer className="todo-app__footer" id="todo-footer">
          <div className="todo-app__total">
            todos left: {this.props.todos.filter(todo => !todo.done).length}
          </div>
          <ul className="todo-app__view-buttons">
            {this.props.todos.length
              ? this.renderTabs(this.props.currTab)
              : null}
          </ul>
          <ul className="todo-app__clean">
            {this.props.todos.some(todo => todo.done) ? (
              <button onClick={this.removeComplete}>Clear Completed</button>
            ) : null}
            {this.props.todos.length ? (
              <button onClick={this.removeAll}>Clear All</button>
            ) : null}
          </ul>
        </footer>
      </article>
    );
  }
}

const mapStateToProps = ({ todos, currTab }) => {
  return { todos, currTab };
};

export default connect(
  mapStateToProps,
  { fetchTodos, toggleTodo, deleteTodo, toggleTab }
)(TodoList);
