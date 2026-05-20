"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import API from "@/services/api";

import JobCard from "@/components/jobs/JobCard";

import { Job } from "@/types/job";

export default function HomePage() {

  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);

  const fetchJobs = async () => {

    try {

      const res = await API.get("/jobs");

      setJobs(res.data);

    } catch (error) {
      console.log(error);
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

  }, []);

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        Available Jobs
      </h1>

      <div className="grid gap-6">

        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
          />
        ))}

      </div>

    </div>
  );
}