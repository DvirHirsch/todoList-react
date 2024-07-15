function TodoItem({ todo, toggleCompletion, deleteTodo }) {
	return (
		<li className={todo.completed ? 'completed' : ''}>
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={() => toggleCompletion(todo.id)}
			/>
			<span>{todo.title}</span>
			<button onClick={() => deleteTodo(todo.id)}>Delete</button>
		</li>
	);
}

export default TodoItem;
