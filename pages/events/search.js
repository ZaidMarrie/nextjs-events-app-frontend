import qs from "qs";
import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";

function SearchPage({ events }) {
	const router = useRouter();

	return (
		<>
			<Layout title="Search Results">
				<Link href="/events">{"<"} Go Back</Link>

				<h1>Search Results for "{router.query.term}"</h1>

				{events.data.length === 0 && <h3>No events to show.</h3>}

				{events.data.map((evt) => (
					<EventItem key={evt.id} evt={evt.attributes} />
				))}
			</Layout>
		</>
	);
}

export async function getServerSideProps({ query: { term } }) {
	const searchQuery = qs.stringify(
		{
			filters: {
				$or: [
					{
						name: {
							$containsi: term,
						},
					},
					{
						description: {
							$containsi: term,
						},
					},
					{
						performers: {
							$containsi: term,
						},
					},
					{
						venue: {
							$containsi: term,
						},
					},
				],
			},
		},
		{ encodeValuesOnly: true }
	);

	const res = await fetch(`${API_URL}/api/events?${searchQuery}`);
	const events = await res.json();

	return {
		props: { events },
	};
}

export default SearchPage;
