import Link from "next/link";
import Layout from "@/components/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import "react-toastify/dist/ReactToastify.css";

function addEventPage() {
	const router = useRouter();

	const [formValues, setFormValues] = useState({
		name: "",
		description: "",
		venue: "",
		address: "",
		performers: "",
		time: "",
		date: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validation
		const hasEmptyFields = Object.values(formValues).some((element) => element === "");

		if (hasEmptyFields) {
			toast.error("Please fill in all fields");
			return;
		}

		const res = await fetch(`${API_URL}/api/events`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ data: formValues }),
		});

		if (!res.ok) {
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

	return (
		<Layout title="Add New Event">
			<Link href="/events">{"<"} Go Back</Link>
			<h1>Add Event</h1>

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
							value={formValues.date}
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
					Add Event
				</button>
			</form>
		</Layout>
	);
}

export default addEventPage;
