import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (req, res) {
	// if (req.method === "POST") {
	// 	const { body } = req;
	// 	const users = await prisma.users.findMany();
	// 	res.json(users);
	// }
}
