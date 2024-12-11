// // Import libraries
// import React, { useState } from "react";
// import axios from "axios";
// import { useAuth0 } from "@auth0/auth0-react";
// import Navigation from "../components/Navigation";

// const UserDetailsForm = () => {
//   const { user } = useAuth0();
//   const [formData, setFormData] = useState({
//     userID: "",
//     name: "",
//     shopName: "",
//     email: user?.email || "",
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/users/signup", formData);
//       alert("Details saved successfully!");
//       window.location.href = "/";
//     } catch (error) {
//       console.error("Error saving details:", error);
//       alert("Error saving details. Try again.");
//     }
//   };

//   return (
//     <div>
//       <Navigation />
//       <div className="p-8">
//         <h1 className="text-2xl mb-4">Complete Your Details</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Form fields */}
//           <input type="text" name="userID" placeholder="User ID" onChange={handleChange} />
//           {/* Repeat for name and shopName */}
//           <button>Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserDetailsForm;



import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react"; // Import the Auth0 hook
import axios from "axios"; // For making HTTP requests to save user data

const UserDetailsForm = () => {
  const { user } = useAuth0(); // Access authenticated user
  const [formData, setFormData] = useState({
    userID: user?.sub || "",
    name: user?.name || "",
    shopName: "",
    email: user?.email || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send user data to your backend (replace with your actual API endpoint)
      await axios.post("http://localhost:5000/api/users/signup", formData);
      alert("User details submitted successfully");
      // Redirect user to home page after submission
      window.location.href = "/"; 
    } catch (error) {
      console.error("Error submitting user details:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl">Please fill in your details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            name="userID"
            value={formData.userID}
            onChange={handleChange}
            disabled
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Shop Name:</label>
          <input
            type="text"
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default UserDetailsForm;
