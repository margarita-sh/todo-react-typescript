import React, { useState, useEffect } from "react";
import "./App.css";
import TodoItem from "./components/todo/Todo";
import todosData from "./assets/TodoData";

import { Button, Modal } from "react-bootstrap";

function App() {
  const [todos, setTodos] = useState(todosData);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (id: number) => {
    const newTodos = todos.filter((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: (todo.completed = !todo.completed),
        };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
  };

  function openEditor(e: any) {
    setShowModal(true);
  }

  let newTodo: { text: any; completed: boolean; id: number };

  function createNewTodo(e: any) {
    newTodo = {
      text: e.target.value,
      completed: false,
      id: 6,
    };

    // setTodos(todos=>({...todos, todo}));
  }

  function handleClose() {
    setShowModal(false);
  }

  function saveShanges() {
    setTodos([...todos, newTodo]);
    localStorage.setItem("todos", JSON.stringify(todos));
    setShowModal(false);
  }

  useEffect(() => {
    const saveTodos = localStorage.getItem("todos");
    if (saveTodos) {
      setTodos(JSON.parse(saveTodos));
    }
  },[]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos]);

//   useEffect(() => {
//     const saveTodos = localStorage.getItem("todos");
//   if (saveTodos) {
//     setTodos(JSON.parse(saveTodos));
//   } else {
//     localStorage.setItem("todos", JSON.stringify(todos));
//   }
// }, []);

  return (
    <div className="container">
      <div className="button">
        <Button variant="outline-primary" onClick={openEditor}>
          create todo
        </Button>
      </div>
      <div className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={"todo" + todo.id}
            todo={todo}
            handleChange={(id: number) => handleChange(id)}
          />
        ))}
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter new Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input className="input" type="text" onChange={createNewTodo} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveShanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
