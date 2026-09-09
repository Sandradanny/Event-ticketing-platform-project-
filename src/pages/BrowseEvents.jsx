// src/pages/BrowseEvents.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Ticket,
  Search,
  CreditCard,
  QrCode,
  Eye,
} from "lucide-react";
import { eventApi } from "../core/services/api";
import Navbar from "../Navbar";
import Footer from "../shared/components/Footer";

export default function BrowseEvents() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const categories = [
    "All",
    "Concert",
    "Conference",
    "Festival",
    "Workshop",
    "Sports",
    "Art",
    "Food",
    "Tech",
    "Music",
  ];

  useEffect(() => {
    fetchEvents();
  }, [page]);

  useEffect(() => {
    filterEvents();
  }, [searchTerm, selectedCategory, events]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await eventApi.getAll(page, 10);

      if (data && Array.isArray(data)) {
        setEvents((prev) => (page === 1 ? data : [...prev, ...data]));
        setFilteredEvents((prev) => (page === 1 ? data : [...prev, ...data]));
        setHasMore(data.length === 10);
      } else {
        const localData = await eventApi.getAllLocal();
        setEvents(localData);
        setFilteredEvents(localData);
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      try {
        const localData = await eventApi.getAllLocal();
        setEvents(localData);
        setFilteredEvents(localData);
        setError("Showing offline events");
      } catch {
        setError("Failed to load events. Please try again.");
        setEvents([]);
        setFilteredEvents([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = [...events];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (event) =>
          (event.eventName || event.title)?.toLowerCase().includes(term) ||
          (event.eventDescription || event.description)
            ?.toLowerCase()
            .includes(term) ||
          (event.eventvenue || event.venue || event.location)
            ?.toLowerCase()
            .includes(term),
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (event) => (event.category || selectedCategory) === selectedCategory,
      );
    }

    setFilteredEvents(filtered);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchEvents();
      return;
    }

    try {
      setLoading(true);
      const results = await eventApi.search(searchTerm);
      if (results && Array.isArray(results)) {
        setFilteredEvents(results);
      } else {
        filterEvents();
      }
    } catch (error) {
      console.error("Search error:", error);
      filterEvents();
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date TBD";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getEventDetails = (event) => {
    return {
      id: event.id || event.eventId,
      title: event.eventName || event.title || "Untitled Event",
      description:
        event.eventDescription || event.description || "No description",
      date: event.eventDate || event.date,
      location:
        event.eventvenue || event.venue || event.location || "Location TBD",
      price: event.price || 0,
      category: event.category || "General",
      totalTickets: event.totalTickets || 0,
      image: event.image || null,
    };
  };

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Browse Events
          </h1>
          <p className="text-gray-500 mb-6">
            Discover and book amazing events happening near you
          </p>

          {/* Search & Filter Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events by name, venue, or date..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-700 min-w-[150px]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <button
                onClick={handleSearch}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Search
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">
              {filteredEvents.length}{" "}
              {filteredEvents.length === 1 ? "event" : "events"} found
            </p>
            {error && <span className="text-sm text-yellow-600">{error}</span>}
          </div>

          {/* Events Grid */}
          {loading && events.length === 0 ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <p className="text-gray-400 text-lg">No events found</p>
              <p className="text-gray-400 text-sm mt-1">
                Try adjusting your search
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => {
                const details = getEventDetails(event);

                return (
                  <div
                    key={details.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition hover:-translate-y-1 flex flex-col"
                  >
                    {/* Image & Details link to Event Detail */}
                    <Link to={`/event/${details.id}`} className="block">
                      <div className="h-48 bg-gray-200 relative overflow-hidden">
                        {details.image ? (
                          <img
                            src={details.image}
                            alt={details.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                            <Ticket className="w-12 h-12 text-indigo-300" />
                          </div>
                        )}
                        {details.category && details.category !== "General" && (
                          <span className="absolute top-3 right-3 px-2 py-1 bg-black/50 text-white text-xs rounded-full">
                            {details.category}
                          </span>
                        )}
                      </div>

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 text-lg mb-1 truncate">
                          {details.title}
                        </h3>
                        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                          {details.description}
                        </p>

                        <div className="space-y-1.5 text-sm text-gray-500">
                          {details.date && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(details.date)}</span>
                            </div>
                          )}
                          {details.location &&
                            details.location !== "Location TBD" && (
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{details.location}</span>
                              </div>
                            )}
                          <div className="flex items-center gap-2 text-indigo-600 font-medium">
                            <Ticket className="w-4 h-4" />
                            <span>
                              {details.price === 0
                                ? "Free"
                                : `$${details.price}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>

              
                    <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                      {details.totalTickets > 0 && (
                        <div className="text-xs text-gray-400 mb-2">
                          {details.totalTickets} tickets available
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                       
                        <Link
                          to={`/booking/${details.id}`}
                          className="flex-1 text-center text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg transition font-medium"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Load More */}
          {hasMore && !loading && events.length > 0 && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Load More Events
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
