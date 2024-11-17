"use client";

import useRole from "@/app/hooks/useRole";
import { useRouter } from "next/navigation";
import React from "react";

export default function RoleDirector() {
  const router = useRouter();
  const isSeller = useRole();
  if (isSeller) router.push("/seller");

  return <></>;
}
