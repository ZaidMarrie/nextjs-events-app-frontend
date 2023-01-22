import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";

function EventItem({ evt }) {
	return (
		<div className={styles.event}>
			<div className={styles.img}>
				<Image
					src={
						evt.attributes.image.data
							? evt.attributes.image.data.attributes.formats.thumbnail.url
							: "/images/event-default.png"
					}
					alt={
						evt.attributes.image.data ? evt.attributes.image.data.alternativeText : "No alt text"
					}
					width={170}
					height={100}
				/>
			</div>

			<div className={styles.info}>
				<span>
					{new Date(evt.attributes.date).toLocaleDateString("en-US")} at {evt.attributes.time}
				</span>

				<h3>{evt.attributes.name}</h3>
			</div>

			<div styles={styles.link}>
				<Link href={`/events/${evt.attributes.slug}`} className="btn">
					Event Details
				</Link>
			</div>
		</div>
	);
}

export default EventItem;
