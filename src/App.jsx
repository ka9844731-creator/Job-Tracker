import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applicatoins";
import Interviews from "./pages/Interviews";
import Analytics from "./pages/Analytics";
import Resources from "./pages/Resources";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen overflow-x-hidden">

        {/* ========================================= */}
        {/* BACKGROUND IMAGE */}
        {/* ========================================= */}

        <div
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/jobtrack-bg.png')",
          }}
        />

        {/* ========================================= */}
        {/* OVERLAY */}
        {/* ========================================= */}

        <div className="fixed inset-0 z-10 bg-white/70 dark:bg-[#07101f]/75" />

        {/* ========================================= */}
        {/* WEBSITE CONTENT */}
        {/* ========================================= */}

        <div className="relative z-20 min-h-screen">
          <Navbar />

          <Routes>
            {/* PUBLIC */}
            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/signup"
              element={<Signup />}
            />

            {/* PROTECTED */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/applications"
                element={<Applications />}
              />

              <Route
                path="/interviews"
                element={<Interviews />}
              />

              <Route
                path="/analytics"
                element={<Analytics />}
              />

              <Route
                path="/resources"
                element={<Resources />}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}