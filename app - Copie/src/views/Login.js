import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, InputGroup, Input, Button, Fade, Alert } from "reactstrap";
import instance from "../data/api";
import axios from "axios";
import { selectUser, loginAction } from "../slices/userSlice";

const LogIn = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Invalid username or password"
  );
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);

  useEffect(() => {
    console.log(instance.baseURL);
    if (userData) navigate("/admin");
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabled(true);

    try {
      // Send login request to the server
      const loginResponse = await axios.post(
        "https://vmi1015553.contaboserver.net:8090/api/authenticate",
        { username, password, rememberMe: true }
      );
      console.log(loginResponse.data);

      if (loginResponse.data) {
        // Set authorization header for future API requests
        instance.defaults.headers[
          "Authorization"
        ] = `Bearer ${loginResponse.data.id_token}`;

        // Store the bearer token in local storage
        localStorage.setItem("bearerToken", loginResponse.data.id_token);

        // Fetch user data from the server
        const userResponse = await instance.get(`api/admin/users/${username}`);

        if (userResponse.data.activated) {
          // Dispatch login action and store user data in Redux
          dispatch(loginAction(userResponse.data));
          localStorage.setItem("user", JSON.stringify(userResponse.data));
          setError(false);
          navigate("/admin");
        } else {
          setError(true);
          setErrorMessage("Your Account is not activated");
        }
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
      setErrorMessage("Something is wrong! Please try again.");
    }

    setDisabled(false);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center mx-auto"
      style={{ height: "100vh" }}
    >
      <div className="mx-auto bg-white text-dark p-4 rounded w-25">
        <Fade>
          {error ? (
            <Alert
              color="danger"
              isOpen={error}
              toggle={() => setError(!error)}
            >
              {errorMessage}
            </Alert>
          ) : null}

          <h1 className="h2 mb-4 text-center">Log In</h1>

          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-2">
              <Input
                placeholder="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-2">
              <Input
                placeholder="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>

            <Button
              type="submit"
              color="success w-100 mb-2"
              disabled={disabled}
            >
              Login
            </Button>
          </Form>
        </Fade>
      </div>
    </div>
  );
};

export default LogIn;
