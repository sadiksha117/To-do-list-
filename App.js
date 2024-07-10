import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from './Todo';
import { db } from './firebase';

const style = {
  container: {
    maxWidth: '1500px',
    margin: 'auto',
    width: '600px',
    marginTop: '50px',
    padding: '50px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  background: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #6a97ad, #73a5bd, #83bbd6)', // Gradient from dark aqua blue to lighter aqua blue
  },
  heading: {
    fontSize: '36px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007bff',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  input: {
    flex: '1',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginRight: '10px',
    boxSizing: 'border-box',
    backgroundColor: '#fff', // White background inside the input field
  },
  addButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#6f42c1', // Purple background for the add button
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  count: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#555',
    marginTop: '20px',
  },
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault();
    if (input.trim() === '') {
      alert('Please enter a valid todo');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    });
    setInput('');
  };

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // Update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <div style={style.background}>
      <div style={style.container}>
        <h1 style={style.heading}>Todo List</h1>
        <form onSubmit={createTodo} style={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={style.input}
            type='text'
            placeholder='Add a new todo'
          />
          <button style={style.addButton}>
            <AiOutlinePlus size={20} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        <p style={style.count}>{`Total todos: ${todos.length}`}</p>
      </div>
    </div>
  );
}

export default App;
