import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const saltRounds = 5;

export default async function signup(req, res) {
	// console.log(req);
	const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

	try {
		const newUser = await prisma.users.create({
			data: {
				email: req.body.email,
				username: req.body.username,
				password: hashedPassword,
				first_name: req.body.firstName,
				last_name: req.body.lastName,
			},
		});
		res.status(200).json(newUser);
	} catch (error) {
		res
			.status(400)
			.json({ message: "Invalid data input, email/username probably exists" });
	}
}
