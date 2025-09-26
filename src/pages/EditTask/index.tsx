import TaskForm from "@/components/TaskForm";
import { useApi } from "@/hook/useApi";
import { useDispatch } from "@/libs/react-redux";
import { updateTask } from "@/store/reducers/taskReducer";
import { fetchApi } from "@/utils/fetchApi";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

const EditTask = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [err, setErr] = useState<boolean>(false);
  const { loading, error, data } = useApi(`http://localhost:3001/tasks/${id}`);

  const handleSubmit = async (task: { title: string }) => {
    const { success, data } = await fetchApi(
      `http://localhost:3001/tasks/${id}`,
      "PUT",
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: task,
      }
    );
    if (success) {
      setErr(false);
      dispatch(updateTask(data));
      navigate("/", { replace: true });
    } else {
      setErr(true);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) {
    navigate("/", { replace: true });
  }
  if (!data) return <div>Task found</div>;
  return (
    <div className="card">
      {err && <p className="alert-error">Không thể sửa được</p>}
      <TaskForm
        onSubmit={(title: string) => handleSubmit({ title })}
        initialData={data}
        submitText="Edit task"
        isLoading={loading}
      />
    </div>
  );
};

export default EditTask;
