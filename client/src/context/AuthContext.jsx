import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>
{
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 NEW

  useEffect(() =>
  {
    const storedUser = localStorage.getItem("user");

    if (storedUser)
    {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false); // 🔥 IMPORTANT
  }, []);

  const loginUser = (data) =>
  {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () =>
  {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};