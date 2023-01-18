import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

function EventsPage({ events }) {
	return (
		<>
			<Layout>
				<h1>Events</h1>

				{events.data.length === 0 && <h3>No events to show.</h3>}

				{events.data.map((evt) => (
					<EventItem key={evt.id} evt={evt.attributes} />
				))}
			</Layout>
		</>
	);
}

export async function getStaticProps() {
	const res = await fetch(`${API_URL}/api/events?populate=image&sort=date:asc`);
	const events = await res.json();

	return {
		props: { events },
		revalidate: 1,
	};
}

export default EventsPage;
