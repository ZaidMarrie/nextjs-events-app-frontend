import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";

function EventItem({ evt }) {
	return (
		<div className={styles.event}>
			<div className={styles.img}>
				<Image
					src={
						evt.image
							? evt.image.data.attributes.formats.thumbnail.url
							: "/images/event-default.png"
					}
					alt={evt.image ? evt.image.data.attributes.formats.thumbnail.name : "No alt text"}
					width={170}
					height={100}
				/>
			</div>

			<div className={styles.info}>
				<span>
					{new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
				</span>

				<h3>{evt.name}</h3>
			</div>

			<div styles={styles.link}>
				<Link href={`/events/${evt.slug}`} className="btn">
					Event Details
				</Link>
			</div>
		</div>
	);
}

export default EventItem;
