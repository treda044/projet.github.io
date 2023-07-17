import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./data/store";
import App from "./App";
import Loader from "./layouts/loader/Loader";
import "./assets/scss/style.scss";

ReactDOM.render(
  <React.Fragment>
    <ReduxProvider store={store}>
      <Suspense fallback={<Loader />}>
        <Router>
          <App />
        </Router>
      </Suspense>
    </ReduxProvider>
  </React.Fragment>,
  document.getElementById("root")
);
