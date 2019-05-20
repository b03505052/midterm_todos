import React, { Component } from "react";
import TodoList from "./TodoList";
import "./styles.css";
class App extends Component {
  render() {
    return (
      <div id="root" className="todo-app__root">
        <header className="todo-app__header">
          <h1 className="todo-app__title">todos</h1>
          <h2
            style={{
              fontSize: "0.75rem",
              color: "#9aa1a5",
              frontWeight: "300"
            }}
          >
            Web Programming Midterm - todolist with React, Redux & MongoDB
          </h2>
        </header>
        <section className="todo-app__main">
          <TodoList />
        </section>
      </div>
    );
  }
}

export default App;
