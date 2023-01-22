import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

function HomePage({ events }) {
	return (
		<>
			<Layout>
				<h1>Upcoming Events</h1>

				{events.length === 0 && <h3>No events to show.</h3>}

				{events.map((evt) => (
					<EventItem key={evt.id} evt={evt} />
				))}

				{events.length > 0 && (
					<Link href="/events" className="btn-secondary">
						View All Events
					</Link>
				)}
			</Layout>
		</>
	);
}

export async function getStaticProps() {
	const res = await fetch(
		`${API_URL}/api/events?sort=date:asc&pagination[page]=1&pagination[pageSize]=3`
	);
	const events = await res.json();
	const eventsData = events.data;

	return {
		props: { events: eventsData },
		revalidate: 1,
	};
}

export default HomePage;
