import Link from "next/link";

import { Job } from "@/types/job";

interface Props {
  job: Job;
}

export default function JobCard({
  job,
}: Props) {
  return (
    <div className="border rounded-xl p-5 shadow">

      <h2 className="text-2xl font-bold mb-2">
        {job.title}
      </h2>

      <p className="mb-3">
        {job.description}
      </p>

      <div className="space-y-1 mb-4">

        <p>
          Category: {job.category}
        </p>

        <p>
          Location: {job.location}
        </p>

        <p>
          Status: {job.status}
        </p>

      </div>

      <Link
        href={`/jobs/${job._id}`}
        className="text-blue-500"
      >
        View Details
      </Link>

    </div>
  );
}