import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import Layout from "@/components/Layout";
import styles from "@/styles/404.module.css";

function NotFoundPage() {
	return (
		<Layout title="Page Not Found">
			<div className={styles.error}>
				<h1>
					<FaExclamationTriangle /> 404
				</h1>
				<p>Sorry, there is nothing here!</p>
				<Link href="/">Go Back Home</Link>
			</div>
		</Layout>
	);
}

export default NotFoundPage;
