// Import libraries
import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navigation = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div>
        {/* Navigation buttons */}
        <Link to="/" className="text-white mr-4">Home</Link>
        {isAuthenticated && (
          <>
            <Link to="/realtime" className="text-white mr-4">Realtime View</Link>
            <Link to="/sales-order" className="text-white mr-4">Sales Order</Link>
          </>
        )}
      </div>
      <div>
        {/* Conditional authentication buttons */}
        {!isAuthenticated ? (
          <>
            <button
              onClick={() => loginWithRedirect()}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Login
            </button>
            <button
              onClick={() => loginWithRedirect({ screen_hint: "signup" })}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Register
            </button>
          </>
        ) : (
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
