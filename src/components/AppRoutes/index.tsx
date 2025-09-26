import { config } from "@/configs/config";
import { useRoutes } from "react-router";

const AppRouter = () => {
  const routers = useRoutes(config);
  return <>
    {routers}
  </>
};

export default AppRouter;
