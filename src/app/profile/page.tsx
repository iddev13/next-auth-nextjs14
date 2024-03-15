import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';

export default async function Profile() {
	const session = await getServerSession(authOptions);

	return (
		<div>
			<h1>Profile of {session?.user?.email}</h1>
			{session?.user?.image && <img src={session.user.image} alt="" />}
		</div>
	);
}
