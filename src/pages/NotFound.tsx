import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-theme-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-theme-text mb-2">
            Page Not Found
          </h2>
          <p className="text-theme-muted">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-theme-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-200 font-medium"
        >
          <Home className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
