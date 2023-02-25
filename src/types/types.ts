export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface Goal {
  id: string;
  title: string;
  complete: number;
  tasks: Task[];
  image?: string;
}
