import Image from "next/image";

const Test = () => {
	return (
		<div className='border w-screen h-screen  flex bg-main'>
			<div className=' flex-1'>some text here</div>
			<div className=''>
				<Image src='/bg.png' alt='bg' width={800} height={800} />
			</div>
		</div>
	);
};

export default Test;
