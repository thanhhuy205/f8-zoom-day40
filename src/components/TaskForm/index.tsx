import type { Task } from "@/store/reducers/taskReducer";
import { useState } from "react";
import { useNavigate } from "react-router";

interface TaskFormProps {
  initialData: Task | undefined;
  onSubmit: (title: string) => void;
  submitText: string;
  isLoading: boolean;
}

const TaskForm = ({
  initialData,
  onSubmit,
  submitText,
  isLoading,
}: TaskFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [valid, setValid] = useState<boolean>(false);
  const navigate = useNavigate();
  if (isLoading) return <p>...Loading</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setValid(true);
    } else {
      onSubmit(title);
      setValid(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title:
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
        {valid && <p className="input-error">Không được trống title</p>}
      </div>

      <div className="flex space-x-3">
        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? "Loading..." : submitText}
        </button>

        <button
          type="button"
          onClick={() => navigate("/", { replace: true })}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
