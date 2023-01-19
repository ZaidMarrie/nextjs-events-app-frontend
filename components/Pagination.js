import Link from "next/link";
import { PER_PAGE } from "@/config/index";

function Pagination({ page, total }) {
	const lastPage = Math.ceil(total / PER_PAGE);

	return (
		<div>
			{page > 1 && (
				<Link href={`/events?page=${page - 1}`} className="btn-secondary">
					Prev
				</Link>
			)}

			{page < lastPage && (
				<Link href={`/events?page=${page + 1}`} className="btn-secondary">
					Next
				</Link>
			)}
		</div>
	);
}

export default Pagination;
