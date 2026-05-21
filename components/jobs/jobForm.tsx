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

  const handleSubmit = async (e: React.FormEvent) => {
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
    <div className="mx-auto max-w-xl px-4 py-12">

      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          Create New Job
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Fill out the details below to post a new opening on the service board.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label htmlFor="title" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
            Job Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            placeholder="e.g. plumber"
            onChange={handleChange}
            className="w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            placeholder="Describe the responsibilities, requirements"
            onChange={handleChange}
            className="w-full h-36 rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 resize-y"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          <div>
            <label htmlFor="category" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
              Category
            </label>
            <input
              id="category"
              type="text"
              name="category"
              value={formData.category}
              placeholder="e.g. Electricion"
              onChange={handleChange}
              className="w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
              Location
            </label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              placeholder="e.g. Colombo 06"
              onChange={handleChange}
              className="w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-all focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              required
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full rounded-lg bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-neutral-800 active:scale-[0.99]"
          >
            Create Job
          </button>
        </div>

      </form>
    </div>
  );
}