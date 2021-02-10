import { PrismaClient } from "@prisma/client";

function user(props) {
	return <div>{JSON.stringify(props)}</div>;
}

export default user;

export const getServerSideProps = async () => {
	const prisma = new PrismaClient();
	const users = await prisma.users.findMany({

	});
	// const json = JSON.stringify(users);
	return { props: { users } };
};
