"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import API from "@/services/api";
import { Job } from "@/types/job";

export default function JobDetailsPage() {
  const router = useRouter();
  const params = useParams();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchJob = async () => {
    try {
      const res = await API.get(`/jobs/${params.id}`);
      setJob(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    if (params?.id) {
      fetchJob();
    }
  }, [params?.id, router]);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!job) {
    return <div className="p-10">Job not found</div>;
  }

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{job.title}</h1>

      <div className="space-y-4 text-lg">
        <p>
          <strong>Description:</strong> {job.description}
        </p>

        <p>
          <strong>Category:</strong> {job.category}
        </p>

        <p>
          <strong>Location:</strong> {job.location}
        </p>

        <p>
          <strong>Status:</strong> {job.status}
        </p>
      </div>
    </div>
  );
}