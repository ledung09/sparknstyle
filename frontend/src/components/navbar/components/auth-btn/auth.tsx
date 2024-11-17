import { Button } from "@/components/ui/button";
import { ClerkLoading, SignedIn, useAuth } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CustomUserBtn } from "./custom-user";

export default function AuthBtn() {
  const { isSignedIn } = useAuth();
  return isSignedIn ? (
    <>
      <ClerkLoading>
        <div className="w-8 h-8 rounded-full border border-primary flex items-center justify-center ">
          <LoaderCircle className="w-5 h-5 animate-spin" strokeWidth={2} />
        </div>
      </ClerkLoading>
      <SignedIn>
        <CustomUserBtn />
      </SignedIn>
    </>
  ) : (
    <Link href={"/sign-in"}>
      <Button className="h-10" variant={"outline"}>
        Sign in
      </Button>
    </Link>
  );
}
