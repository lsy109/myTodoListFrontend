import React, { useState } from "react";
import { Todo } from "./types";

interface TodoFormProps {
  onAddTodo: (todo: Omit<Todo, "id" | "createdAt">) => void;
  onClose: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo, onClose }) => {
  const [content, setContent] = useState(""); // 待办事项内容状态
  const [priority, setPriority] = useState<"red" | "yellow" | "green">("green");

  const handleSubmit = () => {
    if (!content.trim()) { // 检查内容是否为空
      alert("请输入事件内容");
      return;
    }
    onAddTodo({ content, priority, completed: false }); // 调用添加待办事项的函数
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>添加事件</h2>
        <input
          type="text"
          placeholder="输入事件内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="priority-select">
          {["red", "yellow", "green"].map((color) => (
            <label key={color}>
              <input
                type="radio"
                value={color}
                checked={priority === color}
                onChange={() => setPriority(color as "red" | "yellow" | "green")}
              />
              {color}
            </label>
          ))}
        </div>
        <button onClick={onClose}>取消</button>
        <button onClick={handleSubmit}>确认</button>
      </div>
    </div>
  );
};

export default TodoForm;
