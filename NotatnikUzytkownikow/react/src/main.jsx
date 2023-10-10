import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import "./index.scss";
import router from "./router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
