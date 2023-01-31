interface DeletePostModalProps {
	setDeletePostModal: React.Dispatch<React.SetStateAction<boolean>>;
	id: string;
	deletePost: Function;
	loading: boolean;
}

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DeletePostModal = ({
	id,
	setDeletePostModal,
	deletePost,
	loading,
}: DeletePostModalProps) => {
	return (
		<div className=' fixed w-full h-full z-10 overflow-auto bg-modal top-0 left-0 flex justify-center items-center'>
			<div className=' flex-col flex justify-center items-center w-96 h-36 bg-light-gray rounded gap-2'>
				<p>Are you sure you want to delete?</p>
				<div className='w-2/3 flex  justify-around'>
					<button
						className='border text-sm py-1 px-6 rounded-lg bg-blue text-white hover:bg-light-blue transition-all duration-200 '
						onClick={() => setDeletePostModal(false)}
					>
						cancel
					</button>
					<button
						className='bg-red px-6 rounded-lg text-white py-1 hover:bg-light-red transition-all duration-200 '
						onClick={async () =>
							toast.promise(deletePost({ variables: { postId: id } }), {
								success: "post has been deleted!",
							})
						}
					>
						{loading ? "deleting..." : "delete"}
					</button>
				</div>
			</div>
		</div>
	);
};
