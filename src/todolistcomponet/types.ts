// src/types.ts
export interface Todo {
    id: string;
    content: string;
    priority: "red" | "yellow" | "green";
    createdAt: Date;
    completed: boolean; // 添加此行
  }
  