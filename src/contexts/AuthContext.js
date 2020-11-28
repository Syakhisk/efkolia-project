import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	//change these methods' return value if we wanted to change db
	async function signup(email, password, firstName, lastName = '') {
		await auth.createUserWithEmailAndPassword(email, password);
		await db.collection("users").add({
			_email: email,
			_firstName: firstName,
			_lastName: lastName,
			classes: [],
			tasks: [],
			agendas: [],
		});
	}

	async function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	async function logout() {
		return auth.signOut();
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signup,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
