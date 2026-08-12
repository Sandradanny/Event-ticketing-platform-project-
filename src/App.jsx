import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import EventDetail from './pages/EventDetail'
import CreateEvent from './pages/CreateEvent'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<SearchResults />} />
      <Route path="/event/1" element={<EventDetail />} />
      <Route path="/event/2" element={<CreateEvent />} />
    </Routes>
  )
}