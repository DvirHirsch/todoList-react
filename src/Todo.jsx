import { useEffect, useState } from 'react';
import axios from 'axios';

function Todo() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');
	const [limit, setLimit] = useState(10); // Initial limit of todos to fetch
	const [displayedTodos, setDisplayedTodos] = useState(10); // Initial number of todos displayed

	useEffect(() => {
		axios
			.get('https://jsonplaceholder.typicode.com/todos')
			.then((res) => setTodos(res.data))
			.catch((err) => err.message);
	}, [limit]);

	const loadMoreTodos = () => {
		setDisplayedTodos(displayedTodos + 10); // Increase todos by 10
	};

	const addTodo = () => {
		if (newTodo.trim() === '') return;
		const newTodoItem = { title: newTodo, completed: false };

		axios
			.post('https://jsonplaceholder.typicode.com/todos', newTodoItem)
			.then((res) => {
				setTodos([...todos, res.data]);
				setNewTodo('');
			})
			.catch((err) => err.meesage);
	};

	const deleteTodo = (id) => {
		axios
			.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
			.then(() => {
				const updatedTodos = todos.filter((todo) => todo.id !== id);
				setTodos(updatedTodos);
			})
			.catch((err) => err.message);
	};

	return (
		<div>
			<h1>Todo List</h1>
			<input
				type="text"
				value={newTodo}
				onChange={(e) => setNewTodo(e.target.value)}
				placeholder="Add new todo"
			/>
			<button onClick={addTodo}>Add Todo</button>
			<ul>
				{todos.slice(0, displayedTodos).map((todo) => (
					<li key={todo.id}>
						<input
							type="checkbox"
							checked={todo.completed}
							onChange={() => toggleCompletion(todo.id, !todo.completed)}
						/>
						<span
							style={{
								textDecoration: todo.completed ? 'line-through' : 'none',
							}}
						>
							{todo.title}
						</span>
						<button onClick={() => deleteTodo(todo.id)}>Delete</button>
					</li>
				))}
			</ul>
			{displayedTodos < todos.length && (
				<button onClick={loadMoreTodos}>Load More</button>
			)}
		</div>
	);
}

export default Todo;
