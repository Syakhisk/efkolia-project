import React from "react";
// import { dbFunc } from "../contexts/AuthContext";
import { db } from "../firebase";

function Test() {
	// const database = (collection, doc) => {
	// 	db.get()
	// 		.collection(collection)
	// 		.doc(doc)
	// 		.then((doc) => {
	// 			const data = doc.data();
	// 			console.log(data);
	// 		});
	// };
	const [pengguna, setPengguna] = React.useState([]);

	React.useEffect(() => {
		const fetchData = async () => {
			const penggunaRef = db.collection("pengguna");
			const snapshot = await penggunaRef.get();
			// const snapshot = await penggunaRef.where("nama", "==", "mamank").get();

			// setPengguna(snapshot.forEach((doc) => doc.data()));
			// snapshot.forEach((doc) => {
				console.log(snapshot)
			// 	console.log(doc.id, "=>", doc.data());
			// });
		};
		fetchData();
	}, []);

	return (
		<>
			<div>this is test</div>
			<ul>{/* {pengguna.map((p, idx) => (
					<li key={idx}>{p.nama}</li>
				))} */}</ul>
		</>
	);
}

export default Test;
