import React from "react"
import Navbar from "./components/MyNavbar";
import { BrowserRouter } from 'react-router-dom'
import Home from "./containers/Home/Home";
import Routes from "./routers/Routes";
import styled from "styled-components"

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes />
      </BrowserRouter>
  );
}

export default App;
