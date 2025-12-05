export type UserRole = "admin" | "user";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export type TaskStatus = "Todo" | "Doing" | "Done";

export interface Category {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  due_date: string;
  category: Category;
}

export interface AdminTask extends Task {
  owner_id: number;
  owner_name: string;
  owner_email: string;
}
