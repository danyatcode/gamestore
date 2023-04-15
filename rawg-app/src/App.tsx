import { Route, HashRouter, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./components/Home"
import GamesList from "./components/GamesList"
import SelectedGame from "./components/SelectedGame"

function App() {

  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/games/genre/:genreID" element={<GamesList />}/>
          <Route path="/game/:gameID" element={<SelectedGame />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
