import { Routes, Route } from "react-router-dom";
import SearchResults from "./pages/SearchResults";
import EventDetail from "./pages/EventDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/events" element={<SearchResults />} />
      <Route path="/event/:id" element={<EventDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup"element={<Signup />} />
    </Routes>
  );
}

export default App;