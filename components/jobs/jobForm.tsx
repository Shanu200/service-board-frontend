"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import API from "@/services/api";

export default function JobForm() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/jobs",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push("/");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">

      <h1 className="text-4xl font-bold mb-8">
        Create New Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          className="border p-3 w-full rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Job Description"
          className="border p-3 w-full rounded h-40"
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          className="border p-3 w-full rounded"
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          className="border p-3 w-full rounded"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Create Job
        </button>

      </form>

    </div>
  );
}