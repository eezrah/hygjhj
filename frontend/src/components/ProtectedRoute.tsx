import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { getAuthCache, CACHE_EXPIRY } from '../utils/authUtils';

interface ProtectedRouteProps {
  requiredRole?: number;
}

const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      console.log("ProtectedRoute: Checking authentication...");
      const currentTime = Date.now();
      const authCache = getAuthCache();
      
      // Check if we have a valid cached result
      if (authCache.lastChecked > 0 && 
          currentTime - authCache.lastChecked < CACHE_EXPIRY) {
        
        console.log("ProtectedRoute: Using cached auth result", authCache);
        // Use cached result if role matches
        if (!requiredRole || authCache.role === requiredRole) {
          setIsAuthenticated(authCache.isAuthenticated);
          setIsLoading(false);
          return;
        }
      }
      
      try {
        // Get user from localStorage
        const userString = localStorage.getItem('user');
        console.log("ProtectedRoute: User from localStorage:", userString);
        
        if (!userString) {
          console.log("ProtectedRoute: No user in localStorage");
          authCache.isAuthenticated = false;
          authCache.lastChecked = currentTime;
          setIsLoading(false);
          return;
        }

        // Verify token with server
        console.log("ProtectedRoute: Verifying token with server...");
        try {
          const response = await axios.get(
            'http://localhost:6003/api/student/verify',
            { withCredentials: true }
          );
          
          console.log("ProtectedRoute: Verification response:", response.data);

          if (response.data.success) {
            const user = JSON.parse(userString);
            console.log("ProtectedRoute: User object:", user);
            
            // Check role if required
            const hasCorrectRole = !requiredRole || user.roleid === requiredRole;
            console.log("ProtectedRoute: Has correct role:", hasCorrectRole, 
                        "Required:", requiredRole, "User role:", user.roleid);
            
            // Update cache
            authCache.isAuthenticated = hasCorrectRole;
            authCache.role = user.roleid;
            authCache.lastChecked = currentTime;
            
            setIsAuthenticated(hasCorrectRole);
          } else {
            console.log("ProtectedRoute: Token verification failed");
            localStorage.removeItem('user');
            authCache.isAuthenticated = false;
            authCache.lastChecked = currentTime;
          }
        } catch (verifyError) {
          console.error("ProtectedRoute: Verification request failed", verifyError);
          setError(`Verification failed: ${verifyError instanceof Error ? verifyError.message : String(verifyError)}`);
          
          // Check if we can navigate without server verification (for dev purposes)
          // You can remove this in production
          const user = JSON.parse(userString);
          const hasCorrectRole = !requiredRole || user.roleid === requiredRole;
          console.log("ProtectedRoute: Bypassing server verification due to error");
          console.log("User has required role:", hasCorrectRole);
          
          setIsAuthenticated(hasCorrectRole);
        }
      } catch (parseError) {
        console.error("ProtectedRoute: Error parsing user data", parseError);
        localStorage.removeItem('user');
        authCache.isAuthenticated = false;
        authCache.lastChecked = currentTime;
        setError(`Error parsing user data: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [requiredRole]);

  // Show loading spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show error if any
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-500 mb-4">Authentication Error: {error}</div>
        <button 
          className="bg-blue-600 text-white py-2 px-4 rounded"
          onClick={() => window.location.href = "/student/studentlogin"}
        >
          Return to Login
        </button>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log("ProtectedRoute: Not authenticated, redirecting to login");
    return <Navigate to="/student/studentlogin" replace />;
  }

  console.log("ProtectedRoute: Authenticated, rendering protected content");
  // Render child routes through Outlet
  return <Outlet />;
};

export default ProtectedRoute; 