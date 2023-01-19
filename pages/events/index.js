import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";
import { API_URL, PER_PAGE } from "@/config/index";

function EventsPage({ events, page, total }) {
	return (
		<>
			<Layout>
				<h1>Events</h1>

				{events.data.length === 0 && <h3>No events to show.</h3>}

				{events.data.map((evt) => (
					<EventItem key={evt.id} evt={evt.attributes} />
				))}

				<Pagination page={page} total={total} />
			</Layout>
		</>
	);
}

export async function getServerSideProps({ query: { page = 1 } }) {
	// Calculate start page
	const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

	// Fetch total/count
	const totalRes = await fetch(`${API_URL}/api/events`);
	const totalData = await totalRes.json();
	const total = totalData.data.length;

	// Fetch events
	const eventsRes = await fetch(
		`${API_URL}/api/events?populate=image&sort=date:asc&pagination[start]=${start}&pagination[limit]=${PER_PAGE}`
	);
	const events = await eventsRes.json();

	return {
		props: { events, page: +page, total },
	};
}

export default EventsPage;
