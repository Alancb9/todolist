import { useEffect, useState } from "react";
import axios from 'axios'
import Search from "./components/Search";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";

function App() {
  const [todos, setTodos] = useState([]);
  const [errors, setErrors] = useState();
  const [filteredTodos, setFilteredTodos] = useState([]);

  //useEffect to fetch data from the server
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/todos')
    .then(res => {
      console.log(res.data)
      setTodos(res.data)
    })
    .catch(err => {
      setErrors(err.message)
    })
  }, [])


// add todo function
  const addTodo = (data) => {
    setTodos( [ ...todos, data={...data, id:parseInt(todos[todos.length-1].id) + 1, completadas: false}] )
    axios.post("http://127.0.0.1:8000/todos" , data)
    .then(res => setTodos([...todos, res.data]))

    .catch(err => {
      setErrors(err.message)
    })
  }

  // delete function
  const delTodo = (id) => {
    setTodos(todos.filter( todo => todo.id != id ))
    const originalTodos = {...todos}
    //axios delete request
    axios.delete("http://127.0.0.1:8000/todos/" + id)
    .catch(err => {
      setErrors(err.message)
      setTodos(originalTodos)
    })  
  }


  // update function
  const updateTodo = (e, id, text, todo) => {
    e.preventDefault()
    // this line helps to get the current todo based on the ID called todoId in TodoList
    
    const updatedUser = { ...todo, tareas:text, completadas: true }
    setTodos(todos.map(t => t.id == todo.id ? updatedUser : t))
    const updatedTodo = {...todo, tareas:text}
    axios.patch("http://127.0.0.1:8000/todos/" + id, updateTodo)

  }

  const completeTodo = (e, id, todo) => {
    if(e.target.checked){     
      setTodos(todos.map(todo => todo.id == id ? { ...todo, completadas: true}: todo))
      const updatedTodo = {...todo, completadas:true}
      axios.patch("http://127.0.0.1:8000/todos/" + id, updatedTodo)
    }
    else
    {
      setTodos(todos.map(todo => todo.id == id ? { ...todo, completadas: false}: todo))
      const updatedTodo = {...todo, completadas:false}
      axios.patch("http://127.0.0.1:8000/todos/" + id, updatedTodo)
    }   
  }

  const filterTodo = (cat_value) => {
    if(cat_value === "completadas") {
      setTodos(todos.filter((todo) => todo.completadas === true));
    } else {
      // Si quieres filtrar por las no completadas
      // setTodos(todos.filter((todo) => todo.completadas === false));
      // Para restablecer la vista y mostrar todas
      setTodos(todos.filter((todo) => true));
    }
  }
  

  
  

  return (
    <div className="todo-app-container">
      <div className="todo-app-title">Todo List App</div>
      {errors && <p>{errors}</p>}
      <div id="enter">
        <Search addTodo = { addTodo } />    
      </div>
      <div id="filter">
        <Filter filter_todo = { filterTodo }/>
      </div>
      
      <TodoList todos = { todos } delTodo = { delTodo } update_todo = { updateTodo } complete_todo = { completeTodo } filter_todo = { filterTodo } />
    </div>
  );
}



export default App;
