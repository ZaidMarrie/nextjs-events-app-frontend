import { useRouter } from "next/router";
import { useState, useEffect, createContext } from "react";
import { NEXT_URL } from "../config";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const router = useRouter();

	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		checkUserLoggedIn();
	}, []);

	// Register user
	const register = async (user) => {
		const res = await fetch(`${NEXT_URL}/api/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		const data = await res.json();

		if (res.ok) {
			setUser(data.user);
			router.push("/account/dashboard");
		} else {
			setError(data.message);
			setTimeout(() => setError(null), 0);
		}
	};

	// Login user
	const login = async ({ email: identifier, password }) => {
		const res = await fetch(`${NEXT_URL}/api/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ identifier, password }),
		});
		const data = await res.json();

		if (res.ok) {
			setUser(data.user);
			router.push("/account/dashboard");
		} else {
			setError(data.message);
			setTimeout(() => setError(null), 0);
		}
	};

	// Logout user
	const logout = async () => {
		const res = await fetch(`${NEXT_URL}/api/logout`, {
			method: "POST",
		});

		if (res.ok) {
			setUser(null);
			router.push("/");
		}
	};

	// Check if user is logged in
	const checkUserLoggedIn = async (user) => {
		const res = await fetch(`${NEXT_URL}/api/user`);
		const data = await res.json();

		if (res.ok) {
			setUser(data.user);
			router.push("/account/dashboard");
		} else {
			setUser(null);
		}
	};

	return (
		<AuthContext.Provider value={{ user, error, register, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
