import { Route, HashRouter, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./components/Home"
import Games from "./components/Games"

function App() {

  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/games" element={<Games />}/>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
