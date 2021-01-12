import React from "react"
import Navbar from "./components/Navbar/MyNavbar";
import { BrowserRouter } from 'react-router-dom'
import Home from "./containers/Home/Home";
import Routes from "./routers/Routes";

function App() {
  return (
    <div>
		<BrowserRouter>
			<Navbar />
      <Routes />
		</BrowserRouter>
    </div>
  );
}

export default App;
