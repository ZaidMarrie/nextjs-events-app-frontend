import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "@/components/Layout";
import styles from "@/styles/Event.module.css";
import { API_URL } from "@/config/index";

function EventPage({ evt }) {
	const deleteEvent = (e) => {
		console.log("delete");
	};

	console.log(evt);
	return (
		<Layout title={evt.name}>
			<div className={styles.event}>
				<div className={styles.controls}>
					<Link href={`/events/edit/${evt.id}`}>
						<FaPencilAlt /> Edit Event
					</Link>

					<a href="#" onClick={deleteEvent} className={styles.delete}>
						<FaTimes /> Delete Event
					</a>
				</div>

				<span>
					{new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
				</span>

				<h1>{evt.name}</h1>

				{evt.image && (
					<div className={styles.image}>
						<Image src={evt.image.data.attributes.formats.medium.url} width={960} height={600} />
					</div>
				)}

				<h3>Performers:</h3>
				<p>{evt.performers}</p>

				<h3>Description:</h3>
				<p>{evt.description}</p>

				<h3>Venue: {evt.venue}</h3>
				<p>{evt.address}</p>

				<Link href="/events" className={styles.back}>
					{"<"} Go Back
				</Link>
			</div>
		</Layout>
	);
}

export async function getStaticPaths() {
	const res = await fetch(`${API_URL}/api/events`);
	const events = await res.json();
	const eventsData = events.data;

	const paths = eventsData.map((evt) => ({
		params: { slug: evt.attributes.slug },
	}));

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params: { slug } }) {
	const res = await fetch(`${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=image`);
	const event = await res.json();
	const eventData = event.data[0].attributes;

	return {
		props: { evt: eventData },
		revalidate: 1,
	};
}

export default EventPage;
