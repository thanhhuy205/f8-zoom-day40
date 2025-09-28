import TaskForm from "@/components/TaskForm";
import { fetchApi } from "@/utils/fetchApi";
import { useState } from "react";
import { useNavigate } from "react-router";

const NewTask = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);
  const handleSubmit = async (task: { title: string }) => {
    setLoading(true);
    setErr(false);

    try {
      const { success } = await fetchApi(
        `http://localhost:3001/tasks`,
        "POST",
        {
          headers: { "Content-Type": "application/json" },
          body: task,
        }
      );

      if (success) {
        navigate("/task", { replace: true });
      } else {
        setErr(true);
      }
    } catch (err) {
      console.error(err);
      setErr(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      {err && <p className="alert-error">Không thể tạo mới task</p>}

      <TaskForm
        onSubmit={(title: string) => handleSubmit({ title })}
        initialData={undefined}
        submitText="Create task"
        isLoading={loading}
      />
    </div>
  );
};

export default NewTask;
