import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import Detail from "./components/Detail";
import MoviesList from "./components/MoviesList";
import DisneyHistory from "./components/DisneyHistory";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/movies" element={<MoviesList />} />
          <Route path="/disney-history" element={<DisneyHistory />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
