import TodoItem from './TodoItem';

function TodoList({ todos, displayedTodos, toggleCompletion, deleteTodo }) {
	return (
		<ul>
			{todos.slice(0, displayedTodos).map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					toggleCompletion={toggleCompletion}
					deleteTodo={deleteTodo}
				/>
			))}
		</ul>
	);
}

export default TodoList;
