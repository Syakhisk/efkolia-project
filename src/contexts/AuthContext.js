import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	// const [record, setRecord] = useState({});
	const [loading, setLoading] = useState(true);

	//change these methods' return value if we wanted to change db
	async function signup(email, password, firstName, lastName = "") {
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

	function changeEmail(newEmail){

	}

	async function changePassword(newPassword){
		const user = auth.currentUser;
		await user.updatePassword(newPassword)
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logout() {
		return auth.signOut();
	}

	useEffect(() => {
		const getRecord = async (email) => {
			const collection = db.collection("users");
			const instance = await collection.where("_email", "==", email).get();
			return instance.docs[0].data();
		};

		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const record = await getRecord(user.email)
				setCurrentUser({ ...user, ...record });
			} else {
				setCurrentUser(user);
			}
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signup,
		changePassword,
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
