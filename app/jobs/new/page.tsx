"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import JobForm from "@/components/jobs/jobForm";

import { isAuthenticated } from "@/util/auth";

export default function NewJobPage() {

  const router = useRouter();

  useEffect(() => {

    if (!isAuthenticated()) {

      router.push("/login");
    }

  }, [router]);

  return <JobForm />;
}