"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";
import { useRouter } from "next/navigation";
import { Job } from "@/types/job";

export default function ProfilePage() {
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/jobs/my-jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status?.toUpperCase()) {
      case "OPEN":
      case "ACTIVE":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "IN_PROGRESS":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "DONE":
        return "text-purple-600 bg-purple-50 border-purple-200";
      default:
        return "text-neutral-600 bg-neutral-50 border-neutral-200";
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16 text-base text-neutral-500 animate-pulse">
        Loading profile data...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      
      <div className="mb-12 rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-800 p-8 text-white shadow-md md:p-10">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl font-bold uppercase tracking-wider backdrop-blur-sm">
            {currentUser?.name ? currentUser.name[0] : "U"}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Account Profile
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              {currentUser?.name || "User Profile"}
            </h1>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            My Posted Jobs
          </h2>
          <p className="text-sm text-neutral-500 mt-0.5">
            Manage and track positions you have listed
          </p>
        </div>
        <span className="rounded-md bg-neutral-100 px-3 py-1 text-sm font-bold text-neutral-700">
          {jobs.length} total
        </span>
      </div>

      <div className="grid gap-6">
        {jobs.length === 0 && (
          <div className="rounded-xl border border-dashed border-neutral-300 p-12 text-center">
            <p className="text-base text-neutral-500 font-medium">
              No jobs created yet. Get started by posting a position!
            </p>
          </div>
        )}

        {jobs.map((job) => (
          <div
            key={job._id}
            className="group rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  {job.category || "General"}
                </span>
                <h3 className="text-xl font-bold text-neutral-900 mt-0.5 group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>
              </div>

              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm ${getStatusStyle(job.status)}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {job.status}
              </span>
            </div>

            <p className="text-base leading-relaxed text-neutral-600 line-clamp-3 mb-6">
              {job.description}
            </p>

            <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
              <span className="text-sm text-neutral-400 font-medium flex items-center gap-1.5">
                {job.location && (
                  <>
                    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {job.location}
                  </>
                )}
              </span>

              <button
                onClick={() => deleteJob(job._id)}
                className="rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-bold text-red-600 transition-all hover:bg-red-600 hover:text-white active:scale-[0.98] shadow-sm"
              >
                Delete Job
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}