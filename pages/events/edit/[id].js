import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaImage } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import styles from "@/styles/Form.module.css";
import "react-toastify/dist/ReactToastify.css";

function EditEventPage({ evt, token }) {
	console.log(evt);
	const router = useRouter();

	const [formValues, setFormValues] = useState({
		name: evt.data.attributes.name,
		description: evt.data.attributes.description,
		venue: evt.data.attributes.venue,
		address: evt.data.attributes.address,
		performers: evt.data.attributes.performers,
		time: evt.data.attributes.time,
		date: evt.data.attributes.date,
	});

	const [imagePreview, setImagePreview] = useState(
		evt.data.attributes.image.data
			? evt.data.attributes.image.data.attributes.formats.thumbnail.url
			: null
	);

	const [showModal, setShowModal] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validation
		const hasEmptyFields = Object.values(formValues).some((element) => element === "");

		if (hasEmptyFields) {
			toast.error("Please fill in all fields");
			return;
		}

		const res = await fetch(`${API_URL}/api/events/${evt.data.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ data: formValues }),
		});

		if (!res.ok) {
			if (res.status === 401 || res.status === 403) {
				toast.error("Not Authorized!");
				return;
			}

			toast.error("Something Went Wrong!");
		} else {
			const evt = await res.json();
			router.push(`/events/${evt.data.attributes.slug}`);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
	};

	const imageUploaded = async () => {
		const res = await fetch(`${API_URL}/api/events/${evt.data.id}`);
		const eventData = await res.json();

		setImagePreview(eventData.data.attributes.image.data.attributes.formats.thumbnail.url);
		setShowModal(false);
	};

	return (
		<Layout title="Edit Event">
			<Link href="/events">{"<"} Go Back</Link>
			<h1>Edit Event</h1>

			<ToastContainer />

			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.grid}>
					<div>
						<label htmlFor="name">Event Name</label>
						<input
							type="text"
							name="name"
							value={formValues.name}
							id="name"
							onChange={handleInputChange}
						/>
					</div>

					<div>
						<label htmlFor="performers">Performers</label>
						<input
							type="text"
							name="performers"
							value={formValues.performers}
							id="performers"
							onChange={handleInputChange}
						/>
					</div>

					<div>
						<label htmlFor="venue">Venue</label>
						<input
							type="text"
							name="venue"
							value={formValues.venue}
							id="venue"
							onChange={handleInputChange}
						/>
					</div>

					<div>
						<label htmlFor="address">Address</label>
						<input
							type="text"
							name="address"
							value={formValues.address}
							id="address"
							onChange={handleInputChange}
						/>
					</div>

					<div>
						<label htmlFor="date">Date</label>
						<input
							type="date"
							name="date"
							value={moment(formValues.date).format("yyyy-MM-DD")}
							id="date"
							onChange={handleInputChange}
						/>
					</div>

					<div>
						<label htmlFor="time">Time</label>
						<input
							type="text"
							name="time"
							value={formValues.time}
							id="time"
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div>
					<label htmlFor="description">Event Description</label>
					<textarea
						name="description"
						value={formValues.description}
						id="description"
						onChange={handleInputChange}
					></textarea>
				</div>

				<button type="submit" className="btn">
					Update Event
				</button>
			</form>

			<h2>Event Image</h2>
			{imagePreview ? (
				<Image src={imagePreview} width={170} height={100} />
			) : (
				<div>
					<p>No image uploaded.</p>
				</div>
			)}

			<div className={styles.btnImage}>
				<button className="btn-secondary" onClick={() => setShowModal(true)}>
					<FaImage /> Set Image
				</button>
			</div>

			<Modal show={showModal} onClose={() => setShowModal(false)}>
				<ImageUpload evtId={evt.data.id} imageUploaded={imageUploaded} token={token} />
			</Modal>
		</Layout>
	);
}

export async function getServerSideProps({ params: { id }, req }) {
	const { token } = parseCookies(req);

	const res = await fetch(`${API_URL}/api/events/${id}?populate=image`);
	const event = await res.json();

	return {
		props: { evt: event, token },
	};
}

export default EditEventPage;
