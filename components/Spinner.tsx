import BeatLoader from "react-spinners/BeatLoader";
import PropagateLoader from "react-spinners/PropagateLoader";
interface SpinnerProps {
	loading: boolean;
}

export function Spinner({ loading }: SpinnerProps) {
	return (
		<div className='flex justify-center items-center w-full h-screen'>
			<PropagateLoader color='#36d7b7' loading={loading} size={14} />
		</div>
	);
}
