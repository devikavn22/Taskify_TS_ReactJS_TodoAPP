
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { addTodo, toggleTodo, deleteTodo, updateTodo } from '../../redux/todoSlice';

const Todo = () => {
    const [todoText, setTodoText] = useState('');
    const [editMode, setEditMode] = useState<number | null>(null); // to keep track of the todo being edited
    const [editText, setEditText] = useState('');
    const todos = useSelector((state: RootState) => state.todos.todos);
    const dispatch = useDispatch<AppDispatch>();

    const handleAddTodo = () => {
        if (todoText.trim()) {
            dispatch(addTodo(todoText));
            setTodoText('');
        }
    };

    const handleEditTodo = (id: number, title: string) => {
        setEditMode(id);
        setEditText(title);
    };

    const handleUpdateTodo = (id: number) => {
        if (editText.trim()) {
            dispatch(updateTodo({ id, title: editText }));
            setEditMode(null); 
            setEditText(''); 
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                placeholder="Enter todo"
            />
            <button onClick={handleAddTodo}>Add Todo</button>
            <ul>
                {Array.isArray(todos) && todos.length > 0 ? (
                    todos.map((todo) => (
                        <li key={todo.id}>
                        {editMode === todo.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <button onClick={() => handleUpdateTodo(todo.id)}>Save</button>
                                <button onClick={() => setEditMode(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <span
                                    style={{
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                    }}
                                    onClick={() => dispatch(toggleTodo(todo.id))}
                                >
                                    {todo.title}
                                </span>
                                <button onClick={() => handleEditTodo(todo.id, todo.title)}>
                                    Edit
                                </button>
                                <button onClick={() => dispatch(deleteTodo(todo.id))}>
                                    Delete
                                </button>
                            </div>
                        )}
                    </li>
                    ))
                ) : (
                    <p>No todos available</p>
                )}
            </ul>
        </div>
    );
};

export default Todo;
