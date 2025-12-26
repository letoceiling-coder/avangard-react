import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface ViewedProperty {
  id: string;
  title: string;
  price: number;
  image: string;
  address: string;
  viewedAt: string;
}

export interface Application {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  propertyPrice: number;
  status: "pending" | "viewed" | "accepted" | "rejected";
  createdAt: string;
  message?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  viewHistory: ViewedProperty[];
  addToViewHistory: (property: Omit<ViewedProperty, "viewedAt">) => void;
  clearViewHistory: () => void;
  applications: Application[];
  addApplication: (application: Omit<Application, "id" | "status" | "createdAt">) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated users database
const USERS_STORAGE_KEY = "livegrid_users";
const CURRENT_USER_KEY = "livegrid_current_user";
const VIEW_HISTORY_KEY = "livegrid_view_history";
const APPLICATIONS_KEY = "livegrid_applications";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewHistory, setViewHistory] = useState<ViewedProperty[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    const savedHistory = localStorage.getItem(VIEW_HISTORY_KEY);
    if (savedHistory) {
      setViewHistory(JSON.parse(savedHistory));
    }

    const savedApplications = localStorage.getItem(APPLICATIONS_KEY);
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }

    setIsLoading(false);
  }, []);

  const getUsers = (): Record<string, { password: string; user: User }> => {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : {};
  };

  const saveUsers = (users: Record<string, { password: string; user: User }>) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers();
    const userRecord = users[email.toLowerCase()];

    if (!userRecord) {
      return { success: false, error: "Пользователь не найден" };
    }

    if (userRecord.password !== password) {
      return { success: false, error: "Неверный пароль" };
    }

    setUser(userRecord.user);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userRecord.user));
    return { success: true };
  };

  const register = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers();
    
    if (users[email.toLowerCase()]) {
      return { success: false, error: "Пользователь с таким email уже существует" };
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email: email.toLowerCase(),
      name,
      createdAt: new Date().toISOString(),
    };

    users[email.toLowerCase()] = { password, user: newUser };
    saveUsers(users);

    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

    // Update in users database
    const users = getUsers();
    if (users[user.email]) {
      users[user.email].user = updatedUser;
      saveUsers(users);
    }
  };

  const addToViewHistory = (property: Omit<ViewedProperty, "viewedAt">) => {
    setViewHistory(prev => {
      // Remove if already exists
      const filtered = prev.filter(p => p.id !== property.id);
      const newHistory = [{ ...property, viewedAt: new Date().toISOString() }, ...filtered].slice(0, 50);
      localStorage.setItem(VIEW_HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearViewHistory = () => {
    setViewHistory([]);
    localStorage.removeItem(VIEW_HISTORY_KEY);
  };

  const addApplication = (application: Omit<Application, "id" | "status" | "createdAt">) => {
    const newApplication: Application = {
      ...application,
      id: crypto.randomUUID(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setApplications(prev => {
      const updated = [newApplication, ...prev];
      localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        viewHistory,
        addToViewHistory,
        clearViewHistory,
        applications,
        addApplication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
