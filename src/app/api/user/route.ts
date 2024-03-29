import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import * as yup from 'yup';

interface IUser {
	email: string;
	password: string;
}

const validationSchema = yup.object().shape({
	email: yup
		.string()
		.email()
		.required('email is required')
		.min(2, 'email must contain at least 2 characters'),
	password: yup
		.string()
		.required()
		.min(8, 'Password must contain at least 8 characters'),
});

export async function POST(req: Request) {
	try {
		const body = await req.json();
		console.log({ body });

		const { email, password } = validationSchema.cast(body);
		// check if email already exists
		const existingUserByemail = await db.user.findFirst({
			where: { email: email },
		});

		if (existingUserByemail) {
			return NextResponse.json(
				{ user: null, message: 'User with this email already exists' },
				{ status: 409 }
			);
		}

		const hashpassword = await hash(password, 10);
		const newUser = await db.user.create({
			data: {
				email,
				password: hashpassword,
			},
		});

		const { password: newUserPassword, ...rest } = newUser;

		return NextResponse.json(
			{ user: rest, message: 'User created successfully' },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: 'Somthing went wrong...' },
			{ status: 500 }
		);
	}
}
