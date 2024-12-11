// import React, { useEffect } from "react";
// import { useAuth0 } from "@auth0/auth0-react"; // Import the Auth0 hook
// import { useHistory } from "react-router-dom"; // Import useHistory for programmatic navigation
// import Navigation from "../components/Navigation"; // Navigation component

// const Home = () => {
//   const { user, isAuthenticated, isLoading } = useAuth0(); // Destructure the useAuth0 hook
//   const history = useHistory(); // Hook to handle programmatic navigation

//   // Effect hook to redirect to user details form after first registration
//   useEffect(() => {
//     if (!isLoading && isAuthenticated) {
//       // Check if the user is authenticated and not loading
//       if (user?.app_metadata?.first_login) {
//         // Redirect to user details form if first_login is true
//         history.push("/user-details");
//       }
//     }
//   }, [isAuthenticated, isLoading, user, history]);

//   if (isLoading) {
//     return <div>Loading...</div>; // Show a loading message while checking auth state
//   }

//   return (
//     <div>
//       <Navigation />
//       <div className="p-8">
//         {!isAuthenticated ? (
//           <div>
//             <h1 className="text-2xl">Welcome! Please log in or register.</h1>
//             <div>
//               {/* Add login and register buttons here */}
//               <button className="btn btn-primary">Login</button>
//               <button className="btn btn-secondary">Register</button>
//             </div>
//           </div>
//         ) : (
//           <div>
//             <h1 className="text-2xl">Welcome back, {user?.name}!</h1>
//             {/* Add your user authenticated content here */}
//             <div>
//               {/* Your authenticated content goes here */}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;



import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react"; // Import the Auth0 hook
import { useNavigate } from "react-router-dom"; // Use `useNavigate` for programmatic navigation
import Navigation from "../components/Navigation"; // Navigation component (optional)

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0(); // Destructure the useAuth0 hook
  const navigate = useNavigate(); // Use `useNavigate` for programmatic navigation

  // Effect hook to redirect to user details form after first registration
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // Check if the user is authenticated and not loading
      if (user?.app_metadata?.first_login) {
        // Redirect to user details form if first_login is true
        navigate("/user-details");
      }
    }
  }, [isAuthenticated, isLoading, user, navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading message while checking auth state
  }

  return (
    <div>
      <Navigation />
      <div className="p-8">
        {!isAuthenticated ? (
          <div>
            <h1 className="text-2xl">Welcome! Please log in or register.</h1>
            <div>
              {/* Login and Register buttons */}
              <button className="btn btn-primary">Login</button>
              <button className="btn btn-secondary">Register</button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl">Welcome back, {user?.name}!</h1>
            {/* User authenticated content */}
            <div>
              {/* Your authenticated content goes here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
