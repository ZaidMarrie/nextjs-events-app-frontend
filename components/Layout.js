import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import styles from "@/styles/Layout.module.css";

function Layout({ title, description, keywords, children }) {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>

			<Header />
			<div className={styles.container}>{children}</div>
			<Footer />
		</>
	);
}

Layout.defaultProps = {
	title: "DJ Events | Find the hottest parties",
	description: "Find the latest DJ and other musical events.",
	keywords: "music, dj, edm, events",
};

export default Layout;
