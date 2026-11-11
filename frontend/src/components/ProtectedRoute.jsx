import React, { useEffect, useState } from "react";
import API from "../services/Api";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/auth/profile")
      .then((response) => {
        setUser(response.data.userId);
        setLoading(false);
      })
      .catch((error) => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;