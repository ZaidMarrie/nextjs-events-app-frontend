import Layout from "@/components/Layout";
import DashboardEvent from "@/components/DashboardEvent";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import styles from "@/styles/Dashboard.module.css";

function DashboardPage({ events, token }) {
	const router = useRouter();

	const deleteEvent = async (id) => {
		if (confirm("Are you sure")) {
			const res = await fetch(`${API_URL}/api/events/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await res.json();

			if (!res.ok) {
				if (res.status === 401 || res.status === 403) {
					toast.error(data.error.message);
					return;
				}

				toast.error("Something Went Wrong!");
			} else {
				router.reload();
			}
		}
	};

	return (
		<Layout title="User Dashboard">
			<div className={styles.dash}>
				<h1>Dashboard</h1>

				<ToastContainer />

				<h3>My Events</h3>

				{events.map((evt) => (
					<DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
				))}
			</div>
		</Layout>
	);
}

export async function getServerSideProps({ req }) {
	const { token } = parseCookies(req);

	const res = await fetch(`${API_URL}/api/events/me`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const events = await res.json();

	return {
		props: { events, token },
	};
}

export default DashboardPage;
