import React, { useContext, useEffect, useState } from "react";
import { auth, db, FieldValue } from "../firebase";
// eslint-disable-next-line

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	// eslint-disable-next-line
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

	// eslint-disable-next-line
	async function changeEmail(email, password, newEmail) {
		await auth.signInWithEmailAndPassword(email, password);
		const userAuth = auth.currentUser;
		const user = db.collection("users").doc(currentUser.docId);
		await userAuth.updateEmail(newEmail);
		await user.update({ _email: newEmail });
	}

	async function changePassword(email, password, newPassword) {
		await auth.signInWithEmailAndPassword(email, password);
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

	async function updateEntry(type, newData, oldData) {
		const user = db.collection("users").doc(currentUser.docId);
		if (type === "task") {
			await user.update({ tasks: FieldValue.arrayRemove(oldData) });
			await user.update({ tasks: FieldValue.arrayUnion(newData) });
		} else if (type === "agenda") {
			await user.update({ agendas: FieldValue.arrayRemove(oldData) });
			await user.update({ agendas: FieldValue.arrayUnion(newData) });
		}
		return type;
	}

	async function editProfile(firstName, lastName) {
		const user = db.collection("users").doc(currentUser.docId);
		await user.update({ _firstName: firstName, _lastName: lastName });
	}

	async function addClass(data) {
		const user = db.collection("users").doc(currentUser.docId);
		await user.update({ classes: FieldValue.arrayUnion(data) });
	}

	async function removeClass(data) {
		const user = db.collection("users").doc(currentUser.docId);
		await user.update({ classes: FieldValue.arrayRemove(data) });
	}

	async function getClassData(classCode) {
		const user = await db.collection("users").doc(currentUser.docId).get();

		const data = user.data();
		const filteredArray = data.classes.find((el) => el.classCode === classCode);

		return filteredArray;
	}

	async function getUserClasses() {
		await db
			.collection("users")
			.doc(currentUser.docId)
			.collection("classes")
			.get();
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
							// console.log("changes:", change.doc.data());
							setCurrentUser({ ...currentUser, ...change.doc.data() });
						}
					});
				});
			return unsubscribe;
		}
	}, [currentUser]);

	const value = {
		currentUser,
		getClassData,
		getUserClasses,
		signup,
		editProfile,
		changePassword,
		changeEmail,
		login,
		logout,
		addEntry,
		updateEntry,
		addClass,
		removeClass,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
