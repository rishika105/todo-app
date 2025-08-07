import React from "react";
import {
  Plus,
  Check,
  Trash2,
  Filter,
  Search,
  Calendar,
  Star,
  CheckCircle,
  Smartphone,
  Cloud,
  Zap,
  Users,
} from "lucide-react";
import { useSelector } from "react-redux";

const Home = () => {
  //  If a user tries to access / while logged in, redirect them to /my-todos.
  //  Use replace so it doesn't add to history stack (prevents back navigation to this page).

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  const handleGithubLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 justify-center items-center flex flex-col">
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center border border-white/20">
          {/* Logo/Icon */}
          <div className="w-20 h-20 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              ToDoSpace
            </span>{" "}
            ✨
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Transform your productivity with our beautiful, intuitive task
            management platform. Organize your life, one task at a time.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <div className="flex items-center gap-2 bg-violet-50 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">
              <Cloud className="w-4 h-4" />
              Cloud Sync
            </div>
            <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
              <Smartphone className="w-4 h-4" />
              Mobile Ready
            </div>
            <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
              <Zap className="w-4 h-4" />
              Lightning Fast
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="space-y-4">
            <button
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
              onClick={handleGoogleLogin}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5"
              />
              <span>Continue with Google</span>
            </button>

            <button
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={handleGithubLogin}
            >
              <img
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                alt="GitHub"
                className="h-5 w-5"
              />
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Trust Badge */}
          <div className="mt-8 flex items-center justify-center gap-2 text-gray-500 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
            <span>Trusted by 10k+ users</span>
          </div>

          {/* Privacy Note */}
          <div className="mt-6 text-gray-400 text-sm">
            <p>
              🔒 Your privacy is our priority. No data stored without
              permission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
