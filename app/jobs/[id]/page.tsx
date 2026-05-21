"use client";

import { useEffect, useState } from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import API from "@/services/api";

import { Job } from "@/types/job";

export default function JobDetailsPage() {

  const router = useRouter();

  const params = useParams();

  const [job, setJob] =
    useState<Job | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [currentUser, setCurrentUser] =
    useState<any>(null);

  const fetchJob = async () => {

    try {

      const res = await API.get(
        `/jobs/${params.id}`
      );

      setJob(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    const user =
      localStorage.getItem("user");

    if (!token) {

      router.push("/login");

    }

    if (user) {

      setCurrentUser(
        JSON.parse(user)
      );
    }

    if (params?.id) {
      fetchJob();
    }

  }, [params?.id, router]);

  const bookJob = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await API.patch(
        `/jobs/${params.id}/book`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchJob();

    } catch (error) {

      console.log(error);
    }
  };


const markDone = async () => {
  try {
    const token = localStorage.getItem("token");

    await API.patch(
      `/jobs/${params.id}/done`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchJob(); 
  } catch (error) {
    console.log(error);
  }
};

const closeJob = async () => {

  try {

    const token =
      localStorage.getItem("token");

    await API.patch(
      `/jobs/${params.id}/close`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchJob();

  } catch (error) {

    console.log(error);
  }
};

  if (loading) {

    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-base text-neutral-500 animate-pulse">
        Loading...
      </div>
    );
  }

  if (!job) {

    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-base text-neutral-500">
        Job not found
      </div>
    );
  }

const isOwner =
  currentUser?.id &&
  job.user &&
  String(currentUser.id) ===
    String(
      typeof job.user === "object"
        ? (job.user as any)._id
        : job.user
    );

const isBookedUser =
  currentUser?.id &&
  job.bookedBy &&
  String(currentUser.id) ===
    String(
      typeof job.bookedBy === "object"
        ? (job.bookedBy as any)._id
        : job.bookedBy
    );

console.log("CURRENT USER:", currentUser);

console.log("JOB USER:", job.user);

console.log("BOOKED BY:", job.bookedBy);

console.log("IS OWNER:", isOwner);

console.log("IS BOOKED USER:", isBookedUser);

  const getStatusColor = (status: string) => {
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

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">

      <div className="rounded-2xl border border-neutral-200 bg-white p-8 md:p-10 shadow-md">
        
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 pb-6 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Category
            </span>
            <p className="text-lg font-bold text-neutral-800 mt-0.5">
              {job.category}
            </p>
          </div>
          
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-bold uppercase tracking-wider shadow-sm ${getStatusColor(job.status)}`}>
            <span className="h-2 w-2 rounded-full bg-current" />
            {job.status}
          </span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            {job.title}
          </h1>
          
          <div className="mt-4 flex items-center gap-2 text-base font-semibold text-neutral-500">
            <svg className="h-5 w-5 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{job.location}</span>
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
            Description & Specifications
          </h2>
          <p className="text-lg leading-relaxed text-neutral-700 whitespace-pre-wrap font-normal">
            {job.description}
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-100 flex justify-end gap-4">
          
          {!isOwner &&
            job.status === "OPEN" && (

              <button
                onClick={bookJob}
                className="w-full sm:w-auto rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-[0.98]"
              >
                Book Job
              </button>
          )}


    {isBookedUser &&
      job.status === "IN_PROGRESS" && (

        <button
          onClick={markDone}
          className="w-full sm:w-auto rounded-xl bg-green-600 px-8 py-4 text-base font-bold text-white shadow-sm transition-all hover:bg-green-700 active:scale-[0.98]"
        >
          Mark Done
        </button>
    )}

    {isOwner &&
      job.status === "DONE" && (

        <button
          onClick={closeJob}
          className="w-full sm:w-auto rounded-xl bg-red-600 px-8 py-4 text-base font-bold text-white shadow-sm transition-all hover:bg-red-700 active:scale-[0.98]"
        >
          Close Job
        </button>
    )}

        </div>

      </div>
    </div>
  );
}