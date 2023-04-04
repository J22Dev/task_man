import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<div>Hello</div>} path="/" index />
      </Route>
    </Routes>
  );
};

export default App;
