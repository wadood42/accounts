import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { Layout } from "../components";
import { apolloClient } from "../lib/apolloClient";
import AuthProvider from "../components/AuthProvider";
import CurrentUserProvider from "../components/CurrentUserProvider";
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<ApolloProvider client={apolloClient}>
				<CurrentUserProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</CurrentUserProvider>
			</ApolloProvider>
		</AuthProvider>
	);
}

export default MyApp;
