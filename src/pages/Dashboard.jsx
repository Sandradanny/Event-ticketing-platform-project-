// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  Ticket,
  Plus,
  BarChart3,
  MapPin,
  Eye,
  Edit,
  Trash2,
  CalendarDays,
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  X,
  QrCode,
  CreditCard,
} from "lucide-react";
import { eventApi } from "../core/services/api";
import Navbar from "../Navbar";
import Charts from "../shared/components/Charts";
import Footer from "../shared/components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchEvents();

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await eventApi.getAll();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await eventApi.delete(eventId);
      setEvents(events.filter((e) => e.id !== eventId));
      alert("✅ Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const stats = [
    {
      label: "Total Events",
      value: events.length,
      icon: Calendar,
      color: "bg-indigo-500",
    },
    {
      label: "Total Tickets",
      value: "47",
      icon: Ticket,
      color: "bg-green-500",
    },
    {
      label: "Revenue",
      value: "$580",
      icon: BarChart3,
      color: "bg-yellow-500",
    },
    { label: "Users", value: "421", icon: Users, color: "bg-purple-500" },
  ];

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    { id: "events", label: "My Events", icon: Calendar, path: "/events" },
    { id: "create", label: "Create Event", icon: Plus, path: "/create-event" },
    { id: "tickets", label: "My Tickets", icon: Ticket, path: "/my-tickets" },
    { id: "scan", label: "Scan Ticket", icon: QrCode, path: "/scan-ticket" },
    { id: "profile", label: "Profile", icon: Users, path: "/profile" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  const formatDate = (date) => {
    if (!date) return "Date TBD";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen bg-[#0f0f0f] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen bg-[#0f0f0f] flex relative">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden fixed top-20 left-4 z-50 p-3 bg-[#1a1a1a] rounded-xl border border-gray-800 text-gray-400 hover:text-white hover:bg-[#252525] transition"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed lg:relative top-16 lg:top-0 left-0 h-[calc(100vh-64px)] lg:h-screen w-72 bg-[#1a1a1a] border-r border-gray-800 transition-all duration-300 z-40 overflow-y-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <div className="p-6">
            {/* User Info */}
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-800">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                {JSON.parse(
                  localStorage.getItem("user") || '{"fullName":"U"}',
                ).fullName?.charAt(0) || "U"}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  {JSON.parse(
                    localStorage.getItem("user") || '{"fullName":"User"}',
                  ).fullName || "User"}
                </p>
                <p className="text-gray-400 text-xs">Event Organizer</p>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (isMobile) closeSidebar();
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      activeTab === item.id
                        ? "bg-indigo-600 text-white"
                        : "text-gray-400 hover:bg-[#252525] hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Logout Button */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800 bg-[#1a1a1a]">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:bg-red-600/20 hover:text-red-400 transition"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Dashboard Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400 text-sm">
                  Welcome back! Here's what's happening.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/scan-ticket"
                  className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <QrCode className="w-5 h-5" />
                  Scan Ticket
                </Link>
                <Link
                  to="/create-event"
                  className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <Plus className="w-5 h-5" />
                  Create Event
                </Link>
                {/* ✅ Payment Button - Added here */}
                <Link
                  to="/payment"
                  className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <CreditCard className="w-5 h-5" />
                  Payment
                </Link>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-[#1a1a1a] rounded-xl shadow-lg p-5 border border-gray-800"
                >
                  <div className="flex items-center justify-between">
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-white">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Events List */}
            <div className="bg-[#1a1a1a] rounded-xl shadow-lg border border-gray-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                <h2 className="font-semibold text-white">My Events</h2>
                <Link
                  to="/events"
                  className="text-sm text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  View All →
                </Link>
              </div>

              {events.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-400">
                    No events yet. Create your first event!
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-800">
                  {events.slice(0, 5).map((event) => (
                    <div
                      key={event.id}
                      className="px-6 py-4 flex items-center gap-3 hover:bg-[#252525] transition"
                    >
                      <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Ticket className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white text-sm truncate">
                          {event.eventName || event.title || "Untitled"}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="w-3.5 h-3.5" />{" "}
                            {formatDate(event.eventDate || event.date)}
                          </span>
                          {event.eventvenue && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />{" "}
                              {event.eventvenue}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Link
                          to={`/event/${event.id}`}
                          className="p-1.5 text-gray-500 hover:text-indigo-400 transition"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/edit-event/${event.id}`}
                          className="p-1.5 text-gray-500 hover:text-blue-400 transition"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-1.5 text-gray-500 hover:text-red-400 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Charts Section */}
            <div className="mt-8">
              <Charts />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;