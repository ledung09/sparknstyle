import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex mt-10 justify-center min-h-screen">
      <SignUp />
    </div>
  );
}
