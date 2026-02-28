import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isLoggedIn } from "../utils/authStorage";

export default function AuthLayout() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const status = await isLoggedIn();
      setLoggedIn(status);
      setLoading(false);
    };

    checkLogin();
  }, []);

  // wait until login check completes
  if (loading) 
    {
      return null;
    }


  // if logged in → redirect
  if (loggedIn) 
  {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Outlet />
    </div>
  );
}
