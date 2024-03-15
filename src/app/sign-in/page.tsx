import { GoogleButton } from '@/components/GoogleButton';
import LoginForm from '@/components/forms/LoginForm';

export default async function Signin() {
	return (
		<div className="stack container">
			<h1>SignIn</h1>
			<GoogleButton />
			<div>or</div>
			<LoginForm />
		</div>
	);
}
