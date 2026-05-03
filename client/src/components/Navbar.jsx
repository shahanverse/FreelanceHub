import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { logout } from "../redux/slices/authSlice.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };

  return (
    <nav className="bg-white/5 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between ">
        <h1 className="text-2xl font-black text-white tracking-tight">
          Freelance <span className="text-blue-400">Hub</span>
        </h1>

        <div className="flex items-center gap-4">
          <span className="bg-blue-500/20 text-blue-400 text-xs font-medium px-3 py-1 rounded-full border border-blue-5500/20 uppercase tracking-wider">
            {user?.role}˝
          </span>
          <span className="text-slate-300 text-sm font-medium">
            {user?.name}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-sm font-medium px-4 py-2 rounded-xl transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar