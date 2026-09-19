import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  Moon,
  Sun,
  LogOut,
  Camera,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const navItems = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "Applications",
    path: "/applications",
  },
  {
    name: "Interviews",
    path: "/interviews",
  },
  {
    name: "Analytics",
    path: "/analytics",
  },
  {
    name: "Resources",
    path: "/resources",
  },
];

export default function Navbar() {
  const { user, logout } = useAuth();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("jobtrack-theme") === "dark";
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  // Profile photo
  const [profilePhoto, setProfilePhoto] = useState(() => {
    if (!user?.email) return null;

    return localStorage.getItem(
      `jobtrack-profile-photo-${user.email}`
    );
  });

  const fileInputRef = useRef(null);

  // ================= DARK MODE =================

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("jobtrack-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("jobtrack-theme", "light");
    }
  }, [darkMode]);

  // ================= PROFILE PHOTO =================

  useEffect(() => {
    if (!user?.email) {
      setProfilePhoto(null);
      return;
    }

    const savedPhoto = localStorage.getItem(
      `jobtrack-profile-photo-${user.email}`
    );

    setProfilePhoto(savedPhoto);
  }, [user]);

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file || !user?.email) return;

    // Only allow images
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // 5 MB limit
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result;

      localStorage.setItem(
        `jobtrack-profile-photo-${user.email}`,
        imageData
      );

      setProfilePhoto(imageData);
    };

    reader.readAsDataURL(file);

    // Allow selecting the same image again
    event.target.value = "";
  };

  // ================= FIRST LETTER =================

  const firstLetter =
    user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  // ================= LOGOUT =================

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111827]/95 text-white backdrop-blur-xl">

      <div className="mx-auto flex h-[68px] max-w-[1500px] items-center justify-between px-5 lg:px-8">

        {/* ================= LOGO ================= */}

        <NavLink
          to={user ? "/" : "/login"}
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#111827]">
            <div className="h-5 w-5 rotate-45 rounded-[5px] border-[3px] border-[#111827]" />
          </div>

          <span className="text-xl font-semibold tracking-tight">
            JobTrack
          </span>
        </NavLink>


        {/* ================= DESKTOP NAV ================= */}

        {user && (
          <nav className="hidden items-center gap-1 lg:flex">

            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-2 text-sm transition ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

          </nav>
        )}


        {/* ================= RIGHT SIDE ================= */}

        <div className="flex items-center gap-2">

          {/* Search */}

          {user && (
            <div className="hidden h-10 w-52 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 md:flex">

              <Search
                size={17}
                className="text-slate-400"
              />

              <span className="text-sm text-slate-400">
                Search anything...
              </span>

              <span className="ml-auto rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-slate-500">
                ⌘ K
              </span>

            </div>
          )}


          {/* ================= DARK MODE ================= */}

          <button
            onClick={() => setDarkMode((prev) => !prev)}
            title={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            {darkMode ? (
              <Sun
                size={19}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            ) : (
              <Moon
                size={19}
                className="transition-transform duration-300 group-hover:-rotate-12"
              />
            )}
          </button>


          {/* ================= NOTIFICATION ================= */}

          {user && (
            <button className="relative rounded-xl p-2.5 text-slate-300 hover:bg-white/10">
              <Bell size={20} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>
          )}


          {/* ================= PROFILE ================= */}

          {user && (
            <>
              {/* Hidden file input */}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                title="Change profile photo"
                className="group relative hidden items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-white/10 sm:flex"
              >

                {/* Avatar */}

                <div className="relative">

                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt="Profile"
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">
                      {firstLetter}
                    </div>
                  )}

                  {/* Camera icon */}

                  <div className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#111827] bg-white text-slate-700 opacity-0 transition group-hover:opacity-100">
                    <Camera size={9} />
                  </div>

                </div>


                {/* User info */}

                <div className="text-left">

                  <p className="text-sm font-medium">
                    {user?.name || "User"}
                  </p>

                  <p className="text-[11px] text-slate-400">
                    Keep going
                  </p>

                </div>

                <ChevronDown size={15} />

              </button>
            </>
          )}


          {/* ================= LOGOUT ================= */}

          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut size={17} />

              <span className="hidden sm:inline">
                Logout
              </span>
            </button>
          )}


          {/* ================= MOBILE MENU ================= */}

          {user && (
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="rounded-lg p-2 lg:hidden"
            >
              {mobileOpen ? (
                <X size={21} />
              ) : (
                <Menu size={21} />
              )}
            </button>
          )}

        </div>

      </div>


      {/* ================= MOBILE NAV ================= */}

      {mobileOpen && user && (
        <div className="border-t border-white/10 bg-[#111827] px-5 py-4 lg:hidden">

          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-3 text-sm ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}


          {/* Mobile Logout */}

          <button
            onClick={handleLogout}
            className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-3 text-sm text-red-400 hover:bg-red-500/10"
          >
            <LogOut size={17} />
            Logout
          </button>

        </div>
      )}

    </header>
  );
}