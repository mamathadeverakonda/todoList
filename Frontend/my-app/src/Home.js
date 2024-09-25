import React from 'react';
import { v4 as uuidv4 } from 'uuid'; 


class  Home extends React.Component{
    state = {
        todoList: [],
        inputValue: '',
        error: null,
    };

    componentDidMount() {
        const storedList = localStorage.getItem('todoList');
        if (storedList) {
            this.setState({ todoList: JSON.parse(storedList) });
        }
    }

    handleInputChange = (event) => {
        this.setState({ inputValue: event.target.value });
    };

    addTodoItem = () => {
        const { inputValue, todoList } = this.state;
        if (!inputValue.trim()) {
            return this.setState({ error: "Enter valid text" });
        }

        const newTodo = {
            text: inputValue,
            id: uuidv4(),
            isChecked: false,
        };

        const updatedList = [...todoList, newTodo];
        this.setState({ todoList: updatedList, inputValue: '', error: null }, () => {
            localStorage.setItem('todoList', JSON.stringify(this.state.todoList));
        });
    };

    toggleTodoItemStatus = (id) => {
        const updatedList = this.state.todoList.map(todo => 
            todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
        );

        this.setState({ todoList: updatedList }, () => {
            localStorage.setItem('todoList', JSON.stringify(this.state.todoList));
        });
    };

    deleteTodoItem = (id) => {
        const updatedList = this.state.todoList.filter(todo => todo.id !== id);
        this.setState({ todoList: updatedList }, () => {
            localStorage.setItem('todoList', JSON.stringify(this.state.todoList));
        });
    };

    clearAllTodos = () => {
        this.setState({ todoList: [] }, () => {
            localStorage.removeItem('todoList');
        });
    };

    render(){
        const { todoList, inputValue, error } = this.state;

        return (
            <div className="todos-bg-container">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="todos-heading">Todos</h1>
                            <h1 className="create-task-heading">
                                Create <span className="create-task-heading-subpart">Task</span>
                            </h1>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={this.handleInputChange}
                                className="todo-user-input"
                                placeholder="What needs to be done?"
                            />
                            <button className="button" onClick={this.addTodoItem}>Add</button>
                            {error && <p className="error-message">{error}</p>}
                            <h1 className="todo-items-heading">
                                My <span className="todo-items-heading-subpart">Tasks</span>
                            </h1>
                            <ul className="todo-items-container">
                                {todoList.map(todo => (
                                    <li key={todo.id} className="todo-item-container d-flex flex-row">
                                        <input
                                            type="checkbox"
                                            checked={todo.isChecked}
                                            onChange={() => this.toggleTodoItemStatus(todo.id)}
                                        />
                                        <label className={todo.isChecked ? "checked checkbox-label" : "checkbox-label"}>
                                            {todo.text}
                                        </label>
                                        <div className="delete-icon-container" style={{ cursor: 'pointer' }}>
                                            <i className="fa-solid fa-trash"
                                               onClick={() => this.deleteTodoItem(todo.id)}></i>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <button className="button" onClick={this.clearAllTodos}>Clear All</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Home
