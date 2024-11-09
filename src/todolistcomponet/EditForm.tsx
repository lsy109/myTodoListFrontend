import React, { useState, useRef, useEffect } from "react";
import { Todo } from "./types";


interface EditFormProps {
  todo: Todo;
  onSave: (updatedTodo: Todo) => void;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ todo, onSave, onClose }) => {
  const [content, setContent] = useState(todo.content); // 待办事项内容状态
  const [priority, setPriority] = useState(todo.priority); // 待办事项优先级状态
  const modalRef = useRef<HTMLDivElement>(null); // 引用模态框元素

  useEffect(() => {
    // 点击模态框外部关闭模态框
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);// 监听点击事件
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = () => {
    onSave({ ...todo, content, priority });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <h2>编辑事件</h2>
        <input
          type="text"
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
        <button onClick={handleSubmit}>保存</button>
      </div>
    </div>
  );
};

export default EditForm;
