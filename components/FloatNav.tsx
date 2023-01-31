import { CgMenuGridO } from "react-icons/cg";
import { useState } from "react";
import Link from "next/link";
import { useCtx } from "../contexts/AuthContext";
import { AiOutlineHome } from "react-icons/ai";
import { RiUserLine, RiLogoutCircleRLine } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";
import { FaHeartBroken } from "react-icons/fa";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { apolloClient } from "../lib/apolloClient";
const FloatNav = () => {
	const router = useRouter();
	const userid = router.query.userid as string;
	console.log("router in float nva", router);
	const authCtx = useCtx();
	const [showNav, setShowNav] = useState(false);
	return (
		<div>
			<div className='  fixed bottom-12 right-4 flex justify-center items-center w-12 transition-all duration-300 ease-linear hover:p-1  cursor-pointer avatar aspect-square rounded-full bg-blue-light  '>
				<CgMenuGridO
					size={40}
					color='#4663e3'
					onClick={() => setShowNav(!showNav)}
					// onMouseLeave={() => setShowNav(false)}
				/>
			</div>
			{showNav && (
				<div
					className=' fixed w-full h-full z-10 overflow-auto bg-modal'
					onClick={() => setShowNav(false)}
				>
					<div className=' sm:right-4 fixed bottom-20 right-6  p-2  flex flex-col items-center justify-end bg-  gap-2 '>
						<div className=' w-full text-sm '>
							<ul className='flex flex-col gap-1 mx-auto'>
								<li className='rounded-md bg-gray-light flex   items-center p-1 text-center hover:bg-blue transition-all duration-100 ease-linear hover:text-white cursor-pointer '>
									<span className='s'>
										<AiOutlineHome color='#28ed3c' />
									</span>
									<Link href='/'>
										<a className='px-2'>Home</a>
									</Link>
								</li>
								<li className='rounded-md bg-gray-light flex items-center p-1   text-center hover:bg-blue transition-all duration-100 ease-linear hover:text-white cursor-pointer '>
									<span>
										<RiUserLine color='#10e2e6' />
									</span>
									<Link href={`/profile/${authCtx.user?.account_id}`}>
										<a className='px-2  '>Profile</a>
									</Link>
								</li>
								<li className='rounded-md bg-gray-light p-1 flex  items-center text-center hover:bg-blue transition-all duration-100 ease-linear hover:text-white cursor-pointer '>
									<span>
										<BsFillSuitHeartFill color='#f2070f' />
									</span>
									<Link href='/matches'>
										<a className='px-2'>Matches</a>
									</Link>
								</li>

								<li className='rounded-md bg-gray-light  p-1 text-center flex items-center hover:bg-blue transition-all duration-100 ease-linear hover:text-white cursor-pointer '>
									<span>
										<TiMessages color='#eb269c' />
									</span>
									<Link href='/direct'>
										<a className='px-2'>Messages</a>
									</Link>
								</li>
								<li className='rounded-md bg-gray-light p-1   text-center flex items-center hover:bg-blue transition-all duration-100 ease-linear hover:text-white cursor-pointer '>
									<span>
										<FaHeartBroken color='red' />
									</span>
									<Link href='/passes'>
										<a className='px-2'>Passes</a>
									</Link>
								</li>
								<li className='rounded-md bg-gray-light p-1  text-center flex items-center hover:bg-blue transition-all duration-100 ease-linear hover:text-white cursor-pointer '>
									<span>
										<RiLogoutCircleRLine color='#c934eb' />
									</span>
									<button
										onClick={async () => {
											authCtx.logout("/signin");
											await apolloClient.resetStore();
										}}
										className='px-2'
									>
										Logout
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default FloatNav;
