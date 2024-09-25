import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tasks = ({ token }) => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:5000/tasks', {
            headers: { Authorization: token }
        });
        setTasks(response.data);
    };

    const handleEdit = (task) => {
        setEditId(task.id);
        setTitle(task.title);
        setDescription(task.description);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        await axios.put(`http://localhost:5000/tasks/${editId}`, { title, description }, {
            headers: { Authorization: token }
        });
        fetchTasks();
        resetForm();
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/tasks/${id}`, {
            headers: { Authorization: token }
        });
        fetchTasks();
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setEditId(null);
    };

    return (
        <div>
            <h2>Manage Tasks</h2>
            <form onSubmit={editId ? handleUpdate : (e) => {
                e.preventDefault();
                // Add your create task functionality here
            }}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button type="submit">{editId ? 'Update Task' : 'Add Task'}</button>
                <button type="button" onClick={resetForm}>Cancel</button>
            </form>

            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                        <button onClick={() => handleEdit(task)}>Edit</button>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;
