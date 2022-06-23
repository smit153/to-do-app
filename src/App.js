import "./App.css";
import React, { useEffect, useContext, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Today from "./components/Today/Today";
import Completed from "./components/Completed/Completed";
import OverDue from "./components/OverDue/OverDue";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import DataContext from "./context/data-context";
import axios from "axios";
const token =
  "eyJhbGciOiJIUzI1NiJ9.dXNlcg.JE_kT3J5-pNxHjuB-nKNnlgWxBXDw_2RNcZiKbDHWIM";
function App() {
  const ctx = useRef(useContext(DataContext));
  useEffect(() => {
    axios
      .get("http://localhost:4000/", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then(function (response) {
        if (response.data.auth === "true") {
          ctx.current.setIsLoggedIn("true");
        }
        console.log(response.data.auth);
      });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="today" element={<Today />} />
        <Route exact path="completed" element={<Completed />} />
        <Route exact path="overdue" element={<OverDue />} />
        <Route exact path="admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
