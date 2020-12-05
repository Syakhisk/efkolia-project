import React, { useContext, useEffect, useState } from "react";
import { auth, db, FieldValue } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
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

	function changeEmail(newEmail) {}

	async function changePassword(newPassword) {
		const user = auth.currentUser;
		await user.updatePassword(newPassword);
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logout() {
		return auth.signOut();
	}

	async function addEntry(type, data) {
		const user = db.collection("users").doc(currentUser.docId);
		if (type === "task") {
			await user.update({ tasks: FieldValue.arrayUnion(data) });
		} else if (type === "agenda") {
			await user.update({ agendas: FieldValue.arrayUnion(data) });
		}
		return type;
	}

	async function getClassName(classCode) {
		const className = await db
			.collection("users")
			.doc(currentUser.docId)
			.where("classCodes", "array-contains", "wp")
			.get();

		className.forEach((classItem) => console.log(classItem.data()));

		return className;
	}

	useEffect(() => {
		const getRecord = async (email) => {
			const collection = db.collection("users");
			const instance = await collection.where("_email", "==", email).get();
			const returnVal = {
				...instance.docs[0].data(),
				docId: instance.docs[0].id,
			};
			return returnVal;
		};

		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const record = await getRecord(user.email);
				setCurrentUser({ ...user, ...record });
			} else {
				setCurrentUser(user);
			}
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	useEffect(() => {
		if (currentUser) {
			const unsubscribe = db
				.collection("users")
				.where("_email", "==", currentUser._email)
				.onSnapshot((querySnapshot) => {
					querySnapshot.docChanges().forEach((change) => {
						if (change.type === "modified") {
							console.log("changes:", change.doc.data());
							setCurrentUser({ ...currentUser, ...change.doc.data() });
						}
					});
				});
			return unsubscribe;
		}
	}, [currentUser]);

	const value = {
		currentUser,
		getClassName,
		signup,
		changePassword,
		login,
		logout,
		addEntry,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
