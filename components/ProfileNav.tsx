interface ProfileNavProps {
	index: number;
	setIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ProfileNav = ({ index, setIndex }: ProfileNavProps) => {
	return (
		<div
			className={` w-full max-w-3xl mx-auto p-2 bg-white border-light-gray border-t`}
		>
			<ul className=' flex text-xs justify-around'>
				<li
					className={` ${
						index === 0 && "bg-blue font-bold text-white"
					} cursor-pointer   px-4 py-1 rounded transition hover:bg-blue-light`}
					onClick={() => setIndex(0)}
				>
					Likes
				</li>
				<li
					onClick={() => setIndex(1)}
					className={` ${
						index === 1 && "bg-blue font-bold text-white"
					} cursor-pointer   px-4 py-1 rounded transition hover:bg-blue-light  `}
				>
					Likes you
				</li>
				<li
					onClick={() => setIndex(2)}
					className={` ${
						index === 2 && "bg-blue font-bold text-white"
					} cursor-pointer   px-4 py-1 rounded transition hover:bg-blue-light`}
				>
					Matches
				</li>
				<li
					onClick={() => setIndex(3)}
					className={` ${
						index === 3 && "bg-blue font-bold text-white"
					} cursor-pointer  px-4 py-1 rounded transition hover:bg-blue-light`}
				>
					Passes
				</li>
				<li
					onClick={() => setIndex(4)}
					className={` ${
						index === 4 && "bg-blue font-bold text-white"
					} cursor-pointer   px-4 py-1 rounded transition hover:bg-blue-light`}
				>
					Posts
				</li>
			</ul>
		</div>
	);
};

export default ProfileNav;
