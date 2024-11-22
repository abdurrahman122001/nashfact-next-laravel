// "use client";

// import React, { createContext, useState, useContext, useEffect } from "react";
// import { useRouter } from "next/navigation";

// interface AuthContextProps {
//   isAuthenticated: boolean;
//   user: any;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState<any>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       fetch("http://127.0.0.1:8000/api/user", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.id) {
//             setIsAuthenticated(true);
//             setUser(data);
//           } else {
//             logout();
//           }
//         })
//         .catch(() => logout());
//     }
//   }, []);

//   const login = async (email: string, password: string) => {
//     const response = await fetch("http://127.0.0.1:8000/api/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) {
//       throw new Error("Login failed");
//     }

//     const data = await response.json();
//     localStorage.setItem("token", data.token);
//     setUser(data.user);
//     setIsAuthenticated(true);
//     router.push("/");
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setIsAuthenticated(false);
//     setUser(null);
//     router.push("/auth/signin");
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
