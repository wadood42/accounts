import { useState, useEffect, ReactNode } from "react";

interface ClientOnlyProps {
	children?: ReactNode;
}

const ClientOnly = ({ children }: ClientOnlyProps) => {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) return null;
	return <div>{children}</div>;
};

export default ClientOnly;
