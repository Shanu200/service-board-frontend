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

  // FETCH JOB
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

      return;
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

  // BOOK JOB
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
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (!job) {

    return (
      <div className="p-10">
        Job not found
      </div>
    );
  }

const isOwner =
  currentUser?.id &&
  job.user &&
  String(currentUser.id) === String(job.user);

const isBookedUser =
  currentUser?.id &&
  job.bookedBy &&
  String(currentUser.id) === String(job.bookedBy);

  return (
    <div className="p-10 max-w-3xl mx-auto">

      <h1 className="text-4xl font-bold mb-6">
        {job.title}
      </h1>

      <div className="space-y-4 text-lg">

        <p>
          <strong>Description:</strong>{" "}
          {job.description}
        </p>

        <p>
          <strong>Category:</strong>{" "}
          {job.category}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          {job.location}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {job.status}
        </p>

      </div>

      
      {!isOwner &&
        job.status === "OPEN" && (

          <button
            onClick={bookJob}
            className="bg-blue-600 text-white px-6 py-3 rounded mt-6"
          >
            Book Job
          </button>
      )}


{isBookedUser &&
  job.status === "IN_PROGRESS" && (

    <button
      onClick={markDone}
      className="bg-green-600 text-white px-6 py-3 rounded mt-6"
    >
      Mark Done
    </button>
)}

{isOwner &&
  job.status === "DONE" && (

    <button
      onClick={closeJob}
      className="bg-red-600 text-white px-6 py-3 rounded mt-6 ml-4"
    >
      Close Job
    </button>
)}

    </div>
  );
}