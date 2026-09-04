import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import EventDetail from "./pages/EventDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateEvent from "./pages/CreateEvent";


// ===============================
// PROTECTED ROUTE
// ===============================
function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");

  // If user is NOT logged in,
  // send them to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user IS logged in,
  // allow them to access the page
  return children;
}


function App() {
  return (
    <Routes>
      {/* LANDING PAGE */}
      <Route
        path="/" element={<Home />}
      />
      {/* LOGIN */}
      <Route path="/login"
        element={<Login />}
      />
      {/* SIGN UP */}
      <Route path="/signup"
        element={<Signup />}
      />
      <Route path="create-event" element={<CreateEvent />} />
      {/* EVENTS - LOGIN REQUIRED */}
      <Route
        path="/events"
        element={<ProtectedRoute><SearchResults /></ProtectedRoute> }/>
      {/* EVENT DETAILS - LOGIN REQUIRED */}
      <Route
        path="/event/:id"
        element={
          <ProtectedRoute>
            <EventDetail />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;