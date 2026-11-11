import React, { useEffect, useState } from "react";
import API from "../services/Api";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null)

  useEffect(() => {
    API.get("/auth/profile")
      .then((response) => {
        setUser(response.data.userId);
        setRole(response.data.role)
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
  if(role !== "admin"){
    return <Navigate to="/products"/>;

  }

  return children;
};

export default AdminRoute;