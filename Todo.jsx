import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

const style = {
  li: `flex justify-between bg-slate-200 p-6 my-2 capitalize`, // Increased padding here
  liComplete: `flex justify-between bg-slate-400 p-6 my-2 capitalize`, // Increased padding here
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
  deleteButton: `cursor-pointer flex items-center justify-center bg-red-500 text-white rounded-full h-8 w-8`,
};

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li className={todo.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input onChange={() => toggleComplete(todo)} type='checkbox' checked={todo.completed ? 'checked' : ''} />
        <p onClick={() => toggleComplete(todo)} className={todo.completed ? style.textComplete : style.text}>
          {todo.text}
        </p>
      </div>
      <button onClick={() => deleteTodo(todo.id)} className={style.deleteButton}>
        <FaRegTrashAlt />
      </button>
    </li>
  );
};

export default Todo;
