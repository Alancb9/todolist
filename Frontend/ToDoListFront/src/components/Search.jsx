import React from 'react'
import { useForm } from 'react-hook-form'


const Search = ({ addTodo }) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

  return (
   
    <div className="todo-search">

          <form action="" onSubmit={handleSubmit((data) => {addTodo(data);
          //addTodo({ tareas: data.tareas, completadas: false });
          reset()
          })}>
            <input type="text" id="task" placeholder="Enter Todo" { ...register("tareas", { required: true}, ) } />
            
            <button className='agregar' >Add</button>
          </form>
          {errors.task?.type == "required"  && <small>This field is required</small>}
          
      </div>
        
  )
}

export default Search