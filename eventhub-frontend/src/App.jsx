import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import EventDetail from "./pages/EventDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CheckOut from "./pages/CheckOut";
import Confirmation from "./pages/Confirmation";
import MyTickets from "./pages/MyTickets";
import CreateEvent from "./pages/CreateEvent"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<SearchResults />} />
      <Route path="/event/:id" element={<EventDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/checkout/:eventId" element={<CheckOut/>} />
      <Route path="/confirmation" element={<Confirmation/>} />
      <Route path="/mytickets" element={<MyTickets/>} />
      <Route path="/createevent" element={<CreateEvent/>} />
    </Routes>
  );
}

export default App;