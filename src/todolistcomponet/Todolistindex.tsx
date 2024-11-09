import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Header from './Header';
import { useLocation } from 'react-router-dom';

interface Todo {
    id: number;
    task: string;
    completed: boolean;
}

const Todolistindex: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const location = useLocation();
    const { userData } = location.state || {}; // 解构出 userdata

    const clearUserData = () => {
        // 清空用户数据
        localStorage.removeItem('userData');
        window.location.reload(); // 刷新页面
    };

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    const addTodo = (task: string) => {
        const newTodo = { id: Date.now(), task, completed: false };
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const toggleComplete = (id: number) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const deleteTodo = (id: number) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    return (
        <div style={{ padding: "20px" }}>
            <Header userData={userData} clearUserData={clearUserData}/>
            <TodoList userData={userData}/>
        </div>
    );
};

export default Todolistindex;
