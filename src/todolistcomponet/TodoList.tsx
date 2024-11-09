import React, { useState, useEffect } from "react";
import { Todo } from "./types";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import EditForm from "./EditForm";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

interface TodoListProps {
  userData: { [key: string]: any };
}

const TodoList: React.FC<TodoListProps> = ({ userData }) => {
  // 初始化待辦事項列表狀態
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  // 從 localStorage 中載入待辦事項
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // 每次 todos 狀態更新時，將其保存到 localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 切換待辦事項的完成狀態
  const handleToggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // 添加新待辦事項
  const handleAddTodo = async (newTodo: Omit<Todo, "id" | "createdAt">) => {
    const createdAt = new Date();
    const formattedCreatedAt = formatDate(createdAt);
    const ID = crypto.randomUUID();
    const todoWithMeta: Todo = {
      ...newTodo,
      id: ID,
      createdAt: new Date(),
    };
    setTodos((prev) => [...prev, todoWithMeta]);
  };

  // 更新待辦事項
  const handleUpdateTodo = (updatedTodo: Todo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    setEditingTodo(null);
  };

  // 刪除待辦事項
  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // 處理拖動結束後的排序
  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) return;

    const reorderedTodos = Array.from(todos);
    const [removed] = reorderedTodos.splice(source.index, 1);
    reorderedTodos.splice(destination.index, 0, removed);

    setTodos(reorderedTodos);
  };

  return (
    <div className="TodoList">
      <h1 id="daibanshixian">待辦事項</h1>
      <button id="todolistButton" onClick={() => setIsFormOpen(true)}>
        <span role="img" aria-label="add">➕</span>
      </button>

      {todos.length === 0 ? (
        <p>暫無待辦事項</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos" direction="horizontal">
            {(provided) => (
              <div
                className="todo-list"
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  padding: '8px',
                  overflow: 'auto',
                }}
              >
                {todos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TodoItem
                          key={todo.id}
                          todo={todo}
                          onEdit={setEditingTodo}
                          onDelete={handleDelete}
                          onToggleComplete={handleToggleComplete}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {isFormOpen && (
        <TodoForm
          onAddTodo={handleAddTodo}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {editingTodo && (
        <EditForm
          todo={editingTodo}
          onSave={handleUpdateTodo}
          onClose={() => setEditingTodo(null)}
        />
      )}
    </div>
  );
};

export default TodoList;
