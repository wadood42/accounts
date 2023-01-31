import { NextPage } from "next";
import { useState, useContext } from "react";
import { Form } from "../components";
import { FormEvent } from "react";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../queries";
import { useCtx } from "../contexts/AuthContext";
import Router from "next/router";
import { Spinner } from "../components/Spinner";
import { SigninType } from "../types";

const Signin: NextPage = () => {
	const [errorMessage, setErrorMessage] = useState("");
	const authContext = useCtx();

	const [signin, { data, loading: mudationLoading }] = useMutation<SigninType>(
		SIGN_IN,
		{
			onError: (error) => {
				console.log("ERROR ON ERROR XXXX", error);
				setErrorMessage(error.message);
			},
			onCompleted: (data) => {
				console.log("on complete data", data);
				setErrorMessage("");
				authContext.authenticate(data.signin.token, data.signin.account);
				Router.push("/");
			},
		}
	);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			email: { value: string };
			password: { value: string };
		};
		signin({
			variables: {
				data: {
					email: target.email.value,
					password: target.password.value,
				},
			},
		});
	};

	if (authContext.loading) return <Spinner loading={authContext.loading} />;
	if (authContext.isAuthenticated) {
		Router.push("/");
	}

	return (
		<>
			<div className='w-full grid md:grid-cols-2 justify-center mx-auto md:items-center  max-w-6xl  '>
				<div className=' flex flex-col justify-center items-center gap-2 '>
					<h1 className='  text-light-blue  text-6xl font-bold   '>Upodify</h1>
					<p className=' text-sm text-center'>
						Connect with friends and the world around you on Facebook.
					</p>
				</div>
				<div className='rounded w-96 drop-shadow-lg'>
					<div className='flex flex-col items-center p-4 bg-white rounded   sm:rounded-tr-md shadow-md'>
						<div className=' border w-24 h-24 rounded-full  -mt-16 mb-4 bg-white'></div>
						<h1 className='text-center font-medium tracking-wider '>
							{mudationLoading ? "Signing..." : "Sign in"}
						</h1>
						<p className='text-xs text-gray-500'>
							Dont have an account?
							<Link href='/signup'>
								<a className=' font-bold px-1 text-light-blue '>Sign up</a>
							</Link>
						</p>
					</div>

					<Form
						errorMessage={errorMessage}
						onSubmit={handleSubmit}
						formType='signin'
					/>
				</div>
			</div>
		</>
	);
};

export default Signin;
