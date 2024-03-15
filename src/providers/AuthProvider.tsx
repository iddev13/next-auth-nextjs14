'use client';

import { FC } from 'react';
import { SessionProvider } from 'next-auth/react';

interface IAuthProvider {
	children: React.ReactNode;
}

const AuthProvider: FC<IAuthProvider> = ({ children }) => {
	return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
