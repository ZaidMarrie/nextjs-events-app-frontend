import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Search.module.css";

function Search() {
	const [term, setTerm] = useState("");
	const router = useRouter();

	const handleSubmit = (e) => {
		e.preventDefault();

		router.push(`events/search?term=${term}`);
		setTerm("");
	};

	return (
		<div className={styles.search}>
			<form onSubmit={handleSubmit}>
				<input
					type="search"
					value={term}
					onChange={(e) => setTerm(e.target.value)}
					placeholder="Search an event"
				/>
			</form>
		</div>
	);
}

export default Search;
