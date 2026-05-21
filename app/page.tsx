"use client";

import { useEffect, useState } from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import API from "@/services/api";

import JobCard from "@/components/jobs/JobCard";

import { Job } from "@/types/job";

export default function HomePage() {

  const router = useRouter();

  const searchParams =
    useSearchParams();

  const keyword =
    searchParams.get("keyword") || "";

  const [jobs, setJobs] =
    useState<Job[]>([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH JOBS
  const fetchJobs = async () => {

    try {

      setLoading(true);

      const res = await API.get(
        `/jobs?keyword=${encodeURIComponent(keyword)}`
      );

      setJobs(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      router.push("/login");

      return;
    }

    fetchJobs();

  }, [keyword]);

  if (loading) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-10 max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold mb-8">
        Available Jobs
      </h1>

      <div className="grid gap-6">

        {jobs.length > 0 ? (

          jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
            />
          ))

        ) : (

          <p>No jobs found</p>

        )}

      </div>

    </div>
  );
}