import React from "react";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Middlebar from "./Middlebar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Mail from "./Mail";
import EmailList from "./EmailList";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <div className="app__body">
          <Sidebar />
          <Routes>
            <Route path="/mail" element={<Mail />} />

            <Route path="/" exact element={<EmailList />} />
          </Routes>
          <Middlebar />
        </div>
      </div>
    </Router>
  );
}

export default App;
