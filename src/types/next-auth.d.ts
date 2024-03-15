import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
	interface Session {
		user: {
			email: string;
			role: Role;
			userId: string;
			name: string;
			image: any;
		};
	}

	interface User extends DefaultUser {
		email: string;
		role: string;
		userId: string;
		name: string;
		image: any;
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		email: string;
		role: string;
		userId: string;
		name: string;
		image: any;
	}
}
