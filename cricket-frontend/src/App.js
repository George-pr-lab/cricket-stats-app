// import logo from './logo.svg';
import "./App.css";

import { Routes, Route } from "react-router-dom";

// import { Login } from '@mui/icons-material';
import Register from "./components/Register";
import Login from "./components/Login";
import { Dashboard } from "./components/Dashboard";
// import { StatsCard } from './components/Stats/StatsCard';
// import { FavoriteCard } from "../components/Favorites/FavoriteC";
import FavoriteBoard from "./components/Favorites/FavoriteBoard";
import Sboard from "./components/Stats/Sboard";

export const userConfig = {
  endpoint: `http://localhost:9005/api/v1`,
};
export const favConfig = {
  endpoint: `http://localhost:9007/api/v1`,
  // endpoint: `http://localhost:3000`,
};

export const playerConfig = {
  // endpoint: `http://localhost:3000/players`,
  // statEndpoint: `http://localhost:8000/stats`a6b33079-0dc3-4e05-965b-b424a26ff026,
  // statPlayers: `http://localhost:3001/statprofile`,81a52209-a57b-4212-b5a4-4bbbb2f2f412
  statPlayers: `http://localhost:9006/api/v1/statsplayer`,
  endpoint: `https://api.cricapi.com/v1/players?apikey=a6b33079-0dc3-4e05-965b-b424a26ff026&offset=0`,
  statEndpoint: `https://api.cricapi.com/v1/players_info?apikey=a6b33079-0dc3-4e05-965b-b424a26ff026&id=`,
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/players" element={<Dashboard />} />
          <Route exact path="/stats" element={<Sboard />} />
          <Route exact path="/favorites" element={<FavoriteBoard />} />
          <Route exact path="/:playerId" element={<Sboard />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
