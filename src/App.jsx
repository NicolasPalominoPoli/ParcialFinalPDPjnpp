import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { UsersProvider } from "./context/UserContext";
import Game from "./pages/Game";
import GameOver from "./pages/GameOver";

function App() {
  return (
    <BrowserRouter>
      <UsersProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<Game />} />
          <Route path="/gameover" element={<GameOver />} />
        </Routes>
      </UsersProvider>
    </BrowserRouter>
  );
}

export default App;
