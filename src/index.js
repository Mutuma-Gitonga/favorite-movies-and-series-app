import React from "react";
import {createRoot} from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";

// Using createRoot in place of deprecated ReactDOM.render method
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Router>
    <App />
  </Router>,
);
