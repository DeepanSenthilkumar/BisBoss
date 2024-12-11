// Import libraries and components
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
import Home from "./pages/Home";
import RealtimeView from "./pages/RealtimeView";
import SalesOrderForm from "./pages/SalesOrderForm";
import UserDetailsForm from "./pages/UserDetailsForm";

function App() {
  return (
    <Router>
      {/* Wrap the app in Auth0Provider for authentication */}
      {/* <Auth0ProviderWithHistory> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/realtime" element={<RealtimeView />} />
          <Route path="/sales-order" element={<SalesOrderForm />} />
          <Route path="/user-details" element={<UserDetailsForm />} />
        </Routes>
      {/* </Auth0ProviderWithHistory> */}
    </Router>
  );
}

export default App;
