import Link from "next/link";
import { Job } from "@/types/job";

interface Props {
  job: Job;
}

export default function JobCard({ job }: Props) {

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "open":
        return "text-emerald-600";
      case "closed":
        return "text-neutral-400";
      default:
        return "text-amber-600";
    }
  };

  return (
    <div className="border border-neutral-200 bg-white p-5 rounded-xl transition-shadow hover:shadow-md">
      
      <div className="flex items-center justify-between text-xs font-medium mb-2">
        <span className="text-neutral-500 uppercase tracking-wider">
          {job.category}
        </span>
        <span className={getStatusColor(job.status)}>
          ● {job.status}
        </span>
      </div>

      <h2 className="text-lg font-bold text-neutral-900 mb-1">
        {job.title}
      </h2>

      <p className="text-xs text-neutral-400 mb-3">
        {job.location}
      </p>

      <p className="text-sm text-neutral-600 line-clamp-2 mb-4">
        {job.description}
      </p>

      <Link
        href={`/jobs/${job._id}`}
        className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline inline-block"
      >
        View Details →
      </Link>

    </div>
  );
}
