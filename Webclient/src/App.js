import React from "react"
import Navbar from "./components/MyNavbar";
import { BrowserRouter } from 'react-router-dom'
import Routes from "./routers/Routes";

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes />
      </BrowserRouter>
  );
}

export default App;
