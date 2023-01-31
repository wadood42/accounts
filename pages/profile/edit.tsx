import { NextPage } from "next";
import { useMutation } from "@apollo/client";
import { useCtx } from "../../contexts/AuthContext";
import { UPDATE_ACCOUNT } from "../../queries";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserCtx } from "../../components/CurrentUserProvider";
import { Spinner } from "../../components";
import { useState } from "react";
import Router from "next/router";
import { Profile, Address } from "@prisma/client";
import { CurrentUserType } from "../../types";
type UpdateDataType = {
	first_name?: string;
	last_name?: string;
	age?: number;
	gender?: string;
	job?: string;
	description?: string;
	profile_image_url?: string;
	country?: string;
	state?: string;
	city?: string;
};

const Edit: NextPage = () => {
	const [updateData, setUpdateData] = useState<UpdateDataType | null>(
		{} as UpdateDataType
	);
	const auth = useCtx();
	const currentUser = useUserCtx();
	const { email, loading, profile } = currentUser;

	const [updateAccount, { data, loading: updateLoading, error }] = useMutation<{
		updateAccount: Partial<CurrentUserType>;
	}>(UPDATE_ACCOUNT, {
		onCompleted: (data) => {
			console.log("data after update", data.updateAccount);
			currentUser.updateAccount(data.updateAccount);
			Router.push(`/profile/${auth.user?.account_id}`);
		},
	});
	if (loading) return <Spinner loading={loading} />;

	function handleChange(
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) {
		setUpdateData((updateData) => {
			return {
				...updateData,
				[e.target.name]:
					e.target.name === "age" ? Number(e.target.value) : e.target.value,
			};
		});
	}

	function handleSubmit() {
		console.log("update data", updateData);
		updateAccount({
			variables: {
				data: {
					...updateData,
				},
			},
		});
	}
	return (
		<div className=' w-full flex flex-col items-center  pb-20'>
			<div className='w-3/4 '>
				<h1 className=' text-2xl font-semibold py-4'>Edit page for {email}</h1>
			</div>

			<div className='w-full sm:w-3/4 sm:max-w-lg border'>
				<form className=' p-2  space-y-4'>
					<div className=' p-4 bg-white space-y-2 rounded'>
						<h1
							className='font-bold text-lg py-4 text-center
						'
						>
							User
						</h1>
						<div className='w-full flex  flex-col space-y-1'>
							<label htmlFor='first-name' className=' font-semibold'>
								First name
							</label>
							<input
								type='text'
								value={updateData?.first_name}
								id='first-name'
								onChange={(e) => handleChange(e)}
								className='text-sm bg-light-gray  p-2 rounded'
								name='first_name'
								placeholder={profile.first_name}
							/>
						</div>

						<div className='w-full flex  flex-col space-y-1'>
							<label htmlFor='last-name' className=' font-semibold'>
								Last name
							</label>
							<input
								type='text'
								value={updateData?.last_name}
								id='last-name'
								className='text-sm bg-light-gray  p-2 rounded'
								name='last_name'
								onChange={handleChange}
								placeholder={currentUser.profile.last_name}
							/>
						</div>

						<div className='w-full flex  flex-col space-y-1'>
							<label htmlFor='job' className=' font-semibold'>
								Job
							</label>
							<input
								type='text'
								value={updateData?.job}
								id='job'
								name='job'
								onChange={handleChange}
								className='text-sm bg-light-gray  p-2 rounded'
								placeholder={currentUser.profile.job}
							/>
						</div>
						<div className='w-full flex  flex-col space-y-1'>
							<label htmlFor='age' className=' font-semibold'>
								Age
							</label>
							<input
								type='text'
								name='age'
								value={updateData?.age}
								id='age'
								onChange={handleChange}
								className='text-sm bg-light-gray  p-2 rounded'
								placeholder={String(currentUser.profile.age)}
							/>
						</div>
						<div className='w-full flex  flex-col space-y-1'>
							<label htmlFor='description' className=' font-semibold'>
								Description
							</label>
							<textarea
								value={updateData?.description}
								id='description'
								className='text-sm bg-light-gray  p-2 rounded'
								name='description'
								onChange={(e) => handleChange(e)}
								placeholder={currentUser.profile.description}
							/>
						</div>
					</div>
					<div className='h-96 border'>
						<h1>Profile image</h1>
					</div>

					<div className=' bg-white p-4 rounded'>
						<h1 className='font-bold text-lg py-4 text-center'>Adrees</h1>

						<div className='w-full flex  flex-col space-y-1'>
							<label htmlFor='country' className=' font-semibold'>
								Country
							</label>
							<input
								type='text'
								value={updateData?.country}
								id='country'
								name='country'
								className='text-sm bg-light-gray  p-2 rounded'
								placeholder={currentUser.profile.address.country}
								onChange={handleChange}
							/>
						</div>
						<div className='w-full flex  flex-col space-y-1'>
							<label htmlFor='country' className=' font-semibold'>
								State
							</label>
							<input
								type='text'
								value={updateData?.state}
								id='state'
								className='text-sm bg-light-gray  p-2 rounded'
								placeholder={currentUser.profile.address.state}
								name='state'
								onChange={handleChange}
							/>
						</div>
						<div className='w-full flex  flex-col space-y-1'>
							<label htmlFor='city' className=' font-semibold'>
								City
							</label>
							<input
								name='city'
								type='text'
								value={updateData?.city}
								id='city'
								className='text-sm bg-light-gray  p-2 rounded'
								placeholder={currentUser.profile.address.city}
								onChange={handleChange}
							/>
						</div>
					</div>
				</form>
			</div>
			<div className='fixed bottom-0 w-full'>
				<button
					className='hover:bg-light-blue w-full bg-blue text-white p-2  transition duration-300'
					type='submit'
					onClick={handleSubmit}
				>
					{updateLoading ? "updating..." : "Update"}
				</button>
				<ToastContainer />
			</div>
		</div>
	);
};

export default Edit;
