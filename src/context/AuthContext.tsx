import React, { createContext, useContext, useEffect, useState } from 'react';
import { products } from '../data/products';

interface AuthUser {
  name: string;
  email: string;
  phone: string;
  address: string;
  joinedAt: string;
  role: 'customer' | 'admin';
}

interface RegisteredAccount extends AuthUser {
  password: string;
}

interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
}

interface CreateOrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
}

interface UserOrder {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  paymentMethod: string;
  shippingAddress: string;
  items: OrderItem[];
  total: number;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isReady: boolean;
  orders: UserOrder[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  requestPasswordReset: (email: string) => Promise<boolean>;
  createOrder: (payload: { items: CreateOrderItem[]; shippingAddress: string; paymentMethod: string; total: number }) => string | null;
  logout: () => void;
  updateUserInfo: (updates: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_KEY = 'dorjighor-user';
const ORDER_KEY = 'dorjighor-orders';
const ACCOUNT_KEY = 'dorjighor-accounts';
const DEMO_EMAIL = 'demo@dorjighor.com';
const DEMO_PASSWORD = 'Demo@12345';
const ADMIN_EMAIL = 'admin@dorjighor.com';
const ADMIN_PASSWORD = 'Admin@12345';

function buildDemoAccount(): RegisteredAccount {
  return {
    name: 'Demo User',
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
    phone: '+8801XXXXXXXXX',
    address: 'Dhaka, Bangladesh',
    joinedAt: '2026-04-19',
    role: 'customer',
  };
}

function buildAdminAccount(): RegisteredAccount {
  return {
    name: 'Dorjighor Admin',
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    phone: '+8801700000000',
    address: 'Dorjighor Headquarters, Dhaka',
    joinedAt: '2026-04-19',
    role: 'admin',
  };
}

function toDisplayName(email: string) {
  const fallback = 'Dorji Customer';
  const localPart = email.split('@')[0];
  if (!localPart) return fallback;

  return localPart
    .split(/[._-]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function buildDemoOrders(): UserOrder[] {
  const first = products[0];
  const second = products[2] || products[1];

  if (!first || !second) return [];

  return [
    {
      id: 'DG-10293',
      date: '2026-03-14',
      status: 'Delivered',
      paymentMethod: 'Cash On Delivery',
      shippingAddress: 'Banani, Dhaka 1213',
      items: [
        {
          productId: first.id,
          name: first.name,
          image: first.image,
          price: first.price,
          quantity: 1,
          size: first.sizes?.[1] || first.sizes?.[0],
        },
      ],
      total: first.price,
    },
    {
      id: 'DG-10721',
      date: '2026-04-03',
      status: 'Shipped',
      paymentMethod: 'bKash',
      shippingAddress: 'Dhanmondi, Dhaka 1209',
      items: [
        {
          productId: second.id,
          name: second.name,
          image: second.image,
          price: second.price,
          quantity: 1,
          size: second.sizes?.[0],
        },
      ],
      total: second.price,
    },
  ];
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [accounts, setAccounts] = useState<RegisteredAccount[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    const storedOrders = localStorage.getItem(ORDER_KEY);
    const storedAccounts = localStorage.getItem(ACCOUNT_KEY);

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse saved user', error);
      }
    }

    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (error) {
        console.error('Failed to parse saved orders', error);
      }
    }

    if (storedAccounts) {
      try {
        setAccounts(JSON.parse(storedAccounts));
      } catch (error) {
        console.error('Failed to parse saved accounts', error);
      }
    } else {
      const seededAccounts = [buildDemoAccount(), buildAdminAccount()];
      setAccounts(seededAccounts);
      localStorage.setItem(ACCOUNT_KEY, JSON.stringify(seededAccounts));
    }

    setIsReady(true);
  }, []);

  const saveAccounts = (nextAccounts: RegisteredAccount[]) => {
    setAccounts(nextAccounts);
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(nextAccounts));
  };

  const toAuthUser = (account: RegisteredAccount): AuthUser => ({
    name: account.name,
    email: account.email,
    phone: account.phone,
    address: account.address,
    joinedAt: account.joinedAt,
    role: account.role,
  });

  const login = async (email: string, password: string) => {
    if (!email || !password) return false;

    const normalizedEmail = email.toLowerCase();
    const matchedAccount = accounts.find(
      (account) => account.email.toLowerCase() === normalizedEmail && account.password === password
    );

    if (!matchedAccount) return false;

    const nextUser = toAuthUser(matchedAccount);

    setUser(nextUser);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));

    if (orders.length === 0) {
      const seededOrders = buildDemoOrders();
      setOrders(seededOrders);
      localStorage.setItem(ORDER_KEY, JSON.stringify(seededOrders));
    }

    return true;
  };

  const register = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      return { success: false, message: 'All fields are required.' };
    }

    const normalizedEmail = email.toLowerCase();
    const exists = accounts.some((account) => account.email.toLowerCase() === normalizedEmail);

    if (exists) {
      return { success: false, message: 'An account already exists with this email.' };
    }

    const nextAccount: RegisteredAccount = {
      name,
      email: normalizedEmail,
      password,
      phone: '+8801XXXXXXXXX',
      address: 'Dhaka, Bangladesh',
      joinedAt: new Date().toISOString().split('T')[0],
      role: 'customer',
    };

    const nextAccounts = [...accounts, nextAccount];
    saveAccounts(nextAccounts);

    const nextUser = toAuthUser(nextAccount);
    setUser(nextUser);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));

    if (orders.length === 0) {
      const seededOrders = buildDemoOrders();
      setOrders(seededOrders);
      localStorage.setItem(ORDER_KEY, JSON.stringify(seededOrders));
    }

    return { success: true };
  };

  const requestPasswordReset = async (email: string) => {
    if (!email) return false;

    // Simulate successful email request while avoiding account enumeration.
    return true;
  };

  const createOrder = ({ items, shippingAddress, paymentMethod, total }: { items: CreateOrderItem[]; shippingAddress: string; paymentMethod: string; total: number }) => {
    if (!user || items.length === 0) return null;
    const orderId = `DG-${Date.now().toString().slice(-6)}`;

    const nextOrder: UserOrder = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      paymentMethod,
      shippingAddress,
      items,
      total,
    };

    const nextOrders = [nextOrder, ...orders];
    setOrders(nextOrders);
    localStorage.setItem(ORDER_KEY, JSON.stringify(nextOrders));

    return orderId;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('dorjighor-cart');
    localStorage.removeItem('dorjighor-wishlist');
  };

  const updateUserInfo = (updates: Partial<AuthUser>) => {
    if (!user) return;

    const nextUser = { ...user, ...updates };
    setUser(nextUser);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));

    const nextAccounts = accounts.map((account) =>
      account.email.toLowerCase() === user.email.toLowerCase()
        ? { ...account, ...updates }
        : account
    );
    saveAccounts(nextAccounts);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isReady,
        orders,
        login,
        register,
        requestPasswordReset,
        createOrder,
        logout,
        updateUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
