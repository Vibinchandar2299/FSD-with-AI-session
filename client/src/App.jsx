import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  CheckSquare,
  Settings,
  LogOut,
} from "lucide-react";
import {
  NavLink,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Projects", icon: FolderKanban, path: "/projects" },
  { name: "Team Members", icon: Users, path: "/team" },
];

const AUTH_KEY = "taskflow:isAuthenticated";

const user = {
  fullName: "Alex Morgan",
  role: "Lead Developer",
};

function Board({ title, Icon }) {
  return (
    <div className="w-full h-full border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center bg-white/50">
      <div className="text-center">
        <div className="w-16 h-16 bg-white shadow-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
          <Icon size={28} className="text-gray-300" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title} Board</h3>
        <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
          Welcome to the {title.toLowerCase()} space. Here you can start building
          out the features and managing your tasks efficiently.
        </p>
      </div>
    </div>
  );
}

function validateRequired(values) {
  const errors = {};

  Object.entries(values).forEach(([key, value]) => {
    if (!String(value).trim()) {
      errors[key] = "this column is required";
    }
  });

  return errors;
}

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateRequired(values);

    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Please enter a valid email.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onLogin();
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white border border-gray-200 p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Login</h1>
        <p className="mt-1 text-sm text-gray-500">
          Sign in to continue to your task workspace.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>

        <p className="mt-5 text-sm text-gray-600">
          New here?{" "}
          <NavLink to="/signup" className="font-semibold text-blue-600 hover:text-blue-700">
            Create an account
          </NavLink>
        </p>
      </div>
    </div>
  );
}

function SignupPage({ onSignup }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateRequired(values);

    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Please enter a valid email.";
    }

    if (values.password && values.password.length < 6) {
      nextErrors.password = "Password should be at least 6 characters.";
    }

    if (values.confirmPassword && values.password !== values.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSignup();
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white border border-gray-200 p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Signup</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create your account to access dashboard modules.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="signup-name"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label
              htmlFor="signup-password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="signup-confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="signup-confirm-password"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Signup
          </button>
        </form>

        <p className="mt-5 text-sm text-gray-600">
          Already have an account?{" "}
          <NavLink to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppLayout({ onLogout }) {
  const location = useLocation();
  const initial = user.fullName.charAt(0).toUpperCase();

  const currentNavItem =
    navItems.find((item) => location.pathname.startsWith(item.path)) ||
    navItems[0];

  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Sidenav Section */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shadow-sm relative z-10">
        
        {/* Header / Title */}
        <div className="h-20 flex items-center px-8 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-200">
              <CheckSquare size={18} strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600 tracking-tight">
              Task Flow
            </h1>
          </div>
        </div>

        {/* Modules Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">
            Modules
          </div>
          
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-700 shadow-sm shadow-blue-100/50"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-blue-600 rounded-r-full" />
                    )}
                    <Icon
                      size={18}
                      className={isActive ? "text-blue-600" : "text-gray-400"}
                    />
                    {item.name}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Section (Bottom) */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-200">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user.fullName}
              </p>
              <p className="text-xs text-gray-500 truncate mt-0.5">
                {user.role}
              </p>
            </div>
            <Settings size={16} className="text-gray-400 hover:text-gray-600 flex-shrink-0" />
          </div>
        </div>
      </aside>

      {/* Main Container Section */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-gray-50/50">
        {/* Top Navbar for container context */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200/60 flex items-center justify-between px-8 z-0">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            {currentNavItem.name}
          </h2>
          
          <div className="flex items-center gap-4">
             <button className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                Share Activity
             </button>
             <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-200">
                + Create New
             </button>
             <button
               onClick={onLogout}
               className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-all"
             >
               <LogOut size={16} />
               Logout
             </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />
            <Route
              path="/dashboard"
              element={<Board title="Dashboard" Icon={LayoutDashboard} />}
            />
            <Route
              path="/projects"
              element={<Board title="Projects" Icon={FolderKanban} />}
            />
            <Route
              path="/team"
              element={<Board title="Team Members" Icon={Users} />}
            />
            <Route
              path="*"
              element={<Navigate to="/dashboard" replace />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_KEY);
    setIsAuthenticated(storedAuth === "true");
  }, []);

  const handleLogin = () => {
    localStorage.setItem(AUTH_KEY, "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage onLogin={handleLogin} />
          )
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <SignupPage onSignup={handleLogin} />
          )
        }
      />
      <Route
        path="/*"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
