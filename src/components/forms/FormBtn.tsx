'use client';

import { FC } from 'react';
import { RotatingLines } from 'react-loader-spinner';

interface IFormBtn {
	isLoadingForm: boolean;
	isEditing: boolean;
	isLogin?: boolean;
}

const FormBtn: FC<IFormBtn> = ({ isEditing, isLoadingForm, isLogin }) => {
	return (
		<button
			type="submit"
			disabled={isLoadingForm}
			className="inline-flex flex-nowrap items-center capitalize  bg-sky-600"
		>
			{isLoadingForm && (
				<span className="inline-flex items-center">
					<RotatingLines
						visible={true}
						width="16"
						strokeWidth="5"
						animationDuration="0.75"
						ariaLabel="rotating-lines-loading"
						strokeColor="white"
					/>
					&nbsp;Loading...
				</span>
			)}
			{isLogin
				? !isLoadingForm && 'enter'
				: isEditing
				? !isLoadingForm && 'edit'
				: !isLoadingForm && 'create'}
		</button>
	);
};

export default FormBtn;
