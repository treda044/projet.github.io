import { useRoutes, useNavigate } from "react-router-dom";
import Themeroutes from "./routes/Router";
import { useEffect } from "react";
import instance from "./data/api";
import { useDispatch } from "react-redux";
import { loginAction } from "./slices/userSlice";

const App = () => {
  const navigate = useNavigate();
  const routing = useRoutes(Themeroutes);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user and token are stored in local storage
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("bearerToken");

    if (storedUser && storedToken) {
      // Set Authorization header for API requests
      instance.defaults.headers["Authorization"] = `Bearer ${storedToken}`;

      // Dispatch login action with stored user data
      dispatch(loginAction(JSON.parse(storedUser)));
    } else {
      // If user or token is not stored, navigate to login page
      navigate("/login");
    }
  }, []);

  return <div className="dark">{routing}</div>;
};

export default App;
