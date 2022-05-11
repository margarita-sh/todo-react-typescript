import React, { useState } from "react";

import "./Todo.css";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
function TodoItem(props: { todo: Todo, handleChange: any  }) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={props.todo.completed}
        onChange={() => props.handleChange(props.todo.id)}
      />
      <p className={props.todo.completed ? "completedStyle" : "todo"}>
        {props.todo.text}
      </p>
    </div>
  );
}

export default TodoItem;
