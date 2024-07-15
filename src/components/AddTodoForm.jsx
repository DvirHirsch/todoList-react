function AddTodoForm({ newTodo, setNewTodo, addTodo }) {
	return (
		<div>
			<input
				type="text"
				value={newTodo}
				onChange={(e) => setNewTodo(e.target.value)}
				placeholder="Add new todo"
			/>
			<button onClick={addTodo}>Add Todo</button>
		</div>
	);
}

export default AddTodoForm;
