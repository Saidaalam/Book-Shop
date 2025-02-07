
export interface User {
    email: string;
    role: "admin" | "user";
  }
  
  // Get current user from localStorage
  export const getCurrentUser = (): User | null => {
    return JSON.parse(localStorage.getItem("user") || "null");
  };
  
  // Simulate login (Call this function after successful login)
  export const login = (email: string, role: "admin" | "user") => {
    localStorage.setItem("user", JSON.stringify({ email, role }));
  };
  
  // Logout function
  export const logout = () => {
    localStorage.removeItem("user");
  };
  