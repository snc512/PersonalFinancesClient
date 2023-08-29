import "./App.css";
// import Category from './Category';
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/home/Home";
import NavBar from "./components/NavBar";
import Expenses from "./components/expenses/Expenses";

function App() {
  const [expenses, setExpenses] = useState();
  const getExpenses = async () => {
    try {
      const response = await api.get("/api/v1/expenses");
      setExpenses(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);
  
  return(
  <div className="App">
    <NavBar />
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/expenses" element={<Expenses/>}></Route>
      </Route>
    </Routes>
  </div>
  );
}

export default App;
