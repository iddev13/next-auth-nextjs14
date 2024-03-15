'use client';

import { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Field, FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
import { RiLockPasswordLine, RiUser3Line } from 'react-icons/ri';
import styles from './Form.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { blur, focus } from '@/utils/formActions';
import FormBtn from './FormBtn';
import { revalidatePath } from 'next/cache';

const validationSchema = yup.object().shape({
	email: yup.string().email().required('email обязательное поле'),
	password: yup
		.string()
		.required('Password обязательное поле')
		.min(8, 'Password должен содержать не менее 8 символов'),
});

const LoginForm = () => {
	const router = useRouter();
	const ref = useRef<HTMLFormElement | null>(null);
	const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false);

	const loginHandler = async (
		values: { email: string; password: string },
		actions: any
	) => {
		setIsLoadingForm(true);

		const data = {
			email: values.email,
			password: values.password,
			redirect: false,
		};

		try {
			const signInData = await signIn('credentials', data);

			if (!signInData?.ok) {
				setIsLoadingForm(false);
				console.log(signInData?.error);
				actions.resetForm();
				toast.error('Неправильный email или password');
			} else {
				setIsLoadingForm(false);
				toast.success('Welcome');
				setTimeout(() => {
					router.push('/profile');
					router.refresh();
				}, 2000);
			}
			console.log(signInData);
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
		},
		validationSchema: validationSchema,
		onSubmit: (values, actions) => {
			loginHandler(values, actions);
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
					<Link
						href={'./sign-up'}
						className="text-text-hover-color font-bold hover:text-text-hover-color1 transition-colors capitalize"
					>
						sign up
					</Link>
				</div>
				<FormBtn
					isEditing={false}
					isLoadingForm={isLoadingForm}
					isLogin={true}
				/>
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

export default LoginForm;
