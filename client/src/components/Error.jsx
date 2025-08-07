import React from "react";
import {
  AlertTriangle,
  Home,
  RefreshCw,
  Search,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleGoBack = () => {
    if (!token) navigate("/");
    else navigate("/my-todos");
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Error Section */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center border border-white/20">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>

          {/* Error Code */}
          <div className="mb-4">
            <h1 className="text-8xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
              404
            </h1>
            <h2 className="text-2xl font-bold text-gray-900">
              Oops! Page Not Found
            </h2>
          </div>

          {/* Error Message */}
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            The page you're looking for seems to have wandered off into the
            digital void. Don't worry, even the best explorers sometimes take a
            wrong turn!
          </p>

          {/* Suggestions */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What you can do:
            </h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                <span>Check the URL for any typos</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Go back to the previous page</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span>Return to our homepage</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              <Home className="w-5 h-5" />
              <span>Back to Homepage</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200">
                <ArrowLeft className="w-4 h-4" />
                <span onClick={handleGoBack}>Go Back</span>
              </button>

              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200">
                <RefreshCw className="w-4 h-4" />
                <span onClick={() => window.location.reload()}>Refresh</span>
              </button>
            </div>
          </div>

          {/* Brand Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <div className="w-6 h-6 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">ToDoSpace</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Still organizing the digital world, one task at a time ✨
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-red-500/10 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-pink-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-violet-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-40 right-10 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"></div>

      {/* Additional decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-violet-400 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-pink-400 rounded-full opacity-80 animate-pulse delay-500"></div>
    </div>
  );
};

export default Error;
