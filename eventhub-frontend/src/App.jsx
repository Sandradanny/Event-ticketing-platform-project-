import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import EventDetail from './pages/EventDetail'
import Login from './pages/Login';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchResults />} />
      <Route path="/events" element={<SearchResults />} />
      <Route path="/event/:id" element={<EventDetail />} />
      <Route path='login' element={<Login />} />
    </Routes>
  )
}