// Import libraries
import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

// Load environment variables
// const domain = import.meta.env.VITE_AUTH0_DOMAIN;
// const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate();

  // Function triggered after Auth0 redirects back
  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || "/");
  };

  return (
    <Auth0Provider
    domain={process.env.VITE_AUTH0_DOMAIN}
    clientId={process.env.VITE_AUTH0_CLIENT_ID}// Use clientId from .env
      authorizationParams={{
        redirect_uri: window.location.origin, // Redirect to the base URL
      }}
      onRedirectCallback={onRedirectCallback} // Handle post-login redirects
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
