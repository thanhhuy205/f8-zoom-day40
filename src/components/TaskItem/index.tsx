import type { Task } from "@/store/reducers/taskReducer";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}
const TaskItem = ({ task, onEdit, onDelete, isDeleting }: TaskItemProps) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm mb-2">
      <p className="font-medium text-gray-800">{task.title}</p>
      <div className="space-x-2">
        <button
          className="px-4 py-1.5 rounded-lg border border-blue-500 text-blue-500 
                 hover:bg-blue-500 hover:text-white transition-colors duration-200"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button
          className={`px-4 py-1.5 rounded-lg border border-red-500 text-red-500 
                 hover:bg-red-500 hover:text-white transition-colors duration-200
                 ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isDeleting}
          onClick={() => onDelete(task.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
