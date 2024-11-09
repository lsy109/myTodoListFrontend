import React from "react";
import { Todo } from "./types";
import { FaTrash, FaCheck, FaGripVertical } from "react-icons/fa";

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const formattedDate = new Date(todo.createdAt).toLocaleString("zh-CN", { // 格式化创建时间
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`todo-card ${todo.completed ? "completed" : ""}`}>
      <div className="drag-handle">
        <FaGripVertical />
      </div>
      <div
        className={`priority-circle ${todo.priority}`}
        onClick={() => onToggleComplete(todo.id)}
      >
        {todo.completed && <FaCheck />}
      </div>

      <h3 onClick={() => onEdit(todo)}>{todo.content}</h3>
      <p className="timestamp">{formattedDate}</p>

      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(todo.id);
        }}
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default TodoItem;
