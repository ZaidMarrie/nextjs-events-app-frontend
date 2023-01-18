import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import "react-toastify/dist/ReactToastify.css";

function EventPage({ evt }) {
	const router = useRouter();

	const deleteEvent = async (e) => {
		if (confirm("Are you sure?")) {
			const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
				method: "DELETE",
			});

			const data = res.json();

			if (!res.ok) {
				toast(data.message);
			} else {
				router.push("/events");
			}
		}
	};

	return (
		<Layout title={evt.attributes.name}>
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
					{new Date(evt.attributes.date).toLocaleDateString("en-US")} at {evt.attributes.time}
				</span>

				<h1>{evt.attributes.name}</h1>

				<ToastContainer />

				{/* {evt.image && (
					<div className={styles.image}>
						<Image src={evt.image.data.attributes.formats.medium.url} alt={evt.image ? evt.image.data.attributes.formats.medium.name : "No alt text"} width={960} height={600} />
					</div>
				)} */}

				<h3>Performers:</h3>
				<p>{evt.attributes.performers}</p>

				<h3>Description:</h3>
				<p>{evt.attributes.description}</p>

				<h3>Venue: {evt.attributes.venue}</h3>
				<p>{evt.attributes.address}</p>

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

	const paths = events.data.map((evt) => ({
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
	const eventData = event.data[0];

	return {
		props: { evt: eventData },
		revalidate: 1,
	};
}

export default EventPage;
