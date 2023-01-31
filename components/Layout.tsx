import { ReactNode } from "react";
import FloatNav from "../components/FloatNav";
import { useCtx } from "../contexts/AuthContext";
interface LayoutProps {
	children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	const authCtx = useCtx();
	return (
		<div className='min-w-screen  min-h-screen flex bg-light-gray   '>
			{authCtx.isAuthenticated && <FloatNav />}
			{children}
		</div>
	);
}
