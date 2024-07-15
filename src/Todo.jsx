import React, { useState, useEffect } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import './App.css';
AddTodoForm;

function Todo() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');
	const [displayedTodos, setDisplayedTodos] = useState(5);

	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem('todos'));
		if (storedTodos) {
			setTodos(storedTodos);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const addTodo = () => {
		if (newTodo.trim() === '') return;
		const newTodoItem = { id: Date.now(), title: newTodo, completed: false };
		setTodos([...todos, newTodoItem]);
		setNewTodo('');
	};

	const deleteTodo = (id) => {
		const updatedTodos = todos.filter((todo) => todo.id !== id);
		setTodos(updatedTodos);
	};

	const toggleCompletion = (id) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(updatedTodos);
	};

	const loadMoreTodos = () => {
		setDisplayedTodos(displayedTodos + 5);
	};

	return (
		<div className="container">
			<h1>Todo List</h1>
			<AddTodoForm
				newTodo={newTodo}
				setNewTodo={setNewTodo}
				addTodo={addTodo}
			/>
			<div className="todo-list">
				<TodoList
					todos={todos}
					displayedTodos={displayedTodos}
					toggleCompletion={toggleCompletion}
					deleteTodo={deleteTodo}
				/>
			</div>
			{displayedTodos < todos.length && (
				<button onClick={loadMoreTodos}>Load More</button>
			)}
		</div>
	);
}

export default Todo;
