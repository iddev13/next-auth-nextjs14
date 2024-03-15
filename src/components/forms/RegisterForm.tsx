'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Field, FormikProvider, useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	RiLockPasswordFill,
	RiLockPasswordLine,
	RiUser3Line,
} from 'react-icons/ri';
import * as yup from 'yup';
import styles from './Form.module.css';
import { blur, focus } from '@/utils/formActions';
import FormBtn from './FormBtn';

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
	confirmPassword: yup
		.string()
		.required()
		.min(8, 'Password must contain at least 8 characters')
		.test('passwords-match', 'Passwords must match', function (value) {
			return this.parent.password === value;
		}),
});

const RegisterForm = () => {
	const router = useRouter();
	const ref = useRef<HTMLFormElement | null>(null);
	const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false);

	const registerHandler = async (
		values: { email: string; password: string },
		actions: any
	) => {
		setIsLoadingForm(true);

		const payload = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: values.email,
				password: values.password,
			}),
		};

		try {
			const response = await fetch('/api/user', payload);
			console.log(response);

			if (response.ok) {
				setIsLoadingForm(false);
				toast.success('User was created)');
				setTimeout(() => {
					router.push('/sign-in');
				}, 1000);
			} else {
				setIsLoadingForm(false);
				console.error('Registration faled');
				toast.error('Registration faled');
				actions.resetForm();
			}
		} catch (error) {
			setIsLoadingForm(false);
			console.log(error);
			toast.error('Something went wrong...(((((((((((((');
		}
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values, actions) => {
			registerHandler(values, actions);
		},
	});

	return (
		<FormikProvider value={formik}>
			<form ref={ref} onSubmit={formik.handleSubmit} className={styles.form}>
				<div className={styles.form__item}>
					<div
						className={`${styles.inputWrapper}`}
						onFocus={(e) => focus(e, styles.active)}
						onBlur={(e) => blur(e, formik.values.email, styles.active)}
					>
						<span className={styles.inputWrapper__icon}>
							<RiUser3Line />
						</span>
						<label htmlFor="email">email</label>
						<Field
							style={
								formik.touched.email && formik.errors.email
									? { borderColor: 'red' }
									: {}
							}
							id="email"
							name="email"
							type="text"
							onChange={formik.handleChange}
							value={formik.values.email}
							error={
								formik.touched.email && Boolean(formik.errors.email).toString()
							}
							helpertext={formik.touched.email && formik.errors.email}
						/>
						{formik.touched.email && formik.errors.email && (
							<p className={styles.inputWrapper__text}>
								<span>{formik.errors.email}</span>
							</p>
						)}
					</div>
				</div>
				<div className={styles.form__item}>
					<div
						className={`${styles.inputWrapper}`}
						onFocus={(e) => focus(e, styles.active)}
						onBlur={(e) => blur(e, formik.values.password, styles.active)}
					>
						<span className={styles.inputWrapper__icon}>
							<RiLockPasswordLine />
						</span>
						<label htmlFor="password">Password</label>
						<Field
							style={
								formik.touched.password && formik.errors.password
									? { borderColor: 'red' }
									: {}
							}
							id="password"
							name="password"
							type="password"
							onChange={formik.handleChange}
							value={formik.values.password}
							error={
								formik.touched.password &&
								Boolean(formik.errors.password).toString()
							}
							helpertext={formik.touched.password && formik.errors.password}
						/>
						{formik.touched.password && formik.errors.password && (
							<p className={styles.inputWrapper__text}>
								<span>{formik.errors.password}</span>
							</p>
						)}
					</div>
				</div>
				<div className={styles.form__item}>
					<div
						className={`${styles.inputWrapper}`}
						onFocus={(e) => focus(e, styles.active)}
						onBlur={(e) => blur(e, formik.values.password, styles.active)}
					>
						<span className={styles.inputWrapper__icon}>
							<RiLockPasswordFill />
						</span>
						<label htmlFor="confirmPassword">Confirm Password</label>
						<Field
							style={
								formik.touched.confirmPassword && formik.errors.confirmPassword
									? { borderColor: 'red' }
									: {}
							}
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							onChange={formik.handleChange}
							value={formik.values.confirmPassword}
							error={
								formik.touched.confirmPassword &&
								Boolean(formik.errors.confirmPassword).toString()
							}
							helpertext={
								formik.touched.confirmPassword && formik.errors.confirmPassword
							}
						/>
						{formik.touched.confirmPassword &&
							formik.errors.confirmPassword && (
								<p className={styles.inputWrapper__text}>
									<span>{formik.errors.confirmPassword}</span>
								</p>
							)}
					</div>
				</div>
				<div className={styles.form__item}>
					<Link
						href={'./sign-in'}
						className="text-text-hover-color font-bold hover:text-text-hover-color1 transition-colors capitalize"
					>
						sign in
					</Link>
				</div>
				<FormBtn isEditing={false} isLoadingForm={isLoadingForm} />
			</form>
			<ToastContainer
				position="top-center"
				hideProgressBar={true}
				theme={'dark'}
				autoClose={3000}
			/>
		</FormikProvider>
	);
};

export default RegisterForm;
