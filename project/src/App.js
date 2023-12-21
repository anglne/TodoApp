import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import axios from "axios";

import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("/api/todos/");
        setTodos(response.data);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Response error:", error.response.data);
          console.error("Status code:", error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Request error:", error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Error:", error.message);
        }
        alert("Something went wrong");
      }
    };

    fetchTodos();
  }, []);

  return (
    <div>
      <Navbar bg="light" style={{ marginBottom: "20px" }}>
        <Container>
          <Navbar.Brand href="#">Todo App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <TodoForm todos={todos} setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
      </Container>
    </div>
  );
}

export default App;
