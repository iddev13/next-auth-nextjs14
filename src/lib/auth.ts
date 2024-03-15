import { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { db } from './db';

export const authOptions: NextAuthOptions = {
	pages: {
		signIn: '/sign-in',
	},

	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'john.example@gmail.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				console.log('credentials', credentials);

				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const existingUser = await db.user.findFirst({
					where: {
						email: credentials?.email,
					},
				});

				if (!existingUser) {
					return null;
				}

				const passwordMatch = await compare(
					credentials?.password,
					existingUser.password
				);

				if (!passwordMatch) {
					return null;
				}

				return {
					email: existingUser.email,
					role: existingUser.role,
					userId: existingUser.id,
				} as User;
			},
		}),
	],
	session: {
		maxAge: 24 * 60 * 60, // 24 hours
	},
	jwt: {
		maxAge: 24 * 60 * 60, // 24 hours
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				return {
					...token,
					email: user.email,
					role: user.role,
					userId: user.userId,
				};
			}
			return token;
		},
		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					email: token.email,
					role: token.role,
					userId: token.userId,
				},
			};
		},
	},
};

enum Role {
	ADMIN,
	USER,
}
