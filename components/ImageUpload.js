import { useState } from "react";
import { API_URL } from "../config";
import { parseCookies } from "../helpers";
import { toast } from "react-toastify"; // ToastContainer in 'edit/[id]'
import styles from "@/styles/Form.module.css";

function ImageUpload({ evtId, imageUploaded, token }) {
	const [image, setImage] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("files", image);
		formData.append("ref", "api::event.event");
		formData.append("refId", evtId);
		formData.append("field", "image");

		const res = await fetch(`${API_URL}/api/upload`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});

		if (!res.ok) {
			if (res.status === 401 || res.status === 403) {
				toast.error("Not Authorized!");
				return;
			}

			toast.error("Something Went Wrong!");
		}

		imageUploaded();
	};

	const handleFileChange = (e) => {
		setImage(e.target.files[0]);
	};

	return (
		<div className={styles.form}>
			<h1>Upload Event Image</h1>

			<form onSubmit={handleSubmit}>
				<div className={styles.file}>
					<input type="file" onChange={handleFileChange} />
				</div>

				<input type="submit" value="Upload Image" className="btn" />
			</form>
		</div>
	);
}

export default ImageUpload;
