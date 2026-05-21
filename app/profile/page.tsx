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

        const user =
      localStorage.getItem("user");

    if (user) {

      setCurrentUser(
        JSON.parse(user)
      );
    }

    fetchMyJobs();

  }, []);

  const fetchMyJobs = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await API.get(
  "/jobs/my-jobs",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

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

      setJobs((prev) =>
        prev.filter((job) => job._id !== id)
      );

    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        {currentUser?.name}'s Profile
      </h1>

      <h2 className="text-2xl mb-4">
        My Jobs
      </h2>

      <div className="grid gap-6">

        {jobs.length === 0 && (
          <p>No jobs created yet.</p>
        )}

        {jobs.map((job) => (
          <div
            key={job._id}
            className="border p-4 rounded-xl"
          >

            <h3 className="text-xl font-bold">
              {job.title}
            </h3>

            <p>{job.description}</p>

            <p>Status: {job.status}</p>

            <div className="flex gap-4 mt-4">

              <button
                onClick={() =>
                  deleteJob(job._id)
                }
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}