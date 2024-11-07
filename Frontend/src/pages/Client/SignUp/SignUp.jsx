import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function ClientSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;
    if (!name || !email || !password || !confirmPassword) {
      return "All fields are required";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    // Add additional validation logic (e.g., email regex) if necessary
    return "";
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitted(true);
    setErrorMessage("");

    // Add logic to submit form data to backend
    try {
      const response=await axios.post("http://localhost:4000/api/auth/register",
        formData
      )
      console.log(response.data,"res");
      
  
      navigate("/login");
      
    } catch (error) {
      console.log(error);
      
    }

    // Example: Redirect to login page after successful signup
    navigate("/ClientProfile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">Sign Up</h1>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
          >
            {isSubmitted ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="border border-gray-300 my-3" ></div>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/ClientLogin" className="text-orange-500 hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClientSignup;